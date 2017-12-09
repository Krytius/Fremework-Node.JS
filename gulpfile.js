const { spawn } = require('child_process');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

var node;
var timeout;

gulp.task('scripts', () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts', 'assets', 'server'], () => {
    gulp.watch('src/**/*.ts', ['scripts', 'assets', 'server']);
    gulp.watch('src/**/*.ejs', ['scripts', 'assets', 'server']);
});

gulp.task('assets', function() {
    return gulp.src(JSON_FILES).pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
    if (node) {
        console.log('Node Stop.');
        node.kill();
        clearTimeout(timeout);
    }

    timerout = setTimeout(function() {
        console.log('Node Start.');
        node = spawn('node', ['./dist/Index.js'], { stdio: 'inherit' })
        node.on('close', function(code) {
            if (code === 8) {
                console.log('Error detected, waiting for changes...');
            }
        });
    }, 3000);
});

gulp.task('default', ['scripts', 'assets', 'server', 'watch']);