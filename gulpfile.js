'use strict';

var gulp = require("gulp");
var sass = require("gulp-sass");
var svgSprite = require("gulp-svg-sprite");

gulp.task("sass", function () {
    return gulp.src('./wwwroot/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest("./wwwroot/css"));
});

gulp.task("svgSprite", function () {
    return gulp.src("./wwwroot/img/icons/*.svg")
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest("./wwwroot/img"));
});

gulp.watch("./wwwroot/scss/**/*.{scss,sass}", gulp.series("sass"));
gulp.watch("./wwwroot/img/icons/*.svg", gulp.series("svgSprite"));

gulp.task("build", gulp.series("sass", "svgSprite"));