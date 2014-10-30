define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/navbar/navbarTemplate.html'
], function($, _, Backbone, navbarTemplate){

  var NavbarView = Backbone.View.extend({
    el: $("#navbar"),

    render: function(){

      this.$el.html(navbarTemplate);
 
    }

  });

  return NavbarView;
  
});
