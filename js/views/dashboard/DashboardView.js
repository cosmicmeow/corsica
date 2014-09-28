/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/dashboard/dashboardTemplate.html',
  'views/dashboard/DashboardItemView',
  'collections/courses/CourseCollection',
  'models/course/Course'
], function($, _, Backbone, DashboardTemplate, DashboardItemView, CourseCollection, Course){

  var DashboardView = Backbone.View.extend({
    el: $("#page"),
    modelView: DashboardItemView,
    collection: CourseCollection,

    render: function(){

      this.$el.html(DashboardTemplate);

      // for (var i = 0; i < 30; i++){
      //   dashboardItemView = new DashboardItemView();
      //   dashboardItemView.render();
      // }
      //console.log(dashboardItemView);
    },
    initialize: function() {
      //CourseCollection.fetch();

      var Courses = new CourseCollection();
      Courses.fetch({
        success: function(err,data) {

        _.each(data, function(data) {
          var aCourse = new Course();
          aCourse.set(data);
          Courses.add(aCourse);
        });
      }});
      console.log(Courses);

    }
  });

  //DashboardView.render();
  return DashboardView;

});
