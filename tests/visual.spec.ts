import { expect, test } from "@playwright/test";

test.describe("portfolio visual smoke", () => {
  test("desktop renders captured projects, resume, and nonblank canvas", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { name: /Phan Nguyen Quoc Minh/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Phan Nguyen Quoc Minh/i })).toHaveCSS("animation-name", "hero-name-light");
    await expect(page.getByRole("heading", { name: /Phan Nguyen Quoc Minh/i })).toHaveCSS("text-shadow", "none");
    await expect(page.getByAltText("Captured Buddy landing page")).toBeVisible();
    await expect(page.getByAltText("Preview of Phan Nguyen Quoc Minh full-stack resume")).toBeVisible();
    await expect(page.getByText("Weekly downloads")).toBeVisible();
    await expect(page.getByText("npm install -g @minhpnq1807/contextos")).toBeVisible();
    await expect(page.getByRole("link", { name: "Website" })).toBeVisible();
    await expect(page.getByRole("link", { name: "README", exact: true })).toBeVisible();
    await expect(page.locator('a[href="/fullstack.pdf"]').first()).toHaveAttribute("download", "Phan-Nguyen-Quoc-Minh-Resume.pdf");
    await expect(page.getByRole("link", { name: "Download resume PDF" })).toHaveAttribute("download", "Phan-Nguyen-Quoc-Minh-Resume.pdf");

    const canvasDataLength = await page.locator("canvas").evaluate((canvas) => {
      return (canvas as HTMLCanvasElement).toDataURL("image/png").length;
    });
    expect(canvasDataLength).toBeGreaterThan(5000);
  });

  test("hero name keeps high contrast in dark mode", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    await page.getByRole("button", { name: /Switch to dark mode/i }).click();
    await expect(page.getByRole("heading", { name: /Phan Nguyen Quoc Minh/i })).toHaveCSS("animation-name", "hero-name-dark");
  });

  test("hero name words do not overlap when wrapped", async ({ page }) => {
    await page.setViewportSize({ width: 760, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    const overlaps = await page.locator(".hero-name .word-mask").evaluateAll((words) => {
      const rects = words.map((word) => word.getBoundingClientRect());
      return rects.some((rect, index) =>
        rects.slice(index + 1).some((next) => {
          const xOverlap = Math.max(0, Math.min(rect.right, next.right) - Math.max(rect.left, next.left));
          const yOverlap = Math.max(0, Math.min(rect.bottom, next.bottom) - Math.max(rect.top, next.top));
          return xOverlap > 1 && yOverlap > 1;
        }),
      );
    });

    expect(overlaps).toBe(false);
  });

  test("mobile layout keeps the core sections visible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Projects shown as systems/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Need a developer/i })).toBeVisible();
  });

  test("scroll reveals animated text sections", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    const workHeading = page.getByRole("heading", { name: /Projects shown as systems/i });
    await workHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await expect(workHeading).toHaveCSS("opacity", "1");

    const contactHeading = page.getByRole("heading", { name: /Need a developer/i });
    await contactHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await expect(contactHeading).toHaveCSS("opacity", "1");
  });

  test("Buddy screenshot picker promotes clicked images and resets after leaving section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    const billingButton = page.locator(".buddy-strip").getByRole("button", { name: /Buddy billing screenshot/i });
    await billingButton.scrollIntoViewIfNeeded();
    await billingButton.click();

    const stageImage = page.locator(".buddy-flight-card img");
    await expect(stageImage).toHaveAttribute("src", "/buddy/billing.png");
    await expect(billingButton).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("button", { name: /Open Buddy billing screenshot preview/i })).toHaveAttribute("aria-pressed", "true");

    await page.getByRole("heading", { name: /Need a developer/i }).scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(stageImage).toHaveAttribute("src", "/buddy/landing.png");
  });

  test("ContextOS install command can be copied", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async (value: string) => {
            window.localStorage.setItem("copied-install-command", value);
          },
        },
      });
    });
    await page.goto("/", { waitUntil: "networkidle" });

    const copyButton = page.getByRole("button", { name: "Copy ContextOS install command" });
    await copyButton.scrollIntoViewIfNeeded();
    await copyButton.click();

    await expect(copyButton).toContainText("Copied");
    await expect
      .poll(() => page.evaluate(() => window.localStorage.getItem("copied-install-command")))
      .toBe("npm install -g @minhpnq1807/contextos\nctx setup");
  });

  test("contact dialog submits customer details with optional attachment", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    let requestBody: Record<string, unknown> | null = null;
    await page.route("/api/contact", async (route) => {
      requestBody = route.request().postDataJSON();
      await new Promise((resolve) => setTimeout(resolve, 220));
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await page.goto("/", { waitUntil: "networkidle" });

    await page.getByRole("button", { name: "Send mail" }).click();
    await expect(page.getByRole("heading", { name: "Send a project note" })).toBeVisible();
    await page.getByLabel("Your name").fill("Test Customer");
    await page.getByLabel("Your email").fill("customer@example.com");
    await page.getByLabel("What do you want from me?").fill("I want to invite you to build a product.");
    await page.getByLabel("Attach optional file").setInputFiles({
      name: "brief.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("project brief"),
    });
    await page.getByRole("button", { name: "Send", exact: true }).click();

    await expect(page.getByRole("button", { name: "Sending", exact: true })).toBeVisible();
    await expect(page.locator(".loading-icon")).toBeVisible();
    await expect(page.getByText("Sent successfully. I will reply from my inbox.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Send a project note" })).toBeHidden();
    expect(requestBody).toMatchObject({
      customerEmail: "customer@example.com",
      message: "I want to invite you to build a product.",
      name: "Test Customer",
    });
    expect((requestBody?.attachment as { name?: string } | undefined)?.name).toBe("brief.txt");
  });

  test("contact dialog closes when clicking outside", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    await page.getByRole("button", { name: "Send mail" }).click();
    await expect(page.getByRole("heading", { name: "Send a project note" })).toBeVisible();
    await page.locator(".contact-dialog-backdrop").click({ position: { x: 900, y: 120 } });
    await expect(page.getByRole("heading", { name: "Send a project note" })).toBeHidden();
  });

  test("Buddy orbit cards open screenshot modal and close with app-window animation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    const orbitButton = page.getByRole("button", { name: /Open Buddy home screenshot preview/i });
    await orbitButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await orbitButton.click();

    const dialog = page.getByRole("dialog", { name: /Buddy Home screenshot/i });
    await expect(dialog).toBeVisible();
    await expect(page.getByAltText("Buddy home screenshot preview")).toBeVisible();

    await page.getByRole("button", { name: "Close Buddy screenshot preview" }).last().click();
    await expect(dialog).toHaveClass(/is-closing/);
    await expect(dialog).toBeHidden();
  });

  test("Buddy landing orbit card opens its modal and theme changes Buddy image flow", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    const landingOrbitButton = page.getByRole("button", { name: /Open Buddy landing screenshot preview/i });
    await landingOrbitButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await landingOrbitButton.click();

    await expect(page.getByRole("dialog", { name: /Buddy Landing screenshot/i })).toBeVisible();
    await expect(page.getByAltText("Buddy landing screenshot preview")).toHaveAttribute("src", "/buddy/landing.png");
    await page.getByRole("button", { name: "Close Buddy screenshot preview" }).last().click();
    await expect(page.getByRole("dialog", { name: /Buddy Landing screenshot/i })).toBeHidden();

    await page.getByRole("button", { name: /Switch to dark mode/i }).click();
    await expect(page.locator(".buddy-flight-card img")).toHaveAttribute("src", "/buddy/dark-landing.png");
    await expect(landingOrbitButton.locator("img")).toHaveAttribute("src", "/buddy/dark-landing.png");
  });

  test("Buddy selected landing orbit card remains clickable and draggable", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    const landingStripButton = page.locator(".buddy-strip").getByRole("button", { name: /Buddy landing screenshot/i });
    const landingOrbitButton = page.getByRole("button", { name: /Open Buddy landing screenshot preview/i });
    await landingStripButton.scrollIntoViewIfNeeded();
    await landingStripButton.click();
    await expect(landingStripButton).toHaveAttribute("aria-pressed", "true");
    await expect(landingOrbitButton).toHaveAttribute("aria-pressed", "true");

    await landingOrbitButton.click();
    const dialog = page.getByRole("dialog", { name: /Buddy Landing screenshot/i });
    await expect(dialog).toBeVisible();
    await page.getByRole("button", { name: "Close Buddy screenshot preview" }).last().click();
    await expect(dialog).toBeHidden();

    const before = await landingOrbitButton.boundingBox();
    expect(before).not.toBeNull();

    await landingOrbitButton.hover();
    const scrollBefore = await page.evaluate(() => window.scrollY);
    await page.mouse.down();
    const targetX = before!.x + 260;
    const targetY = before!.y + 180;
    await page.mouse.move(targetX, targetY, { steps: 8 });
    await page.mouse.up();

    const after = await landingOrbitButton.boundingBox();
    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(after).not.toBeNull();
    expect(Math.abs(scrollAfter - scrollBefore)).toBeLessThan(2);
    expect(Math.abs(after!.x - before!.x) + Math.abs(after!.y - before!.y)).toBeGreaterThan(40);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("Buddy orbit cards can be arranged by dragging inside the stage", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    const orbitButton = page.getByRole("button", { name: /Open Buddy explore screenshot preview/i });
    await orbitButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    await orbitButton.hover();
    await page.waitForTimeout(250);

    const before = await orbitButton.boundingBox();
    expect(before).not.toBeNull();

    const scrollBefore = await page.evaluate(() => window.scrollY);
    await page.mouse.move(before!.x + before!.width / 2, before!.y + before!.height / 2);
    await page.mouse.down();
    const targetX = before!.x + before!.width / 2 - 90;
    const targetY = before!.y + before!.height / 2 + 58;
    await page.mouse.move(targetX, targetY, { steps: 8 });
    const scrollDuringDrag = await page.evaluate(() => window.scrollY);
    const held = await orbitButton.boundingBox();
    expect(held).not.toBeNull();
    expect(Math.abs(scrollDuringDrag - scrollBefore)).toBeLessThan(2);
    expect(Math.abs(held!.x + held!.width / 2 - targetX) + Math.abs(held!.y + held!.height / 2 - targetY)).toBeLessThan(60);
    await page.mouse.up();
    const scrollAfterDrag = await page.evaluate(() => window.scrollY);

    const after = await orbitButton.boundingBox();
    expect(after).not.toBeNull();
    expect(Math.abs(scrollAfterDrag - scrollBefore)).toBeLessThan(2);
    expect(Math.abs(after!.x - before!.x) + Math.abs(after!.y - before!.y)).toBeGreaterThan(40);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
