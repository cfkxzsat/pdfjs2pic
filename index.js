const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PDF2png {
  async init(scale) {
    this.scale = scale ?? 8;
    this.browser = await puppeteer.launch({
      headless: false
    });
  }
  async run(pdfEndpoint, pngDirPath, page) {
    this.page = await this.browser.newPage();
    await this.page.goto(`file:${path.join(__dirname, `index.html?pdfEndpoint=${pdfEndpoint}&page=${page}&scale=${this.scale}`)}`);
    await this.page.waitForSelector('#endIdentifier', {timeout: 0});
    const ehArr = await this.page.$$('#canvas-wrapper>canvas');

    for (let i = 0; i < ehArr.length; i++) {
      const eh = ehArr[i];
      const base64 = await eh.evaluate((node) => node.toDataURL());
      fs.writeFile(path.resolve(pngDirPath, `${i + 1}.png`), base64.replace(/^data:image\/png;base64,/, ""), {
          encoding: 'base64'
      }, (err) => {if(err)console.error(err)})
    }
    await this.page.close();
  }

  async stop() {
    await this.browser.close();
  }

}

module.exports = PDF2png;