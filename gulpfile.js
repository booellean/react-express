const gulp = require('gulp');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const responsive = require('gulp-responsive');
// const uglify = require('gulp-uglify');
// const gutil = require('gulp-util');

const proj = ts.createProject('tsconfig.json');

gulp.task('typescript', ()=>{
    return proj.src()
                .pipe(proj())
                .js.pipe(gulp.dest('./dist'));
});

gulp.task('sass', ()=>{
    return gulp.src('./src/assets/scss/index.scss')
                .pipe(sass.sync().on('error', sass.logError))
                .pipe(autoprefixer({
                cascade: false
                }))
                .pipe(csso())
                .pipe(rename('styles.min.css'))
                .pipe(gulp.dest('./dist/public/css'))
});

gulp.task('copy-brand', () =>{
    return gulp.src('./src/assets/brand/*.{ico,svg}')
        .pipe(gulp.dest('./dist/public/brand'))
});

gulp.task('images-brand', () =>{
    return gulp.src(['./src/assets/brand/*.{png,jpg,jpeg}'])
        .pipe(
            responsive({
            '*.*': [
                {
                    width: 512,
                    rename: {
                        suffix: `512`
                    }
                },
                {
                    width: 192,
                    rename: {
                        suffix: `192`
                    }
                }
            ],
            })
        )
        .pipe(gulp.dest('./dist/public/brand'))
});

gulp.task('images-site', () =>{
    return gulp.src('./src/assets/images/*.{png,jpg,jpeg}')
        .pipe(
            responsive({
            '*.*': [
                {
                    width: 300,
                    rename: {
                        suffix: `-small`
                    }
                },
                {
                    width: 650,
                    rename: {
                        suffix: `medium`
                    }
                },
                {
                    width: 800,
                    rename: {
                        suffix: `-large`
                    }
                },
                {
                    width: 1200,
                }
            ],
            })
        )
        .pipe(gulp.dest('./dist/public/brand'))
});

gulp.task('copy', () =>{
    return gulp.src([
                    './src/assets/**/*.pug',
                    './src/assets/**/*.txt',
                    './src/assets/**/*.ttf',
                    './src/assets/manifest.json'
                ])
                .pipe(gulp.dest('./dist/public'))
});

gulp.task('build', gulp.series('typescript', 'sass', 'copy', 'copy-brand', 'images-brand', 'images-site'));
 
gulp.task('watch', ()=>{
    gulp.watch('./src/**/*.ts', gulp.series('typescript'));
    gulp.watch('./src/assets/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/assets/**/*.pug', gulp.series('copy'));
    gulp.watch('./src/assets/**/*.json', gulp.series('copy'));
});