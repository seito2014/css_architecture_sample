var gulp = require("gulp");

var ejs = require("gulp-ejs"),
    sass = require("gulp-ruby-sass"),
    pleeease = require("gulp-pleeease"),
    browser = require("browser-sync"),
    frontNote = require('gulp-frontnote');

var DEV = "app/dev",
    PUBLIC = "app/public";

//ejs
gulp.task("ejs", function() {
    gulp.src(
        [DEV + "/ejs/**/*.ejs",'!' + DEV + "/ejs/**/_*.ejs"]
    )
        .pipe(ejs())
        .pipe(gulp.dest(PUBLIC))
        .pipe(browser.reload({stream:true}));
});

//style
gulp.task("style", function() {
    return gulp.src(DEV + "/sass/**/*.scss")
        .pipe(frontNote({
            title:'STYLE GUIDE',
            overview:'./README.md',
            out:'./style_guide',
            css:'../app/public/css/common.css',
            //script:'',
            clean:true
            //verbose:true
        }))
        .pipe(sass({
            style:"nested",
            compass : true,
            "sourcemap=none": true
        }))
        .pipe(pleeease({
            fallbacks: {
                autoprefixer: ["last 2 version", "ie 9"]
            },
            minifier: false
        }))
        .pipe(gulp.dest(PUBLIC + "/css"))
        .pipe(browser.reload({stream:true}));
});

//copy
gulp.task("js", function() {
    return gulp.src(DEV + "/js/**/*.js")
        .pipe(gulp.dest(PUBLIC + "/js"));
});

//lib
gulp.task("lib", function() {
    return gulp.src(DEV + "/lib/**/*.js")
        .pipe(gulp.dest(PUBLIC + "/lib"));
});

//lib
gulp.task("images", function() {
    return gulp.src(DEV + "/images/**/*")
        .pipe(gulp.dest(PUBLIC + "/images"));
});

//browser sync
gulp.task("server", function() {
    browser({
        server: {
            baseDir: PUBLIC
        },
        port: 5000
    });
});

//watch
gulp.task("default",["ejs","style","js","lib","images","server"], function() {
    gulp.watch(DEV + "/ejs/**/*.ejs",["ejs"]);
    gulp.watch(DEV + "/sass/**/*.scss",["style"]);
    gulp.watch(DEV + "js/**/*.js",["js"]);
    gulp.watch(DEV + "lib/**/*.js",["lib"]);
    gulp.watch(DEV + "images/**/*",["images"]);
});