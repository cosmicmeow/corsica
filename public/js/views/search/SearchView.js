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

      window.CorsicaApp.collections.courseCollection.each(function(model) {
        var pattern = new RegExp( $.trim( term ).replace( / /gi, '|' ), "i");
        _(model.attributes).any(function(attr, term) {
            if(!pattern.test(attr))
                return false;

            var courseRow = self.$el.find("#course_list");
            var row;

            var course_data = {
              courseNum: model.get('courseNum'),
              description: model.get('description'),
              crn: model.get('crn'),
              i_user: model.get('instructor'),
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
                $('.username').text(__user.firstName + " " + __user.lastName);
            });

            return true;
        });
      });

    },
    render: function () {
      this.$el.html(SearchTemplate);
      $(document).ready(function(){
          $('.username').text(__user.firstName + " " + __user.lastName);
      });
    }
  });

  //DashboardView.render();
  return SearchView;

});

