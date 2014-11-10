define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/dashboard/waitlistTemplate.html'
], function($, _, Backbone, waitlistTemplate){

  var WaitlistView = Backbone.View.extend({
    el: $("#page"),

    render: function(classObj){

      this.$el.html(waitlistTemplate);
 
    }

  });

  return WaitlistView;
  
});
