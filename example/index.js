const PDF2png = require('../index');

(async() => {

  const p = new PDF2png();
  await p.init();
  // await p.run(`https://alg-question-1255803335.cos.ap-beijing.myqcloud.com/dev/a_level/pdf/69d688c5bfdd968c27901787a744cc69.pdf`, __dirname);
  await p.run(`https://alg-question-1255803335.cos.ap-beijing.myqcloud.com/dev/a_level/pdf/5b3aa4fdf89d10e73067fb49f6f5dedc.pdf`, process.cwd());

  await p.stop();

})()
