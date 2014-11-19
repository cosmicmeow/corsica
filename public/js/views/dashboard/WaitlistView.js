define([
  'jquery',
  'underscore',
  'backbone',
  'jst!templates/dashboard/waitlistTemplate.html'
], function($, _, Backbone, waitlistTemplate){

  var WaitlistView = Backbone.View.extend({
    el: $("#page"),

    render: function(cid){
      //console.log(cid);
      var row;

      //var body = this.$el.html(waitlistTemplate);


      var model = window.CorsicaApp.collections.courseCollection.get(cid);
      console.log(model);
      var course_data = {
        courseNum: model.get('courseNum'),
        description: model.get('description'),
        crn: model.get('crn'),
        i_user: model.get('i_user'),
        capacity: model.get('capacity'),
        id: model.cid
      };

      console.log(course_data);
      // Create a new row
      row = waitlistTemplate({
        data: course_data
      });

      // Add this new row to the screen
      this.$el.html(row);
      
      //this.$el.html(waitlistTemplate);
    }

  });

  return WaitlistView;
  
});
