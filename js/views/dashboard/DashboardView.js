/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/dashboard/dashboardTemplate.html',
  'views/dashboard/DashboardItemView',
  'js/collections/contributors/CourseCollection.js'
], function($, _, Backbone, DashboardTemplate, DashboardItemView, CourseCollection){

  var DashboardView = Backbone.View.extend({
    el: $("#course_list"),
    modelView: DashboardItemView,
    collection: CourseCollection,

    render: function(){

      this.$el.html(DashboardTemplate);

      for (var i = 0; i < 30; i++){
        dashboardItemView = new DashboardItemView();
        dashboardItemView.render();
      }
      console.log(dashboardItemView);
    },
    initialize: function() {

    }
  });

  //DashboardView.render();
  return DashboardView;

});
