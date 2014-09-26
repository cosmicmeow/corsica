define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/static/aboutTemplate.html'
], function($, _, Backbone, aboutTemplate){

  var AboutView = Backbone.View.extend({
    el: $("#page"),

    render: function(){

      this.$el.html(aboutTemplate);
 
    }

  });

  return AboutView;
  
});
