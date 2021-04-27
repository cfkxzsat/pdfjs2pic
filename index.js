const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PDF2png {
  async init(scale) {
    this.scale = scale;
    this.browser = await puppeteer.launch({
      headless: false
    });
    this.page = await this.browser.newPage();
  }
  async run(pdfEndpoint, page, pngPath) {
    await this.page.goto(`file:${path.join(__dirname, `index.html?pdfEndpoint=${pdfEndpoint}&page=${page}&scale=${this.scale}`)}`);
    await this.page.waitForSelector('#endIdentifier');

    const eh = await this.page.$('#the-canvas');

    const base64 = await eh.evaluate((node) => node.toDataURL());
    fs.writeFileSync(pngPath, base64.replace(/^data:image\/png;base64,/, ""), {
        encoding: 'base64'
    })
  }

  async stop() {
    await this.browser.close();
  }

}

module.exports = PDF2png;