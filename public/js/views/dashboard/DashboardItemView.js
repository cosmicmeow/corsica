/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/dashboard/dashboardItemTemplate.html',
  'models/course/Course'
], function($, _, Backbone, dashboardItemTemplate, Course){

  _.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
  };


  var DashboardItemView = Backbone.View.extend({
    //el: $("#course_list"),
    className: "course row",
    model: new Course(),

    events: {
      // This delegates event handlers.
      // format:
      // "event selector": "function"

      "click .waitlist": "waitlistDetail"
    },
    
    initialize: function() {
      _.bindAll(this,
        'render',
        'waitlistDetail'
      );
    },

    render: function(){

      console.log("dashboard -- item");
      var self = this;
      this.$el.html(this.template(this.model));

      return this;
    },

    waitlistDetail: function(){
      console.log("omg clicked", this.model);
      window.CorsicaApp.router.navigate("/waitlist/" + this.model.crn, {trigger: true});

      //window.CorsicaApp.views.waitlistView.render(this.model);
      //window.location.href = "/client#waitlist";
    }

  });

  return DashboardItemView;

});
