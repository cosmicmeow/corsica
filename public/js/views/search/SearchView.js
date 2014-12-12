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
      "click .waitlist": "waitlistDetail",
      "keyup #term" : "keyPressEventHandler"
    },
    search: function () {

      console.log("Hit search for: ", this.$("#term").val());

      $(window).scrollTop(350);

      this.$("#course_list").empty();
      this.$(".search_notfound").hide();

      var self = this;

      var term = this.$("#term").val();

      var found = 0;

      window.CorsicaApp.collections.courseCollection.each(function(model) {
        var pattern = new RegExp( $.trim( term ).replace( / /gi, '|' ), "i");

        _(model.attributes).any(function(attr, term) {
            if(!pattern.test(attr)){
                return false;
            }

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
              subscribers_num : model.get('subscribers').length,
              type: model.get('type')
            };

            if (locked){
              if (__user.access !== 'student'){
                // Create a new row
                row = SearchItemView({
                  data: course_data,
                  _: _
                });

                // Add this new row to the screen
                courseRow.append(row);

                found++;
              }
            } else{
                // Create a new row
                row = SearchItemView({
                  data: course_data,
                  _: _
                });

                // Add this new row to the screen
                courseRow.append(row);
                found++;
            }

           

            //return true;
        });
      });

      console.log("found entry?", found);

      if (found === 0){
        self.$(".search_notfound").show();
      }

    },

    render: function () {
      $(window).scrollTop(0);
      this.$el.html(SearchTemplate);

      $('.username').text(__user.firstName + " " + __user.lastName);
      $('.firstname').text(__user.firstName);
    },

    keyPressEventHandler : function(event){
      if(event.keyCode == 13){
          this.$("#search").click();
      }
  }
  });

  //DashboardView.render();
  return SearchView;

});

