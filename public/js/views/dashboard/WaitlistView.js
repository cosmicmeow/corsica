define([
  'jquery',
  'underscore',
  'backbone',
  'jst!templates/dashboard/waitlistTemplate.html'
], function($, _, Backbone, waitlistTemplate){

  var WaitlistView = Backbone.View.extend({

    el: $("#page"),

    events: {
      "click .glyphicon-chevron-up": "clickUp",
      "click .glyphicon-chevron-down": "clickDown"
    },

    render: function(crn){

      $(window).scrollTop(0);
      var self = this;

      console.log(crn);
      var row;

      //console.log(cid);

      window.CorsicaApp.collections.courseCollection.fetch({
        success: function(collection) {

          collection.each(function(model) {
            if (model.get("crn") === crn){
              var course_data = {
                courseNum: model.get('courseNum'),
                description: model.get('description'),
                crn: model.get('crn'),
                i_user: model.get('instructor'),
                capacity: model.get('capacity'),
                id: model.cid,
                listing: model.get('listing'),
                note: model.get('note'),
                time: model.get('days') + " " + model.get('times'),
                location: model.get('location')
              };

              //console.log(course_data);
              // Callback stuff
              function makeTemplate (cb){
                var row = waitlistTemplate({
                  data: course_data
                });

                cb(row);

              }

              function addToDom(row){
                // Add this new row to the screen
                self.$el.html(row);
              }
              
              makeTemplate(addToDom);
              //this.$el.html(waitlistTemplate);
            }
          });
        }
      });

    }, // .render

    clickUp: function(e){
      //console.log("clicked UP on: ", $(e.target).parent().parent());

      var row = $(e.target).parent().parent();
      var rows = ".course.row.col-sm-12";
      var index = $(".course.row.col-sm-12").index(row);
      var total = $(".course.row.col-sm-12").length;

      if (index > 0){
        $(rows + ":eq(" + index + ")").insertBefore($(rows + ":eq(" + (index - 1) + ")"));
      }

    },

    clickDown: function(e){
      //console.log("clicked DOWN on: ", $(e.target).parent().parent());

      var row = $(e.target).parent().parent();
      var rows = ".course.row.col-sm-12";
      var index = $(".course.row.col-sm-12").index(row);
      var total = $(".course.row.col-sm-12").length;

      if (index < total){
        $(rows + ":eq(" + index + ")").insertAfter($(rows + ":eq(" + (index + 1) + ")"));
      }

    }


  });

  return WaitlistView;
  
});
