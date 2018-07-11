const { spawn, exec } = require('child_process');
const gulp = require('gulp');
var clean = require('gulp-clean');
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

gulp.task('clean', function() {
    return gulp.src('dist', { read: false }).pipe(clean());
});

gulp.task('watch', ['scripts', 'assets', 'server'], () => {
    gulp.watch('src/**/*.ts', ['scripts', 'assets', 'copy', 'server']);
    gulp.watch('src/**/*.ejs', ['scripts', 'assets', 'copy', 'server']);
});

gulp.task('assets', function() {
    return gulp.src(JSON_FILES).pipe(gulp.dest('dist/dist'));
});

gulp.task('angular', function() {
    exec('cd ./FrontendSource/ && npm run build', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('server', function() {
    if (node) {
        console.log('Node Stop.');
        node.kill();
        clearTimeout(timeout);
    }

    timerout = setTimeout(function() {
        console.log('Node Start.');
        node = spawn('node', ['./dist/Start.js'], { stdio: 'inherit' })
        node.on('close', function(code) {
            if (code === 8) {
                console.log('Error detected, waiting for changes...');
            }
        });
    }, 3000);
});

// DESENVOLVIMENTO
gulp.task('default', ['clean', 'scripts', 'assets', 'server', 'watch']);

gulp.task('passos', ['clean', 'scripts', 'assets', 'angular']);

// PROCEDIMENTO DE DEPLOY
gulp.task('deploy', function() {
    exec('gulp passos', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});