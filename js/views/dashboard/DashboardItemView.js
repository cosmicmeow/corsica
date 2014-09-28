define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/dashboard/dashboardItemTemplate.html'
], function($, _, Backbone, dashboardItemTemplate){

  _.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
  };

  var DashboardItemView = Backbone.View.extend({
    el: $("#course_list"),
    template: _.template(
      '<div class="course row">' +
        '<div class="col-sm-5">' +
          '<span class="course_num">{{courseNum}}</span>' +
          '<span class="course_name">{{desciption}}</span>' +
        '</div>' +
        '<div class="col-sm-1"><span class="course_crn">{{crn}}</span></div>' +
        '<div class="col-sm-3"><span class="course_instructor">{{i_user}}</span></div>' +
        '<div class="col-sm-3"><span class="course_stat">{{capacity}}</span></div>' +
      '</div>'
    ),
    render: function(){

      console.log("dashboard -- item");
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return DashboardItemView;

});
