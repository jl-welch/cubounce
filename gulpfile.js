const gulp = require("gulp");
const sass = require("gulp-sass");

gulp.task("default", ["sass"]);

gulp.task("sass", function() {
  gulp.src("src/stylesheets/cubounce.scss")
      .pipe(sass())
      .pipe(gulp.dest("dist/stylehseets"));
});