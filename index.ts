import { chromium } from 'playwright';
import dayjs from 'dayjs';
import { userData } from './data.js';
import inquirer from 'inquirer';

const today = dayjs();
const thisMonth = today.format("MMMM");
let arrivalDate = '';
let departureDate = '';

type Answers = {
    selectDay: string;
};

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
    const { selectDay } = await askDateSelection();

    console.log('You selected:', selectDay);
    await setTravelDates(selectDay);

    const { confirm } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Confirm dates: Arrival ${arrivalDate}, Departure ${departureDate}. Continue?`,
        default: true
    });

    if (!confirm) {
        console.log('Operation cancelled.');
        process.exit(0);
    }

    await fillRegistrationForm();
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
    await page.getByRole("cell", { name: "2025" }).click();
    for (let i = 0; i < 4; i++) await page.getByRole("cell", { name: "«" }).click();
    await page.getByText(userData.dateOfBirth.year).click();
    await page.getByText(userData.dateOfBirth.month, { exact: true }).click();
    await page.getByRole("cell", { name: userData.dateOfBirth.day, exact: true }).click();

    await page.locator("#sex").selectOption(userData.gender);

    await page.locator("#passExpDte").click();
    await page.getByRole("cell", { name: thisMonth }).click();
    await page.getByRole("cell", { name: "2025" }).click();
    await page.getByText(userData.passportExpiry.year).click();
    await page.getByText(userData.passportExpiry.month, { exact: true }).click();
    await page.getByRole("cell", { name: userData.passportExpiry.day }).click();

    await page.locator("#email").fill(userData.email);
    await page.locator("#confirmEmail").fill(userData.email);
    await page.locator("#mobile").fill(userData.mobile);

    await page.locator("#arrDt").click();
    await page.locator('td.day:not(.disabled)', { hasText: arrivalDate }).click();
    await page.locator("#depDt").click();
    await page.locator('td.day:not(.disabled)', { hasText: departureDate }).first().click();

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