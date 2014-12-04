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

      "click .waitlist": "waitlistDetail",
      "click #toggle_test1" : "testOne",
      "click #toggle_test2" : "testTwo",
      "click #toggle_test3" : "testThree",
      "click #toggle_test4" : "testFour",
      "click #toggle_testReset" : "testReset"
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

                if (model.get("crn") === __user.subscribed[i] && model.get("locked") !== true){

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

            $(".test_panel").hide();

          } else {
            console.log("No waitlist subscribed");
              $(".has_waitlist").addClass("hide");
              $(".no_waitlist").addClass("show");

          }

          $(window).scrollTop(0);
          $(document).ready(function(){
              $('.username').text(__user.firstName + " " + __user.lastName);
              $('.firstname').text(__user.firstName);

              var cookies = (document.cookie).split(" ");

              _.each(cookies, function(cookie) {

                if (cookie === "beforeDate=true;"){
                  $(".before_date").addClass("show");
                }

                if (cookie === "afterDate=true;"){
                  $(".after_date").addClass("show");
                }
              });
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

            var cookies = (document.cookie).split(" ");

            _.each(cookies, function(cookie) {

              if (cookie === "beforeDate=true;"){
                $(".before_date").addClass("show");
              }

              if (cookie === "afterDate=true;"){
                $(".after_date").addClass("show");
              }
            });


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
    },

    // Lock all classes - display 'registration period hasn't started'
    testOne: function(){

      var now = new Date();
      var time = now.getTime();
      time += 3600 * 1000;
      now.setTime(time);

      $.ajax({
        type: 'POST',
        url: '/api/waitlists/lock'
      }).done(function() {
        document.cookie = 'beforeDate=true; expires=' + now.toUTCString() + '; path=/';
        document.cookie = 'afterDate=false; expires=' + now.toUTCString() + '; path=/';
        location.reload();
      });

    },

    // Lock all classes - display 'registration period ended', send notification to students
    testTwo: function(){

      var now = new Date();
      var time = now.getTime();
      time += 3600 * 1000;
      now.setTime(time);

      $.ajax({
        type: 'POST',
        url: '/api/waitlists/lock'
      }).done(function() {
        document.cookie = 'beforeDate=false ;expires=' + now.toUTCString() + '; path=/';
        document.cookie = 'afterDate=true; expires=' + now.toUTCString() + '; path=/';
        location.reload();
      });

    },

    // Unlock all classes
    testThree: function(){

      var now = new Date();
      var time = now.getTime();
      time += 3600 * 1000;
      now.setTime(time);

      $.ajax({
        type: 'POST',
        url: '/api/waitlists/unlock'
      }).done(function() {
        document.cookie = 'beforeDate=false; expires=' + now.toUTCString() + '; path=/';
        document.cookie = 'afterDate=false; expires=' + now.toUTCString() + '; path=/';
        location.reload();
      });

    },

    // Change a class stats, send notification to students on the list
    // 13418 -> shut to open
    // 17388 -> open to shut
    testFour: function(){

      //lookmai local test 547524b723f1a10000ddc66f, 547524b723f1a10000ddc6a1
      // cloud 547b78260fcdbe020011da93, 547b78260fcdbe020011dac5
      $.ajax({
        type: 'PUT',
        url: '/api/waitlists/547b78260fcdbe020011da93',
        data: {'status': 'open', 'availableSeats' : '1', 'capacity': 'cap:70; enroll:69;avail:1'}
      }).done(function() {
        alert("Class 13418 is updated");
      });

      $.ajax({
        type: 'POST',
        url: '/api/waitlists/testhorseness'
      }).done(function() {
        alert("Check your email!");
      });

      $.ajax({
        type: 'PUT',
        url: '/api/waitlists/547b78260fcdbe020011dac5',
        data: {'status': 'shut', 'availableSeats' : '0', 'capacity': 'cap:50; enroll:51;avail:0'}
      }).done(function() {
        alert("Class 17388 is updated");
      });

      location.reload();

    },

    testReset: function(){

      $.ajax({
        type: 'PUT',
        url: '/api/waitlists/547b78260fcdbe020011da93',
        data: {'status': 'shut', 'availableSeats' : '0', 'capacity': 'cap:70; enroll:70;avail:0'}
      }).done(function() {
        alert("Class 13418 is reset");
      });

      $.ajax({
        type: 'PUT',
        url: '/api/waitlists/547b78260fcdbe020011dac5',
        data: {'status': 'open', 'availableSeats' : '1', 'capacity': 'cap:50; enroll:50;avail:1'}
      }).done(function() {
        alert("Class 17388 is reset");
      });

      location.reload();

    }

  });

  //DashboardView.render();
  return DashboardView;

});
