const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const host = "http://localhost:5500";

describe("Tests", async function () {
    this.timeout(6000);

    let browser, page;

    before(async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        page.close();
    });

    // Това не е истински тест
    // Тества просто дали работи всичко преди да стартираме да тестваме самият сайт.
    // it("works", async () => {
    //     await new Promise((r) => setTimeout(r, 2000));
    //     expect(1).to.equal(1);
    // });

    it("loads all books", async () => {
        // navigate to page
        await page.goto(host);

        // await page.screenshot({ path: "page.png" });

        await page.click("text=Load all books");

        await page.waitForSelector("text=Harry Potter");

        const rowData = await page.$$eval("tbody tr", (rows) => rows.map((r) => r.textContent));

        expect(rowData[0]).to.contains("Harry Potter");
        expect(rowData[0]).to.contains("Rowling");
        expect(rowData[1]).to.contains("C# Fundamentals");
        expect(rowData[1]).to.contains("Nakov");
    });
});
