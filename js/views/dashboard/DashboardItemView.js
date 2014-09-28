define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/dashboard/dashboardItemTemplate.html'
], function($, _, Backbone, dashboardItemTemplate){

  var DashboardItemView = Backbone.View.extend({
    el: $("#course_list"),

    render: function(){

      console.log("dashboard -- item");
      
      this.$el.append("bOOP");
    }

  });

  return DashboardItemView;
  
});
