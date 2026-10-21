import { expect, test, type Page } from "@playwright/test";
import fixture from "../src/shared/content/fixture/projects.json";

const routes = [
  "/",
  "/project",
  ...fixture.projects.map((project) => `/project/${project.slug}`),
  "/about",
  "/tech-stack",
  "/fit",
  "/contact",
];

const viewports = [
  { name: "mobile 390", width: 390, height: 844 },
  { name: "desktop 1440", width: 1440, height: 900 },
];

async function horizontalOverflow(page: Page) {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

for (const viewport of viewports) {
  test.describe(`layout at ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("no route scrolls horizontally", async ({ page }) => {
      for (const route of routes) {
        await page.goto(route);
        await page.waitForLoadState("networkidle");
        expect(await horizontalOverflow(page), route).toBeLessThanOrEqual(0);
      }
    });

    test("page titles carry the name once", async ({ page }) => {
      for (const route of routes) {
        await page.goto(route);
        const title = await page.title();
        expect(title.match(/Manjoong Kim/g) ?? [], `${route}: ${title}`).toHaveLength(1);
      }
    });

    test("header controls all have accessible names", async ({ page }) => {
      await page.goto("/");
      const header = page.locator("header");
      const controls = header.locator("a:visible, button:visible");
      const count = await controls.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(controls.nth(i)).toHaveAccessibleName(/\S/);
      }
      await page.goto("/about");
      await expect(header.locator('[aria-current="page"]:visible')).toHaveCount(
        viewport.width < 768 ? 0 : 1,
      );
    });
  });
}

test.describe("image lightbox", () => {
  for (const viewport of viewports) {
    test(`covers the viewport and restores focus at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/project/pocaz");
      const trigger = page.locator('button[aria-haspopup="dialog"]').first();
      await trigger.click();

      const dialog = page.getByTestId("image-lightbox");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveAttribute("open", "");
      const box = await dialog.boundingBox();
      expect(box).toMatchObject({ x: 0, y: 0, width: viewport.width, height: viewport.height });

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    });
  }
});

test.describe("mobile form controls", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("text inputs use at least 16px so iOS does not zoom", async ({ page }) => {
    const fontSizes = async () =>
      page.evaluate(() =>
        [...document.querySelectorAll("input:not([type=hidden]), textarea, select")]
          .filter((el) => (el as HTMLElement).offsetParent !== null)
          .map((el) => ({
            id: el.id || el.getAttribute("name") || el.tagName,
            size: Number.parseFloat(getComputedStyle(el).fontSize),
          })),
      );

    for (const route of ["/", "/contact", "/fit"]) {
      await page.goto(route);
      if (route === "/") {
        await page.getByRole("button", { name: /채팅 열기|Open chat/i }).click();
      }
      for (const control of await fontSizes()) {
        expect(control.size, `${route} ${control.id}`).toBeGreaterThanOrEqual(16);
      }
    }
  });
});
