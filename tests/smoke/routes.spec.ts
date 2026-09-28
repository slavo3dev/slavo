import { expect, test } from "@playwright/test";

for (const route of ["/", "/login", "/dashboard", "/about", "/porch", "/blog", "/programs", "/free-resources", "/learn", "/learn/ai-from-zero/day-1"]) {
  test(`${route} remains accessible`, async ({ request }) => {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("<html");
  });
}

test("learning catalog is read-only and declares persistence unavailable", async ({ request }) => {
  const catalog = await request.get("/api/learning/catalog");
  expect(catalog.status()).toBe(200);
  expect((await catalog.json()).persistence.available).toBe(false);
  const write = await request.post("/api/learning/catalog", { data: {} });
  expect(write.status()).toBe(405);
  expect(write.headers().allow).toBe("GET");
});