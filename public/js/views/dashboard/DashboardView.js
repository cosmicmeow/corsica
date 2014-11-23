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

    render: function(){

      var self = this;

      console.log("Render - Dashboard")

      var body = this.$el.html(DashboardTemplate);

      //window.CorsicaApp.collections.courseCollection = new CourseCollection();

      window.CorsicaApp.collections.courseCollection.fetch({
        success: function(collection) {

          collection.each(function(model) {

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
            row = DashboardItemTemplate({
              data: course_data,
              _: _
            });

            // Add this new row to the screen
            courseRow.append(row);

            //console.log(model);
            //body.find("#course_list").append(item.render().el);
          });

          //console.log(collection);
/*
          _.each(collection, function(collection) {

            console.log(collection)
            
            var item = new DashboardItemView({model:data});
            body.find("#course_list").append(item.render().el);
          });
        */

        $(window).scrollTop(0);


        $(document).ready(function(){
          /*
          $.each($(".course_name"), function(){
            var text = $(this).text();
            if (text.length > 30){
              $(this).text(text.substring(0, 30) + "..."); 
            }
          });*/
            $('.username').text(foo.firstName + " " + foo.lastName);
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
