const gulp    = require("gulp");
const sass    = require("gulp-sass");
const prefix  = require("gulp-autoprefixer");
const clean   = require("gulp-clean-css");
const babel   = require("gulp-babel");
const uglify  = require("gulp-uglify");
const rename  = require("gulp-rename");

gulp.task("default", ["sass", "js"]);

gulp.task("sass", function() {
  gulp.src("src/stylesheets/cubounce.scss")
      .pipe(sass())
      .pipe(prefix({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(clean())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest("dist/stylehseets"));
});

gulp.task("js", function() {
  gulp.src("src/javascripts/cubounce.js")
      .pipe(babel({presets: ['@babel/env']}))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest("dist/javascripts"));
});