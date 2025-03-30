import { chromium, Page } from 'playwright';
import dayjs from 'dayjs'
import { userData } from './data.js';

const today = dayjs();
const arrivalDate = today.date().toString()
const departureDate = today.add(1, 'day').date().toString()

async function fillRegistrationForm() {
    // 启动浏览器
    const browser = await chromium.launch({
        headless: false, // 设置为 true 可以隐藏浏览器界面
        slowMo: 100 // 减慢操作速度，便于观察
    });

    // 创建上下文
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 }
    });

    // 创建新页面
    const page = await context.newPage();

    try {
        console.log("开始自动填写马来西亚入境卡...");

        // 导航到目标网站
        await page.goto("https://imigresen-online.imi.gov.my/mdac/main", { waitUntil: 'domcontentloaded' });
        // await page.waitForTimeout(3000);
  
        // 尝试关闭弹窗，如果存在的话
        try {
            await page.getByRole("button", { name: "×" }).click();
        } catch (error) {
            console.log("可能没有弹窗或弹窗已关闭，继续执行...");
        }

        // 点击注册链接
        await page.getByRole("link", { name: "Register" }).click();

        // 填写个人信息
        await page.waitForTimeout(3000);
        await page.locator("#name").fill(userData.name);
        await page.locator("#passNo").fill(userData.passportNo);
        await page.locator("#nationality").selectOption(userData.nationality);
        await page.waitForTimeout(3000);
        // 填写出生日期
        await page.locator("#dob").click();
        // 点击日期选择器中的年份和月份，然后导航到正确的年份和月份
        await page.getByRole("cell", { name: "March" }).click();
        await page.getByRole("cell", { name: "2025" }).click();
        // 点击多次后退按钮回到1983年
        for (let i = 0; i < 4; i++) {
            await page.getByRole("cell", { name: "«" }).click();
        }
        await page.getByText(userData.dateOfBirth.year).click();
        await page.getByText(userData.dateOfBirth.month, { exact: true }).click();
        await page.getByRole("cell", { name: userData.dateOfBirth.day, exact: true }).click();

        // 选择性别
        await page.locator("#sex").selectOption(userData.gender);

        // 填写护照到期日期
        await page.locator("#passExpDte").click();
        await page.getByRole("cell", { name: "March" }).click();
        await page.getByRole("cell", { name: "2025" }).click();
        // 导航到2027年
        await page.getByText(userData.passportExpiry.year).click();
        await page.getByText(userData.passportExpiry.month, { exact: true }).click();
        await page.getByRole("cell", { name: userData.passportExpiry.day }).click();

        // 填写联系信息
        await page.locator("#email").fill(userData.email);
        await page.locator("#confirmEmail").fill(userData.email);
        await page.locator("#mobile").fill(userData.mobile);

        // 填写旅行信息
        await page.locator("#arrDt").click();
        await page.getByRole("cell", { name: arrivalDate }).click();
        await page.locator("#depDt").click();
        await page.getByRole("cell", { name: departureDate }).click();
        await page.locator("#vesselNm").fill(userData.vesselNumber);
        await page.locator("#trvlMode").selectOption(userData.travelMode);
        await page.locator("#embark").selectOption(userData.embarkation);

        // 填写住宿信息
        await page.locator("#accommodationStay").selectOption(userData.accommodation.stay);
        await page.locator("#accommodationAddress1").fill(userData.accommodation.address);
        await page.locator("#accommodationState").selectOption(userData.accommodation.state);
        await page.locator("#accommodationState").selectOption(`${userData.accommodation.state}00`);
        // await page.locator("#accommodationCity").selectOption(userData.accommodation.city);
        await page.locator("#accommodationPostcode").fill(userData.accommodation.postcode);

        console.log("表单已自动填写完成，请手动完成后续步骤或提交表单。");

        // 保持浏览器打开，直到手动关闭
        // 这里使用一个永不解决的Promise来保持程序运行
        await new Promise(() => { });

    } catch (error) {
        console.error("执行过程中出错:", error);
    }

    // 如果出错或脚本终止，关闭浏览器
    // await browser.close();
}

// 执行主函数
fillRegistrationForm().catch(error => {
    console.error("主程序执行失败:", error);
});
