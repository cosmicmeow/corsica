// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  //'views/home/HomeView',
  //'views/static/AboutView',
  //'views/static/LoginView',
  //'views/footer/FooterView'
], function(
  $,
  _,
  Backbone
  //HomeView,
  //AboutView,
  //LoginView,
  //FooterView
) {
  /*
  var AppRouter = Backbone.Router.extend({

    routes: {
      // Define some URL routes
      '': 'index',
      'about': 'showAbout',
      'login': 'showLogin',
      '*path': 'default'

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){

    var app_router = new AppRouter;

    app_router.on('route:showAbout', function(){

        // Call render on the module we loaded in via the dependency array
        var aboutView = new AboutView();
        aboutView.render();

    });

    app_router.on('route:showLogin', function () {

        // Like above, call render but know that this view has nested sub views which
        // handle loading and displaying data from the GitHub API
        var loginView = new LoginView();
        loginView.render();
    });

    app_router.on('route:defaultAction', function (actions) {

       // We have no matching route, lets display the home page
        var homeView = new HomeView();
        homeView.render();
    });

    // Unlike the above, we don't call render on this view as it will handle
    // the render call internally after it loads data. Further more we load it
    // outside of an on-route function to have it loaded no matter which page is
    // loaded initially.
    var footerView = new FooterView();

    Backbone.history.start({pushState: true});
  };
  return {
    initialize: initialize
  };
  */

  var Router = Backbone.Router.extend({

    routes: {
      ''          : 'index',
      'about'     : 'about',
      'login'     : 'login',
      'dashboard' : 'dashboard',
      'search'    : 'search',
      '*path'     : 'default'
    },

    initialize: function(){
      console.log("ROUTER -- initialize");
    },

    index: function(){
      console.log("ROUTER -- index");

      window.CorsicaApp.views.navbarView.render();
      window.CorsicaApp.views.homeView.render();
      window.CorsicaApp.views.footerView.render();
    },

    about: function(){
      console.log("ROUTER -- about");

      window.CorsicaApp.views.navbarView.render();
      window.CorsicaApp.views.aboutView.render();
      window.CorsicaApp.views.footerView.render();

    },

    login: function(){
      console.log("ROUTER -- login");

      window.CorsicaApp.views.navbarView.render();
      window.CorsicaApp.views.loginView.render();
      window.CorsicaApp.views.footerView.render();
    },

    dashboard: function(){
      console.log("ROUTER -- dashboard");

      window.CorsicaApp.views.navbarView.render();
      window.CorsicaApp.views.dashboardView.render();
      window.CorsicaApp.views.footerView.render();
    },
    search: function(){
      console.log("ROUTER -- search");

      window.CorsicaApp.views.navbarView.render();
      window.CorsicaApp.views.searchView.render();
      window.CorsicaApp.views.footerView.render();
    },

    default: function(path){
      console.log("ROUTER -- default", path);

      window.CorsicaApp.views.navbarView.render();
      window.CorsicaApp.views.homeView.render();
      window.CorsicaApp.views.footerView.render();
    }
  });

  return Router;

});
