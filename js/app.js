// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'router', // Request router.js
  //'models/user',
  'views/navbar/NavbarView',
  'views/home/HomeView',
  'views/static/AboutView',
  'views/static/LoginView',
  'views/dashboard/DashboardView',
  //'views/search/SearchView',
  'views/footer/FooterView'
], function(
  $, 
  _, 
  Backbone, 
  Router,
  //UserModel,
  HomeView,
  NavbarView,
  AboutView,
  LoginView,
  DashboardView,
  //SearchView,
  FooterView
){

  /*
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };

  */

  var App = function() {
    this.views = {};
    //this.collections = {};
    //this.is_logged_in = false;
    //this.current_user = null;
  };

  App.prototype.init = function() {

    this.router = new Router();

    //this.currentUser = new UserModel();

    // VIEWS
    this.views.aboutView = new AboutView();
    this.views.homeView = new HomeView();
    this.views.loginView = new LoginView();
    this.views.navbarView = new NavbarView();
    this.views.footerView = new FooterView();
    this.views.dashboardView = new DashboardView();
    //this.views.searchView = new SearchView();

    Backbone.history.start({pushState: true, root: '/'});

    this.setupGlobalHandlers();

  };

  App.prototype.setupGlobalHandlers = function() {
        // This is a global click handler so that any relative paths
        // will be handled by the Backbone Router. Any absolute paths
        // (starting with 'http://' will work normally)
        var obj = this;

        $('body').on('click', 'a:not([href^="http://"])', function(e) {
            var $this = $(this);
            var href = $this.attr('href');
            var url = href.replace(/^\//,'').replace('#!\/','');

            if ($this.hasClass('disabled') || $this.hasClass('ignore-click') || url === Backbone.history.fragment) {
                e.preventDefault();
                return false;
            }

            if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
            }

            obj.router.navigate(url, {trigger: true});

            return false;
        });
    };

    return App;

});
