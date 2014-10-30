/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search/searchTemplate.html',
  'views/dashboard/DashboardItemView',
  'collections/courses/CourseCollection',
  'models/course/Course'
], function($, _, Backbone, SearchTemplate, SearchItemView, CourseCollection, Course){

  //Handlebars
  _.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
  };
  var DashboardView = Backbone.View.extend({
    el: $("#page"),
    initialize: function() {
      var self = this;

      var Courses = new CourseCollection();
      Courses.fetch({
        success: function(err,data) {

        _.each(data, function(data) {
          var aCourse = new Course();
          aCourse.set(data);
          Courses.add(aCourse);
          // var item = new SearchItemView({model:data});
          // body.find("#course_list").append(item.render().el);
        });
        this.Courses = Courses;
      }});
    },
    modelView: SearchItemView,
    collection: new CourseCollection(),
    events: {
      "click #search": "search"
    },
    search: function () {
      var term = this.$("#term").val();
      var dropdown = this.$("#dropdown").val();
      var body = this.$el.html(SearchTemplate);
      console.log(self.Courses.where({"avaliableSeats":"0"}));
      // console.log("searching!");
      _.each(self.Courses.where({"crn":term}), function(data) {
         var item = new SearchItemView({model:data.attributes});
         body.find("#course_list").append(item.render().el);
      });
    },
    render: function () {
      return this.$el.html(SearchTemplate);
    }
  });

  //DashboardView.render();
  return DashboardView;

});
