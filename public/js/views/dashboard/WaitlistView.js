define([
  'jquery',
  'underscore',
  'backbone',
  'jst!templates/dashboard/waitlistTemplate.html'
], function($, _, Backbone, waitlistTemplate){

  var WaitlistView = Backbone.View.extend({
    el: $("#page"),

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
                time: model.get('days') + " " + model.get('times')
              };

              //console.log(course_data);
              // Create a new row
              row = waitlistTemplate({
                data: course_data
              });

              // Add this new row to the screen
              self.$el.html(row);
              
              //this.$el.html(waitlistTemplate);
            }
          });
        }
      });

    } // .render

  });

  return WaitlistView;
  
});
