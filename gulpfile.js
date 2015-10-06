/**
 * Created by matthew.sanders on 9/10/15.
 */
var del        = require('del');
var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var uglify     = require('gulp-uglify');
var notify     = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('clean', function(){
   del(['client/bower_components'], function(){
    gulp.notify({message:'--** cleanup complete.'});
  });

});

gulp.task('copyBowerComponents', function(){
  return gulp.src('bower_components/**/*')
          .pipe(gulp.dest('client/bower_components'))
          .pipe(notify({message:'** copyBowerComponents **.'}));

});



gulp.task('default', function(){
  gulp.start('copyBowerComponents');
    //.pipe(notify({message:'default task complete.'}));
});


//// Watch
//gulp.task('watch', function() {
//
//  // Watch .scss files
//  gulp.watch('src/styles/**/*.scss', ['styles']);
//
//  // Watch .js files
//  gulp.watch('src/scripts/**/*.js', ['scripts']);
//
//  // Watch image files
//  gulp.watch('src/images/**/*', ['images']);
//
//  // Create LiveReload server
//  livereload.listen();
//
//  // Watch any files in dist/, reload on change
//  gulp.watch(['dist/**']).on('change', livereload.changed);
//
//});

