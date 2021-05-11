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
  async run(pdfEndpoint, pngDirPath, pageNo) {
    const newPage = await this.browser.newPage();
    await newPage.goto(`file:${path.join(__dirname, `index.html?pdfEndpoint=${pdfEndpoint}&pageNo=${pageNo}&scale=${this.scale}`)}`);
    await newPage.waitForSelector('#endIdentifier', {timeout: 0});
    const ehArr = await newPage.$$('#canvas-wrapper>canvas');

    for (let i = 0; i < ehArr.length; i++) {
      const eh = ehArr[i];
      const {base64, pageNo} = await eh.evaluate((node) => ({base64: node.toDataURL(), pageNo: node.getAttribute('pageno')}));
      fs.writeFile(path.resolve(pngDirPath, `${pageNo}.png`), base64.replace(/^data:image\/png;base64,/, ""), {
          encoding: 'base64'
      }, (err) => {if(err)console.error(err)})
    }
    await newPage.close();
  }

  async stop() {
    await this.browser.close();
  }

}

module.exports = PDF2png;