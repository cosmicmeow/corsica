/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search/searchTemplate.html',
  'jst!templates/search/searchItemTemplate.html',
  'collections/courses/CourseCollection',
  'models/course/Course',
], function($, _, Backbone, SearchTemplate, SearchItemView, CourseCollection, Course){

  //Handlebars
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  var SearchView = Backbone.View.extend({
    el: $("#page"),
    //modelView: SearchItemView,
    collection: new CourseCollection(),
    events: {
      "click #search": "search",
      "click .waitlist": "waitlistDetail"
    },
    search: function () {
      var self = this;

      var term = this.$("#term").val();
      var dropdown = this.$("#dropdown").val();
      var body = this.$el.html(SearchTemplate);

      _.each(window.CorsicaApp.collections.courseCollection.where({"crn":term}), function(model) {

        var courseRow = self.$el.find("#course_list");
        var row;

        var course_data = {
          courseNum: model.get('courseNum'),
          description: model.get('description'),
          crn: model.get('crn'),
          i_user: model.get('i_user'),
          capacity: model.get('capacity'),
          id: model.cid,
          listing: model.get('listing')
        };

        // Create a new row
        row = SearchItemView({
          data: course_data,
          _: _
        });

        // Add this new row to the screen
        courseRow.append(row);
        $(document).ready(function(){
            $('.username').text(foo.firstName + " " + foo.lastName);
        });


      });
    },
    render: function () {
      this.$el.html(SearchTemplate);
      $(document).ready(function(){
           //Stanley was here
          $('.username').text(foo.firstName + " " + foo.lastName);
      });
    }
  });

  //DashboardView.render();
  return SearchView;

});

