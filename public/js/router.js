// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone'
], function(
  $,
  _,
  Backbone
) {

  var Router = Backbone.Router.extend({

    routes: {
      ''          : 'index',
      'about'     : 'about',
      'login'     : 'login',
      'dashboard' : 'dashboard',
      'search'    : 'search',
      'waitlist/:id'  : 'waitlist',
      '*path'     : 'default'
    },

    initialize: function(){
      console.log("ROUTER -- initialize");
    },

    index: function(){
      console.log("ROUTER -- index");

      window.CorsicaApp.views.navbarView.render();
      
      if (__user.access === "student"){

        window.CorsicaApp.views.dashboardView.renderStudent();

      } else{

        window.CorsicaApp.views.dashboardView.render();

      }
      
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

      if (__user.access === "student"){

        window.CorsicaApp.views.dashboardView.renderStudent();

      } else{

        window.CorsicaApp.views.dashboardView.render();

      }

      window.CorsicaApp.views.footerView.render();
    },

    waitlist: function(id){
      console.log("ROUTER -- waitlist");

      window.CorsicaApp.views.navbarView.render();
      window.CorsicaApp.views.waitlistView.render(id);
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
      window.CorsicaApp.views.dashboardView.render();
      window.CorsicaApp.views.footerView.render();
    }
  });

  return Router;

});
