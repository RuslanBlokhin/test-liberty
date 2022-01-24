const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const include = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const webp = require("gulp-webp");
const newer = require("gulp-newer");
const del = require("del");
const sync = require("browser-sync").create();

function html() {
  return src("src/**.html")
    .pipe(
      include({
        prefix: "@@",
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist"));
}

function scss() {
  return src("src/sass/**.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 versions"],
        browsers: [
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 11",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6",
        ],
      })
    )
    .pipe(csso())
    .pipe(concat("styles.css"))
    .pipe(dest("dist"));
}

function js() {
  return src("src/**.js")
    .pipe(uglify())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("index.js"))
    .pipe(dest("dist"));
}

function img() {
  return (
    src("src/images/**.png")
      .pipe(newer("dist/images"))
      .pipe(webp())
      .pipe(src("src/images/pictures/**.png"))
      .pipe(newer("dist/images"))
      // .pipe(
      //   imagemin({
      //     progressive: true,
      //     svgoPlugins: [{ removeViewBox: false }],
      //     interlaced: true,
      //     optimizationLevel: 3,
      //   })
      // )
      // .pipe(dest("dist/images"))
      .pipe(src("src/images/icons/**.svg"))
      .pipe(dest("dist/images"))
  );
}

function clear() {
  return del("dist");
}

function serve() {
  sync.init({
    server: "./dist",
  });

  watch("src/**/*.html", series(html)).on("change", sync.reload);
  watch("src/sass/**/*.scss", series(scss)).on("change", sync.reload);
  watch("src/**/*.js", series(js)).on("change", sync.reload);
  watch("src/images/pictures/**/*.png", series(img)).on("change", sync.reload);
  watch("src/images/icons/**/*.svg", series(img)).on("change", sync.reload);
}

exports.build = series(clear, scss, html, js, img);
exports.serve = series(clear, scss, html, js, img, serve);
exports.clear = clear;
