/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'jst!templates/dashboard/dashboardTemplate.html',
  'jst!templates/dashboard/dashboardItemTemplate.html',
  'collections/courses/CourseCollection',
  'models/course/Course'
], function($, _, Backbone, DashboardTemplate, DashboardItemTemplate, CourseCollection, Course){

  //Handlebars
  /*
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  */

  var DashboardView = Backbone.View.extend({
    el: $("#page"),
    //modelView: DashboardItemView,
   // collection: new CourseCollection(),

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

    renderStudent: function(){

      var self = this;

      console.log("Render - Student Dashboard");

      var body = this.$el.html(DashboardTemplate);

      window.CorsicaApp.collections.courseCollection.fetch({
        success: function(collection) {

          if (__user.subscribed.length > 0){

            collection.each(function(model) {
              for (var i = 0; i < __user.subscribed.length; i++){

                if (model.get("crn") === __user.subscribed[i]){

                  var courseRow = self.$el.find("#course_list");
                  var row;
                  var position = 0;

                  for (var j = 0; j < model.get('subscribers').length; j++){
                    if (__user.email === model.get('subscribers')[j].email){
                      position = j + 1;
                    }
                  }

                  var course_data = {
                    courseNum: model.get('courseNum'),
                    description: model.get('description'),
                    crn: model.get('crn'),
                    i_user: model.get('instructor'),
                    capacity: model.get('capacity'),
                    id: model.cid,
                    listing: model.get('listing'),
                    subscribed_num : model.get('subscribers').length,
                    current_num : position
                  };

                  // Create a new row
                  row = DashboardItemTemplate({
                    data: course_data,
                    _: _
                  });

                  // Add this new row to the screen
                  courseRow.append(row);

                }
              }
             
            });

            $(".has_waitlist").addClass("show");
            $(".no_waitlist").addClass("hide");
            $(".student-visible").show();

          } else {
            console.log("No waitlist subscribed");
              $(".has_waitlist").addClass("hide");
              $(".no_waitlist").addClass("show");

          }

          $(window).scrollTop(0);
          $(document).ready(function(){
              $('.username').text(__user.firstName + " " + __user.lastName);
              $('.firstname').text(__user.firstName);
          });

        }

      });
    
    },

    render: function(){

      var self = this;

      console.log("Render - Faculty Dashboard");

      var body = this.$el.html(DashboardTemplate);

      window.CorsicaApp.collections.courseCollection.fetch({
        success: function(collection) {

          collection.each(function(model) {

            var courseRow = self.$el.find("#course_list");
            var row;

            var locked = model.get('locked');

            var course_data = {
              courseNum: model.get('courseNum'),
              description: model.get('description'),
              crn: model.get('crn'),
              i_user: model.get('instructor'),
              capacity: model.get('capacity'),
              id: model.cid,
              listing: model.get('listing'),
              subscribed_num : model.get('subscribers').length,
              locked: model.get('locked')
            };

            // Create a new row
            row = DashboardItemTemplate({
              data: course_data,
              _: _
            });

            // Add this new row to the screen
            courseRow.append(row);

          });

        $(window).scrollTop(0);


        $(document).ready(function(){
            $('.username').text(__user.firstName + " " + __user.lastName);
            $(".has_waitlist").addClass("show");
            $(".no_waitlist").addClass("hide");
        });

      }});
    
    },

    waitlistDetail: function(e){

      e.preventDefault();

      var id = $(e.currentTarget).data("id");
      var model = window.CorsicaApp.collections.courseCollection.get(id);
      var name = model.get("crn");

      window.CorsicaApp.router.navigate("/waitlist/" + name, {trigger: true});

      //window.CorsicaApp.views.waitlistView.render(this.model);
      //window.location.href = "/client#waitlist";
    }

  });

  //DashboardView.render();
  return DashboardView;

});
