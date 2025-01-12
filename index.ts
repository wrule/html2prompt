import { chromium, Browser, Page } from 'playwright';

async function getPageHtml(url: string): Promise<string> {
  let browser: Browser | null = null;
  let page: Page | null = null;
  try {
    browser = await chromium.launch({
      headless: false,
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(30000);
    await page.goto(url, {
      waitUntil: 'networkidle',
    });
    const html = await page.content();
    return html;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  } finally {
    if (page) await page.close();
    if (browser) await browser.close();
  }
}

async function main() {
  try {
    const url = 'https://www.perfma.com';
    const html = await getPageHtml(url);
    console.log('Page HTML:', html);
  } catch (error) {
    console.error('Failed to get page HTML:', error);
  }
}

main();
