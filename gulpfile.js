var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var imagemin = require('gulp-imagemin');
var events = require('events');
events.EventEmitter.defaultMaxListeners = 100;  // Set Max Listeners for image compression, if not error.

var minify = require('gulp-minify');
 
gulp.task('compress', function() { // Javascript Minify
  gulp.src('assets/js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js', // For development
            min:'.js'        // For production
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('public/js'))
});

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() { // Sass Compilers and Compress
  return gulp.src('assets/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // If css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('fonts', function() { // Font copy from development to production
  return gulp.src('assets/fonts/**/*')
  .pipe(gulp.dest('fonts'))
})

gulp.task('images', function(){ // Image compresion
  return gulp.src('assets/img/**/*.+(png|jpg|gif|svg)') 
  .pipe(imagemin())
  .pipe(gulp.dest('img'))
});


gulp.task('default', ['sass' , 'fonts', 'images', 'compress'] ,function() {
  gulp.watch(['assets/scss/**/*.scss'], ['sass']); // Sass Watch 
  // gulp.watch(['assets/js/**/*.js'], ['compress']); // JS Watch
  // gulp.watch(['assets/img/**/*.+(png|jpg|gif|svg)']); // Image Minify
});

