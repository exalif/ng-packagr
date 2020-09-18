const cpx = require('cpx');
const globby = require('globby');
const rimraf = require('rimraf');

(async () => {
  try {
    rimraf.sync('node_modules');
    rimraf.sync('src');
    rimraf.sync('docs');
    rimraf.sync('integration');
    rimraf.sync('scripts');
    rimraf.sync('.circleci');
    rimraf.sync('.github');
    rimraf.sync('.vscode');

    const paths = await globby(['**/*', '!dist/**/*', '!.git/**/*'], { dot: true });

    paths.forEach(path => {
      rimraf.sync(path);
    });

    cpx.copy('dist/**/*', '.');
    rimraf.sync('dist');
  } catch (e) {
    console.error(e);
  }
})();
