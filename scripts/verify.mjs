import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const baseURL = "http://127.0.0.1:3000";
const outputDir = path.resolve("screenshots");
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const report = { screenshots: [], checks: [], consoleErrors: [] };

async function openPage(viewport, route = "/") {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") report.consoleErrors.push(`${route}: ${message.text()}`);
  });
  page.on("pageerror", (error) => report.consoleErrors.push(`${route}: ${error.message}`));
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  return { context, page };
}

async function checkOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  const passed = overflow.scroll <= overflow.viewport + 1;
  report.checks.push({ name: `${label} yatay taşma`, passed, detail: overflow });
  if (!passed) throw new Error(`${label}: horizontal overflow ${overflow.scroll}/${overflow.viewport}`);
}

async function checkHeroFit(page, label) {
  const metrics = await page.evaluate(() => {
    const hero = document.querySelector(".home-hero");
    const copy = document.querySelector(".home-hero__copy");
    const visual = document.querySelector(".home-hero__visual");
    if (!hero || !copy || !visual) return null;
    const heroRect = hero.getBoundingClientRect();
    const copyRect = copy.getBoundingClientRect();
    const visualRect = visual.getBoundingClientRect();
    return {
      viewportHeight: window.innerHeight,
      heroTop: heroRect.top,
      heroBottom: heroRect.bottom,
      heroClientHeight: hero.clientHeight,
      heroScrollHeight: hero.scrollHeight,
      copyBottom: copyRect.bottom,
      visualBottom: visualRect.bottom,
    };
  });
  const passed = Boolean(
    metrics &&
      metrics.heroTop >= 0 &&
      metrics.heroBottom <= metrics.viewportHeight + 1 &&
      metrics.heroScrollHeight <= metrics.heroClientHeight + 1 &&
      metrics.copyBottom <= metrics.heroBottom + 1 &&
      metrics.visualBottom <= metrics.heroBottom + 1,
  );
  report.checks.push({ name: `${label} hero tamamen viewport içinde`, passed, detail: metrics });
  if (!passed) throw new Error(`${label}: hero viewport dışına taşıyor ${JSON.stringify(metrics)}`);
}

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 1440, height: 720 },
  { width: 768, height: 1024 },
  { width: 375, height: 812 },
  { width: 375, height: 667 },
]) {
  const { context, page } = await openPage(viewport);
  await checkOverflow(page, `Ana sayfa ${viewport.width}px`);
  await checkHeroFit(page, `Ana sayfa ${viewport.width}×${viewport.height}`);
  const filename = `home-${viewport.width}x${viewport.height}.png`;
  await page.screenshot({ path: path.join(outputDir, filename) });
  report.screenshots.push(filename);
  await context.close();
}

{
  const { context, page } = await openPage({ width: 1440, height: 900 });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.locator(".featured-showcase").getByRole("button", { name: /sepete ekle/i }).click();
  await page.getByRole("dialog", { name: /sepetiniz/i }).waitFor();
  report.checks.push({ name: "Ürün sepete ekleniyor ve drawer açılıyor", passed: true });
  await page.getByRole("button", { name: "Sepeti kapat" }).first().click();
  await page.reload({ waitUntil: "networkidle" });
  const count = await page.locator(".cart-trigger b").textContent();
  report.checks.push({ name: "Sepet localStorage ile korunuyor", passed: count === "1", detail: count });
  if (count !== "1") throw new Error(`Expected persisted cart count 1, received ${count}`);
  await page.locator(".cart-trigger").click();
  await page.getByRole("button", { name: /ödemeye geç/i }).click();
  await page.getByRole("dialog", { name: /online ödeme yakında/i }).waitFor();
  report.checks.push({ name: "Checkout bilgi modalı açılıyor", passed: true });
  await page.screenshot({ path: path.join(outputDir, "checkout-modal-1440.png") });
  report.screenshots.push("checkout-modal-1440.png");
  await context.close();
}

{
  const { context, page } = await openPage({ width: 375, height: 812 }, "/urunler");
  await checkOverflow(page, "Mağaza 375px");
  await page.getByRole("button", { name: /^Filtreler/ }).click();
  const drawer = page.getByRole("dialog", { name: "Filtreler" });
  await drawer.locator("#mobile-filter-category").selectOption("Ev ve Dekorasyon");
  await drawer.getByRole("button", { name: /Ürünü Göster/ }).click();
  const resultText = await page.locator(".results-count").textContent();
  report.checks.push({ name: "Mobil filtre drawer çalışıyor", passed: /2 ürün bulundu/.test(resultText ?? ""), detail: resultText });
  if (!/2 ürün bulundu/.test(resultText ?? "")) throw new Error(`Unexpected filter result: ${resultText}`);
  await page.screenshot({ path: path.join(outputDir, "shop-filtered-375.png"), fullPage: true });
  report.screenshots.push("shop-filtered-375.png");
  await context.close();
}

{
  const { context, page } = await openPage(
    { width: 768, height: 1024 },
    "/urunler/moduler-masaustu-duzenleyici",
  );
  await checkOverflow(page, "Ürün detayı 768px");
  await page.locator(".option-fieldset").first().getByText("Adaçayı", { exact: true }).click();
  await page.getByLabel("Kişiselleştirme notu").fill("Örnek isim: Deniz");
  await page.locator(".purchase-row").getByRole("button", { name: /sepete ekle/i }).click();
  await page.getByRole("dialog", { name: /sepetiniz/i }).waitFor();
  const drawerText = await page.getByRole("dialog", { name: /sepetiniz/i }).textContent();
  const passed = /Adaçayı/.test(drawerText ?? "") && /Deniz/.test(drawerText ?? "");
  report.checks.push({ name: "Ürün seçenekleri ve kişiselleştirme notu sepete aktarılıyor", passed });
  if (!passed) throw new Error("Product options were not reflected in cart drawer");
  await context.close();
}

await browser.close();

if (report.consoleErrors.length) {
  report.checks.push({ name: "Console error bulunmuyor", passed: false, detail: report.consoleErrors });
  await fs.writeFile(path.join(outputDir, "verification-report.json"), JSON.stringify(report, null, 2));
  throw new Error(`Console errors found: ${report.consoleErrors.join(" | ")}`);
}

report.checks.push({ name: "Console error bulunmuyor", passed: true });
await fs.writeFile(path.join(outputDir, "verification-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
