// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    'jquery': 'libs/jquery/jquery-1.11.1.min',
    'underscore': 'libs/underscore/underscore-min',
    'backbone': 'libs/backbone/backbone-min',
    'templates': '../templates',
    'jst': 'libs/require/jst'
  }

});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(
  App
){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  //App.initialize();

  // Preloader should go here - on complete init CorsicaApp
    
    $(document).ready(function() {
        // window.GoodToDoApp is defined so that any module
        // reference it easily.
        window.CorsicaApp = new App();
        window.CorsicaApp.init();
    });

});
