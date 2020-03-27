'use strict';

var gulp = require("gulp");
var sass = require("gulp-sass");


gulp.task("sass", function () {
    return gulp.src('./wwwroot/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest("./wwwroot/css"));
});

gulp.watch("./wwwroot/scss/**/*.{scss,sass}", gulp.series("sass"));