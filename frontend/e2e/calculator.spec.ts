import { devices, expect, test } from "@playwright/test";

const DISPLAY = '[data-wf="i-1-0-0"]';

async function readDisplay(page: import("@playwright/test").Page) {
  return (await page.locator(DISPLAY).innerText()).trim();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/calculator");
});

test("[AC-006] clicking 2 + 3 = shows 5 on the display", async ({ page }) => {
  await page.getByRole("button", { name: "Two", exact: true }).click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByRole("button", { name: "Three", exact: true }).click();
  await page.getByRole("button", { name: "Equals", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("5");
});

test("[AC-081] clicking 5 − 3 = shows 2", async ({ page }) => {
  await page.getByRole("button", { name: "Five", exact: true }).click();
  await page.getByRole("button", { name: "Subtract", exact: true }).click();
  await page.getByRole("button", { name: "Three", exact: true }).click();
  await page.getByRole("button", { name: "Equals", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("2");
});

test("[AC-082] clicking 4 × 3 = shows 12", async ({ page }) => {
  await page.getByRole("button", { name: "Four", exact: true }).click();
  await page.getByRole("button", { name: "Multiply", exact: true }).click();
  await page.getByRole("button", { name: "Three", exact: true }).click();
  await page.getByRole("button", { name: "Equals", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("12");
});

test("[AC-083] clicking 12 ÷ 4 = shows 3", async ({ page }) => {
  await page.getByRole("button", { name: "One", exact: true }).click();
  await page.getByRole("button", { name: "Two", exact: true }).click();
  await page.getByRole("button", { name: "Divide", exact: true }).click();
  await page.getByRole("button", { name: "Four", exact: true }).click();
  await page.getByRole("button", { name: "Equals", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("3");
});

test("[AC-007][AC-090] typing digits/operators and Enter matches equivalent button clicks", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Two", exact: true }).click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByRole("button", { name: "Three", exact: true }).click();
  await page.getByRole("button", { name: "Equals", exact: true }).click();
  const viaButtons = await readDisplay(page);

  await page.reload();
  await page.locator("body").click(); // ensure focus is not on a button so keydown is handled
  await page.keyboard.press("2");
  await page.keyboard.press("+");
  await page.keyboard.press("3");
  await page.keyboard.press("Enter");
  const viaKeyboard = await readDisplay(page);

  expect(viaKeyboard).toBe(viaButtons);
  expect(viaKeyboard).toBe("5");
});

test("[AC-091] display shows the current entry as each input is registered", async ({ page }) => {
  await page.getByRole("button", { name: "One", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("1");
  await page.getByRole("button", { name: "Two", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("12");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByRole("button", { name: "Four", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("4");
});

test("[AC-005] AC from an entry returns the display to 0", async ({ page }) => {
  await page.getByRole("button", { name: "Seven", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("7");
  await page.getByRole("button", { name: "All clear", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("0");
});

test("[AC-005] AC from a pending operation returns the display to 0", async ({ page }) => {
  await page.getByRole("button", { name: "Seven", exact: true }).click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("7");
  await page.getByRole("button", { name: "All clear", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("0");
});

test("[AC-005] AC from a result returns the display to 0", async ({ page }) => {
  await page.getByRole("button", { name: "Seven", exact: true }).click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByRole("button", { name: "Three", exact: true }).click();
  await page.getByRole("button", { name: "Equals", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("10");
  await page.getByRole("button", { name: "All clear", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("0");
});

test("[AC-088][NFR-006] dividing by zero shows an error, and AC clears it without reload", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Five", exact: true }).click();
  await page.getByRole("button", { name: "Divide", exact: true }).click();
  await page.getByRole("button", { name: "Zero", exact: true }).click();
  await page.getByRole("button", { name: "Equals", exact: true }).click();

  await expect(page.getByRole("alert")).toBeVisible();

  await page.getByRole("button", { name: "All clear", exact: true }).click();
  await expect(page.locator(DISPLAY)).toHaveText("0");
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test.describe("mobile touchscreen", () => {
  test.use({ ...devices["Pixel 5"], hasTouch: true });

  test("[AC-089][NFR-004] a tap sequence registers once per tap and the display updates", async ({
    page,
  }) => {
    await page.goto("/calculator");
    const one = page.getByRole("button", { name: "One", exact: true });
    const two = page.getByRole("button", { name: "Two", exact: true });
    const add = page.getByRole("button", { name: "Add", exact: true });
    const equals = page.getByRole("button", { name: "Equals", exact: true });

    await one.tap();
    await expect(page.locator(DISPLAY)).toHaveText("1");
    await two.tap();
    await expect(page.locator(DISPLAY)).toHaveText("12");
    await add.tap();
    await two.tap();
    await equals.tap();
    await expect(page.locator(DISPLAY)).toHaveText("14");
  });
});
