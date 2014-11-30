define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/static/aboutTemplate.html'
], function($, _, Backbone, aboutTemplate){

  var AboutView = Backbone.View.extend({
    el: $("#page"),

    render: function(){
      $(window).scrollTop(0);
      this.$el.html(aboutTemplate);
 
    }

  });

  return AboutView;
  
});
