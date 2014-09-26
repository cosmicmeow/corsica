define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/dashboard/dashboardTemplate.html',
  'views/dashboard/DashboardItemView'
], function($, _, Backbone, DashboardTemplate, DashboardItemView){

  var DashboardView = Backbone.View.extend({
    el: $("#page"),

    render: function(){
      
      this.$el.html(DashboardTemplate);

      for (var i = 0; i < 30; i++){
        dashboardItemView = new DashboardItemView();
        dashboardItemView.render();
      }
    }

  });

  return DashboardView;
  
});
