import { expect, test } from "@playwright/test";

test("Day 1 preview gives feedback, completes reflection, and resets on reload", async ({ page }) => {
  const outgoingBodies: string[] = [];
  page.on("request", (request) => { outgoingBodies.push(request.postData() ?? ""); });
  await page.goto("/learn");
  await page.getByRole("link", { name: "Preview Day 1" }).click();
  await expect(page.getByRole("heading", { name: "What AI Can and Cannot Do" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Enrollment unavailable" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Complete session preview" })).toBeDisabled();
  await page.getByRole("checkbox", { name: "I have read the lesson and example." }).check();
  for (const scenario of ["notes", "citation", "urgent"]) {
    await page.locator(`input[name="${scenario}"][value="draft-with-review"]`).check();
  }
  await page.getByRole("button", { name: "Check practice" }).click();
  await expect(page.getByRole("heading", { name: "Try again with feedback" })).toBeVisible();
  await page.locator('input[name="citation"][value="verify-source"]').check();
  await page.locator('input[name="urgent"][value="human-expert"]').check();
  await page.getByRole("button", { name: "Check practice" }).click();
  await expect(page.getByRole("heading", { name: "All three criteria met" })).toBeVisible();
  const reflection = "I will compare an AI summary with my original notes before using it.";
  await page.locator("#reflection").fill(reflection);
  await page.getByRole("button", { name: "Complete session preview" }).click();
  await expect(page.getByText("Day 1 preview complete. Proficiency is not assessed; progress is not saved.")).toBeVisible();
  await page.getByRole("link", { name: "See session progress on your dashboard" }).click();
  await expect(page.getByText("Session preview progress: 3 / 3 steps")).toBeVisible();
  await page.getByRole("link", { name: "Review Day 1" }).click();
  await expect(page.locator("#reflection")).toHaveValue(reflection);
  expect(outgoingBodies.join(" ")).not.toContain(reflection);
  expect(await page.evaluate(() => JSON.stringify({ ...localStorage, ...sessionStorage }))).not.toContain(reflection);
  await page.reload();
  await expect(page.locator("#reflection")).toHaveValue("");
  await expect(page.getByRole("checkbox", { name: "I have read the lesson and example." })).not.toBeChecked();
  await expect(page.getByRole("button", { name: "Complete session preview" })).toBeDisabled();
});

test("Day 1 layout is usable on mobile and desktop", async ({ page }) => {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/learn/ai-from-zero/day-1");
    await expect(page.getByRole("heading", { name: "What AI Can and Cannot Do" })).toBeVisible();
    const reading = page.getByRole("checkbox", { name: "I have read the lesson and example." });
    await reading.check();
    await reading.uncheck();
    await expect(page.locator("#preloader-active")).toBeHidden();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/day-1-${viewport.width}.png`, fullPage: true });
  }
});