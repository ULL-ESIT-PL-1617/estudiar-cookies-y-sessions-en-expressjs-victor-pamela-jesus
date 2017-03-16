var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('default', function() {

});

gulp.task('ejemploCookies', function() {
  var exec = require('child_process').exec;
    var child;
    child = exec("node EjemploCookies.js", 
                function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
});

gulp.task('ejemploAuth', function() {
  var exec = require('child_process').exec;
    var child;
    child = exec("node ejemploAuth.js", 
                function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
});

gulp.task('ejemploRutas', function() {
  var exec = require('child_process').exec;
    var child;
    child = exec("node ejemploRutas.js", 
                function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
});

gulp.task('ejemploAPI', function() {
  var exec = require('child_process').exec;
    var child;
    child = exec("node ejemploAPI.js", 
                function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
});

gulp.task('ejemploExpress', function() {
  var exec = require('child_process').exec;
    var child;
    child = exec("node ejemploExpress.js", 
                function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
});


