//copy paste fra Magnus
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var browserify  = require('browserify')
//var watchify    = require('watchify');
var rename      = require('gulp-rename');
var source      = require('vinyl-source-stream');
var sourceFile  = './scripts/main.js';
//var sourceFileE  = './scripts/mainE.js';
var destFolder  = './scripts/';
var destFile    = 'bundle.js';
//var destFileE    = 'bundleE.js';


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});



/*
// Basic usage
gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('./scripts/main.js')
        .pipe(browserify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./'))
});
*/
gulp.task('browserify', function() {
    return browserify(sourceFile)
        .bundle()
        .pipe(source(destFile))
        .pipe(gulp.dest(destFolder));
});

/*
gulp.task('browserify', function() {
    return browserify(sourceFileE)
        standalone: 'cM'
        .bundle()
        .pipe(source(destFileE))
        .pipe(gulp.dest(destFolder))




gulp.task('default', ['serve' ,'browserify'], function(){ //['serve', 'data' 'watch' , ],

});
//https://semaphoreci.com/community/tutorials/setting-up-an-end-to-end-testing-workflow-with-gulp-mocha-and-webdriverio

const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');
const Launcher = require('webdriverio/build/lib/launcher');
const path = require('path');
const wdio = new Launcher(path.join(__dirname, 'wdio.conf.js'));

var httpServer;


gulp.task('http', function (done) {
    const app = connect().use(serveStatic('.'));
    httpServer = http.createServer(app).listen(9000, done);
});

gulp.task('e2e', ['http'], function () {
    return wdio.run(function (code) {
        process.exit(code);
    }, function (error) {
        console.error('Launcher failed to start the test', error.stacktrace);
        process.exit(1);
    });
});

gulp.task('test', ['e2e'], function() {
    httpServer.close();
});
