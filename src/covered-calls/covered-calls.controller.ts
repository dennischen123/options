import { Controller, Get, Param } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Controller('covered-call')
export class CoveredCallsController {
  @Get(':ticker')
  async getCoveredCallByTicker(@Param('ticker') ticker: string): Promise<any> {
    const barchartUrl =
      'https://www.barchart.com/stocks/quotes/NIO/covered-calls';

    const preparePageForTests = async (page) => {
      const userAgent =
        'Mozilla/5.0 (X11; Linux x86_64)' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
      await page.setUserAgent(userAgent);

      //   await page.evaluateOnNewDocument(() => {
      //     Object.defineProperty(navigator, "webdriver", {
      //       get: () => false,
      //     });
      //   });
    };

    const parseData = ({ tds, headers, symbolName, expiration }) => {
      const parsedTds = [];

      for (let i = 0; i < tds.length; i += 14) {
        parsedTds.push(tds.slice(i, i + 13));
      }
      return { headers, symbolName, expiration, rowData: parsedTds };
    };

    //   (async () => {
    console.log('puppeteer = ', puppeteer);
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });
    const page = await browser.newPage();

    await preparePageForTests(page);

    await page.goto(barchartUrl);

    const dataObject = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('table tr td')).map(
        (td: HTMLElement) => td.innerText,
      );

      const headers = Array.from(document.querySelectorAll('table tr th')).map(
        (header: HTMLElement) => header.innerText,
      );

      const symbolName = (<HTMLElement>(
        document.querySelectorAll('.symbol-name h1 span')[1]
      )).innerText;

      const expiration = (<HTMLElement>(
        document.querySelector('select[data-event-name] option:checked')
      )).innerText;

      return { headers, symbolName, expiration, tds };
    });

    const parsedData = parseData(dataObject);

    console.log('parsedData = ', parsedData);

    await browser.close();

    return parsedData;
    // return getCoveredCallByTicker(ticker);
  }
}
