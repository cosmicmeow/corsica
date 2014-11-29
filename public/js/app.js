// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
  'collections/courses/CourseCollection',
  //'models/user',
  'views/home/HomeView',
  'views/static/AboutView',
  'views/static/LoginView',
  'views/dashboard/DashboardView',
  'views/dashboard/WaitlistView',
  'views/search/SearchView',
  'views/footer/FooterView',
  'views/navbar/NavbarView'
], function(
  $,
  _,
  Backbone,
  Router,
  CourseCollection,
  //UserModel,
  HomeView,
  AboutView,
  LoginView,
  DashboardView,
  WaitlistView,
  SearchView,
  FooterView,
  NavbarView
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
    this.collections = {};
    //this.is_logged_in = false;
    //this.current_user = null;
  };

  App.prototype.init = function() {
    var self = this;
    $(function(){
      self.router = new Router();

      // Collections (Data sources)
      self.collections.courseCollection = new CourseCollection();

      //this.currentUser = new UserModel();

      // VIEWS
      self.views.aboutView = new AboutView();
      self.views.homeView = new HomeView();
      self.views.loginView = new LoginView();
      self.views.dashboardView = new DashboardView();
      self.views.waitlistView = new WaitlistView();
      self.views.searchView = new SearchView();
      self.views.navbarView = new NavbarView();
      self.views.footerView = new FooterView();

      Backbone.history.start({pushState: false, root: "/"});

      self.setupGlobalHandlers();
    })

    

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

    /** DO APP STUFF HERE **/








    return App;
});
