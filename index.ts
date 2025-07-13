import { chromium, Page } from 'playwright';
import dayjs from 'dayjs';
import inquirer from 'inquirer';
import { readdir } from 'fs/promises';
import { UserData } from './UserData.js';

const today = dayjs();
const thisMonth = today.format("MMMM");
let arrivalDate = '';
let departureDate = '';
let userData: UserData;

type Answers = {
    selectDay: string;
};

type FileAnswers = {
    selectedFile: string;
};

async function askFileSelection(): Promise<FileAnswers> {
    try {
        const files = await readdir('./data');
        const tsFiles = files.filter(file => file.endsWith('.ts'));
        
        if (tsFiles.length === 0) {
            throw new Error('No .ts files found in data directory');
        }

        return inquirer.prompt<FileAnswers>([
            {
                type: 'list',
                name: 'selectedFile',
                message: 'Please select a user data file:',
                choices: tsFiles.map(file => ({
                    name: file.replace('.ts', ''),
                    value: file
                }))
            }
        ]);
    } catch (error) {
        console.error('Error reading data directory:', error);
        process.exit(1);
    }
}

async function askDateSelection(): Promise<Answers> {
    return inquirer.prompt<Answers>([
        {
            type: 'list',
            name: 'selectDay',
            message: 'Which day are you traveling?',
            choices: ['Today', 'Tomorrow', 'Other', 'Exit'],
        }
    ]);
}

async function askCustomDates(): Promise<{ arrivalDate: string; departureDate: string }> {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'arrivalDate',
            message: 'Enter arrival date (number 1-31):',
            validate: input => {
                const num = parseInt(input);
                return (num >= 1 && num <= 31) ? true : 'Please enter a valid date (1-31)';
            }
        },
        {
            type: 'input',
            name: 'departureDate',
            message: 'Enter departure date (number 1-31):',
            validate: input => {
                const num = parseInt(input);
                return (num >= 1 && num <= 31) ? true : 'Please enter a valid date (1-31)';
            }
        }
    ]);
}

async function setTravelDates(selectDay: string) {
    switch (selectDay) {
        case 'Today':
            arrivalDate = today.date().toString();
            departureDate = today.clone().add(1, 'day').date().toString();
            break;
        case 'Tomorrow':
            arrivalDate = today.clone().add(1, 'day').date().toString();
            departureDate = today.clone().add(2, 'day').date().toString();
            break;
        case 'Other':
            const custom = await askCustomDates();
            arrivalDate = custom.arrivalDate;
            departureDate = custom.departureDate;
            break;
        case 'Exit':
            console.log('Program exited.');
            process.exit(0);
    }
}

async function main() {
    // First, let user select the data file
    const { selectedFile } = await askFileSelection();
    console.log('You selected user data from:', selectedFile);

    // Dynamic import of the selected file
    const filePath = `./data/${selectedFile.replace('.ts', '.js')}`;
    const userDataModule = await import(filePath);
    userData = userDataModule.userData;

    // Then proceed with date selection
    const { selectDay } = await askDateSelection();

    console.log('You selected:', selectDay);
    await setTravelDates(selectDay);

    // Format the filename for display
    const filesname = selectedFile.replace('.ts', '').toUpperCase();

    const { confirm } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: `
┌─────────────────────────────────────────┐
│  🎯 Malaysia Digital Arrival Card       │
│     Auto-Fill Confirmation              │
├─────────────────────────────────────────┤
│  👤 User Profile: ${filesname.padEnd(21)} │
│  📅 Arrival Date: ${arrivalDate.padEnd(21)} │
│  🛫 Departure Date: ${departureDate.padEnd(19)} │
└─────────────────────────────────────────┘

✨ Ready to start auto-filling the form. Continue?`,
        default: true
    });

    if (!confirm) {
        console.log('Operation cancelled.');
        process.exit(0);
    }

    await fillRegistrationForm();
}

async function navigateToYear(page: Page, targetYear: string, direction: 'left' | 'right', maxClicks: number = 20): Promise<boolean> {
    let yearFound = false;
    const arrowSymbol = direction === 'left' ? '«' : '»';
    
    for (let i = 0; i < maxClicks; i++) {
        // 检查是否找到了目标年份
        try {
            await page.getByText(targetYear).click({ timeout: 100 });
            yearFound = true;
            break;
        } catch (error) {
            await page.getByRole("cell", { name: arrowSymbol }).click({ timeout: 800 });
        }
    }
    
    if (!yearFound) {
        console.error(`Could not find year ${targetYear} after ${maxClicks} attempts`);
    }
    
    return yearFound;
}

async function fillRegistrationForm() {
    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();

    console.log("Starting automatic Malaysia Digital Arrival Card filling...");
    console.log(`Using dates: Arrival ${arrivalDate}, Departure ${departureDate}`);

    await page.goto("https://imigresen-online.imi.gov.my/mdac/main", { waitUntil: 'domcontentloaded' });

    try {
        await page.getByRole("button", { name: "×" }).click();
    } catch {
        console.log("No popup or popup already closed, continuing...");
    }

    await page.getByRole("link", { name: "Register" }).click();
    await page.waitForTimeout(3000);

    await page.locator("#name").fill(userData.name);
    await page.locator("#passNo").fill(userData.passportNo);
    await page.locator("#nationality").selectOption(userData.nationality);

    await page.waitForTimeout(3000);
    await page.locator("#dob").click();
    await page.getByRole("cell", { name: thisMonth }).click();
    await page.getByRole("cell", { name: dayjs().year().toString() }).click();
    // for (let i = 0; i < 4; i++) await page.getByRole("cell", { name: "«" }).click();
    // 导航到用户的出生年份
    await navigateToYear(page, userData.dateOfBirth.year, 'left');
    await page.getByText(userData.dateOfBirth.month, { exact: true }).click();
    await page.locator(`td.day:not(.old):not(.new)`).filter({ hasText: new RegExp(`^${userData.dateOfBirth.day}$`) }).click();

    await page.locator("#sex").selectOption(userData.gender);

    await page.locator("#passExpDte").click();
    await page.getByRole("cell", { name: thisMonth }).click();
    await page.getByRole("cell", { name: dayjs().year().toString() }).click();
    
    // 导航到护照到期年份
    await navigateToYear(page, userData.passportExpiry.year, 'right');
    await page.getByText(userData.passportExpiry.month, { exact: true }).click();
    await page.locator(`td.day:not(.old):not(.new)`).filter({ hasText: new RegExp(`^${userData.passportExpiry.day}$`) }).click();

    await page.locator("#email").fill(userData.email);
    await page.locator("#confirmEmail").fill(userData.email);
    await page.locator("#region").selectOption(userData.RegionCode);
    await page.locator("#mobile").fill(userData.mobile);

    await page.locator("#arrDt").click();
    await page.locator('td.day:not(.disabled)').filter({ hasText: new RegExp(`^${arrivalDate}$`) }).click();
    await page.locator("#depDt").click();
    await page.locator('td.day:not(.disabled)').filter({ hasText: new RegExp(`^${departureDate}$`) }).first().click();

    await page.locator("#vesselNm").fill(userData.vesselNumber);
    await page.locator("#trvlMode").selectOption(userData.travelMode);
    await page.locator("#embark").selectOption(userData.embarkation);

    await page.locator("#accommodationStay").selectOption(userData.accommodation.stay);
    await page.locator("#accommodationAddress1").fill(userData.accommodation.address);
    await page.locator("#accommodationState").selectOption(userData.accommodation.state);
    await page.locator("#accommodationCity").selectOption(`${userData.accommodation.state}00`);
    await page.locator("#accommodationPostcode").fill(userData.accommodation.postcode);

    console.log("Form has been automatically filled. Please complete the remaining steps or submit the form manually.");

    await new Promise(() => { }); // Keeps browser open
}

// Run program
main().catch(err => console.error("Program execution error:", err));