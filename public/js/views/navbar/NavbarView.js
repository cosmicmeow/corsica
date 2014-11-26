define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/navbar/navbarTemplate.html'
], function($, _, Backbone, navbarTemplate){

  var NavbarView = Backbone.View.extend({
    el: $("#navbar"),

    events: {
      "click #logout": "logoutClick",
      "click #create_user": "createClick"
    },

    render: function(){

      this.$el.html(navbarTemplate);
 
    },

    logoutClick: function(){
      if (window.location.href.indexOf("http://red411.herokuapp.com") > -1){
        window.location.href = "http://red411.herokuapp.com/logout";
      } else {
        window.location.href = "http://localhost:3000/logout";
      }
    },

    createClick: function(){
      if (window.location.href.indexOf("http://red411.herokuapp.com") > -1){
        window.location.href = "http://red411.herokuapp.com/newaccount";
      } else {
        window.location.href = "http://localhost:3000/newaccount";
      }
    }

  });

  return NavbarView;
  
});
