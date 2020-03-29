'use strict';

var gulp = require("gulp");
var sass = require("gulp-sass");
var svgSprite = require("gulp-svg-sprite");
var cheerio = require("gulp-cheerio");
var svgmin = require('gulp-svgmin');
var cleanSvg = require('gulp-cheerio-clean-svg');
var svgo = require('gulp-svgo');

gulp.task("sass", function () {
    return gulp.src('./wwwroot/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest("./wwwroot/css"));
});

gulp.task("svgSprite", function () {
    return gulp.src("./wwwroot/img/icons/*.svg")
        .pipe(svgmin())
        .pipe(cheerio(cleanSvg()))
        .pipe(replace("&gt;", ">"))
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