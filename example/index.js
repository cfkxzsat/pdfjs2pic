const PDF2png = require('../index');

(async() => {

  const p = new PDF2png({headless: false});
  await p.init();
  const p1 = p.run(`https://alg-question-1255803335.cos.ap-beijing.myqcloud.com/dev/a_level/pdf/a92ebf515f74ca0ee11b075a9e35540d.pdf`, __dirname);
  const p2 = p.run(`https://alg-question-1255803335.cos.ap-beijing.myqcloud.com/dev/a_level/pdf/5b3aa4fdf89d10e73067fb49f6f5dedc.pdf`, process.cwd(), '2,4');
  await Promise.all([p1, p2]);
  await p.stop();

})()
