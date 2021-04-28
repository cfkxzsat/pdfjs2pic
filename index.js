const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PDF2png {
  async init(scale) {
    this.scale = scale ?? 8;
    this.browser = await puppeteer.launch({
      headless: false
    });
    this.page = await this.browser.newPage();
  }
  async run(pdfEndpoint, page, pngPath) {
    await this.page.goto(`file:${path.join(__dirname, `index.html?pdfEndpoint=${pdfEndpoint}&page=${page}&scale=${this.scale}`)}`);
    await this.page.waitForSelector('#endIdentifier');
    const ehArr = await this.page.$$('#canvas-wrapper>canvas');

    for (let i = 0; i < ehArr.length; i++) {
      const eh = ehArr[i];
      const base64 = await eh.evaluate((node) => node.toDataURL());
      fs.writeFile(`${i + 1}.png`, base64.replace(/^data:image\/png;base64,/, ""), {
          encoding: 'base64'
      }, (err) => console.error(err))
    }
  }

  async stop() {
    await this.browser.close();
  }

}

(async() => {

  const p = new PDF2png();
  await p.init();
  await p.run(`pastPaper/teacher-try-out/Mark-scheme/furtherMathematics-edexcel/Edexcel_2014_Jan_WFM01-01_ms.pdf`);
  // await p.run(`pastPaper/Edexcel/Economics/2014.1/Question-paper/Edexcel_2014_Jan_6ECA3-01_qp.pdf`, 1, `2.png`);
  // await p.run(`pastPaper/teacher-try-out/Mark-scheme/furtherMathematics-edexcel/Edexcel_2014_Jan_WFM01-01_ms.pdf`, 3, `3.png`);


//   await p.stop();

})()


module.exports = PDF2png;