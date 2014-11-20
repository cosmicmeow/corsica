define([
  'jquery',
  'underscore',
  'backbone',
  'jst!templates/dashboard/waitlistTemplate.html'
], function($, _, Backbone, waitlistTemplate){

  var WaitlistView = Backbone.View.extend({
    el: $("#page"),

    render: function(crn){

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
                i_user: model.get('i_user'),
                capacity: model.get('capacity'),
                id: model.cid
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
