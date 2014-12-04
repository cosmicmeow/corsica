define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/static/faqTemplate.html'
], function($, _, Backbone, faqTemplate){

  var FaqView = Backbone.View.extend({
    el: $("#page"),

    render: function(){
      $(window).scrollTop(0);
      this.$el.html(faqTemplate);
 
    }

  });

  return FaqView;
  
});
