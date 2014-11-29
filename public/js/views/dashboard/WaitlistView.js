define([
  'jquery',
  'underscore',
  'backbone',
  'jst!templates/dashboard/waitlistTemplate.html',
  'jst!templates/dashboard/waitlistStudentTemplate.html'
], function($, _, Backbone, waitlistTemplate, waitlistStudentTemplate){

  var WaitlistView = Backbone.View.extend({

    el: $("#page"),

    events: {
      "click .glyphicon-chevron-up": "clickUp",
      "click .glyphicon-chevron-down": "clickDown",
      "click #subscribe_btn" : "clickQueue",
      "click #unsubscribe_btn" : "clickUnQueue"
    },

    initialize: function(){
      this.crn = "";
    },

    render: function(crn){

      $(window).scrollTop(0);
      var self = this;
      this.crn = crn;

      console.log(crn);
      var row;

      //console.log(cid);

      window.CorsicaApp.collections.courseCollection.fetch({
        success: function(collection) {

          collection.each(function(model) {
            if (model.get("crn") === crn){
              console.log(model); 
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
                location: model.get('location'),
                subscribed_num: model.get('subscribers').length,
                subscribers: model.get('subscribers')
              };
/*
              for (var i = 0; i < model.get('subscribers').length; i++){
                var student_data = {
                  subscriber_firstname: model.get('subscribers')[i].firstName,
                  subscriber_lastname: model.get('subscribers')[i].lastName
                  subscriber_email: model.get('subscribers')[i].email,
                  subscriber_firstname: model.get('subscribers')[i].phoneNumber,
                };

                var row = waitlistStudentTemplate({
                  data: student_data
                });
              }
*/
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

          if (__user.access === "student"){

            $(".students").hide();
            var found = false;
            for (var i = 0; i < __user.subscribed.length; i++){
              if (__user.subscribed[i] === self.crn){
                found = true;
                $("#unsubscribe_btn").show();
              }
            }

            if (found === false){
              $("#subscribe_btn").show();
            }

          } else{

            $(".students").show();
            $(".control").show();
          }

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

    },

    clickQueue: function(){
      $.ajax({
        type: 'POST',
        url: '/api/waitlists/subscribe',
        data: { user: __user, crn: this.crn }
      }).done(function() {
        location.reload();
      });
    }, 

    clickUnQueue: function(){
      $.ajax({
        type: 'POST',
        url: '/api/waitlists/unsubscribe',
        data: { user: __user, crn: this.crn }
      }).done(function() {
        location.reload();
      });
    }

  });

  return WaitlistView;
  
});
