var gulp        = require('gulp');
var browserify  = require('browserify');
var rename      = require('gulp-rename');
var source      = require('vinyl-source-stream');
var es          = require('event-stream');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

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

gulp.task('browserify', function(){
    // we define our input files, which we want to have
    // bundled:
    var files = [
        './scripts/main-dataDelivery.js',
        './scripts/main-jqueryFunctions.js',
        './scripts/main-going.js',
        './scripts/main-addTrack.js',
        './scripts/main-editTrack.js'
    ];
    // map them to our stream function
    var tasks = files.map(function(entry) {
        return browserify({ entries: [entry] })
            .bundle()
            .pipe(source(entry))
        // rename them to have "bundle as postfix"
            .pipe(rename({
            extname: '.bundle.js'
        }))
            .pipe(gulp.dest('./scripts/dist'));
    });
    // create a merged stream
    return es.merge.apply(null, tasks);
});

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
