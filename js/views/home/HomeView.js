define([
  'jquery',
  'underscore',
  'backbone',
  'views/navbar/NavbarView',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, NavbarView, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    render: function(){

      var navbarView = new NavbarView();
      navbarView.render();
      
      $('.menu li').removeClass('active');
      $('.menu li a[href="#"]').parent().addClass('active');
      this.$el.html(homeTemplate);

 
    }

  });

  return HomeView;
  
});
