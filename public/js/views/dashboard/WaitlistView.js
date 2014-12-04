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
      "click .glyphicon-chevron-down": "clickDown",
      "click #subscribers_save": "clickSave",
      "click #subscribe_btn" : "clickQueue",
      "click #unsubscribe_btn" : "clickUnQueue",
      "click .glyphicon-remove.advisor-visible" : "clickRemove",
      "click .glyphicon-remove.scheduler-visible" : "clickLock",
      "click .glyphicon-plus.scheduler-visible" : "clickUnLock"
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
      var studentsOnList = 0;
      var position = 0;
      var locked = false;

      //console.log(cid);

      window.CorsicaApp.collections.courseCollection.fetch({
        success: function(collection) {

          collection.each(function(model) {
            if (model.get("crn") === crn){
              console.log(model); 

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
                id: model.get('_id'),
                listing: model.get('listing'),
                note: model.get('note'),
                time: model.get('days') + " " + model.get('times'),
                location: model.get('location'),
                subscribed_num: model.get('subscribers').length,
                subscribers: model.get('subscribers'),
                current_num: position
              };

              locked = model.get("locked");

              studentsOnList = model.get("subscribers").length;

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
                $(".student-visible").show();
              }
            }

            if (found === false){
              $("#subscribe_btn").show();
            }

          } else{

            if (locked === true){
              $(".locked").show(); // shows the message that the course is hidden
            }

            $(".student-visible").hide();

            if (studentsOnList === 0){
              $(".empty").show();
            } else{
              $(".students").show();
            }

            if (__user.access === "advisor"){         // if user = advisor
              $(".advisor-visible").show();

            } else if (__user.access === "scheduler"){ // if user = scheduler
              if (locked === true){
                $(".glyphicon-plus.scheduler-visible").show();
              } else{
                $(".glyphicon-remove.scheduler-visible").show();
              }

            } else{                                    // if user = admin
              $(".advisor-visible").show();

              if (locked === true){
                $(".glyphicon-plus.scheduler-visible").show();
              } else{
                $(".glyphicon-remove.scheduler-visible").show();
              }
            }
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

    clickSave: function(){
      console.log("Saving the list for: ", this.crn);
      var studentsArray = [];

      $(".student_waitlist").each(function(){
        var studentEmail = $(this).attr("student-id");
        studentsArray.push(studentEmail);
      });

      console.log(studentsArray);

      $.ajax({
        type: 'POST',
        url: '/api/waitlists/reorder',
        data: { subscribers: studentsArray, crn: this.crn }
      }).done(function() {
        location.reload();
      });

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
    },

    clickRemove: function(e){
      console.log("Remove student", $(e.target).parent().parent().attr("student-id"));
      var student_email = $(e.target).parent().parent().attr("student-id");
      $.ajax({
        type: 'POST',
        url: '/api/waitlists/adminUnsubscribe',
        data: { email: student_email, crn: this.crn }
      }).done(function() {
        location.reload();
      });

    },

    clickLock: function(e){
      console.log("Hide waitlist from student", $(e.target).attr("data-id"));
      var course_id = $(e.target).attr("data-id");
      
      $.ajax({
        type: 'PUT',
        url: '/api/waitlists/' + course_id,
        data: { 'locked' : true }
      }).done(function() {
        //location.reload();
      });
      
    },

    clickUnLock: function(e){
      console.log("Show waitlist from student", $(e.target).attr("data-id"));
      var course_id = $(e.target).attr("data-id");
      
      $.ajax({
        type: 'PUT',
        url: '/api/waitlists/' + course_id,
        data: { 'locked' : false }
      }).done(function() {
        location.reload();
      });
      
    }

  });

  return WaitlistView;
  
});
