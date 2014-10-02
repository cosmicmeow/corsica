/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search/searchTemplate.html',
  'models/course/Course'
], function($, _, Backbone, searchTemplate, Course){

  _.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
  };


  var searchView = Backbone.View.extend({
    //el: $("#course_list"),
    className: "course row",
    model: new Course(),
    template: _.template(
        '<div class="col-sm-5">' +
          '<span class="course_num">{{courseNum}} </span>' +
          '<span class="course_name">{{description}} </span>' +
        '</div>' +
        '<div class="col-sm-1"><span class="course_crn">{{crn}}</span></div>' +
        '<div class="col-sm-3"><span class="course_instructor">{{i_user}}</span></div>' +
        '<div class="col-sm-3"><span class="course_stat">{{capacity}}</span></div>'
    ),
    render: function(){

      console.log("dashboard -- search");
      this.$el.html(this.template(this.model));
      return this;
    }

  });

  return searchView;

});
