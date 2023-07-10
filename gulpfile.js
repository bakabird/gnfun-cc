const gulp = require("gulp")
const ts = require('gulp-typescript');
const rollup = require('rollup');
const rename = require('gulp-rename')
const uglify = require("gulp-uglify");
const dts = require('dts-bundle');
const tsProject = ts.createProject('tsconfig.json', { declaration: true });

gulp.task('buildJs', () => {
    return tsProject.src().pipe(tsProject()).pipe(gulp.dest('./build'));
})

gulp.task("rollup", async function () {
    let config = {
        input: "build/main.js",
        external: ['cc'],
        output: {
            file: `./gnfun-cc.mjs`,
            format: 'esm',
            extend: true,
            name: 'gnfun-cc',
        },
    };
    const subTask = await rollup.rollup(config);
    await subTask.write(config.output);
});


//js文件打包
gulp.task("uglify", function () {
    return gulp.src(`./gnfun-cc.mjs`)
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("./"));
});


gulp.task('buildDts', function () {
    return new Promise(function (resolve, reject) {
        dts.bundle({ name: "gnfun-cc", main: "./build/main.d.ts", out: "../gnfun-cc.d.ts" });
        resolve();
    });
})

gulp.task('build', gulp.series(
    'buildJs',
    'rollup',
    'uglify',
    'buildDts',
))