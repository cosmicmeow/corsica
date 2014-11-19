define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var CourseModel = Backbone.Model.extend({
     //urlRoot: '/waitlist',

     defaults: {
       status: '',
       capacity: '',
       avaliableSeats: '',
       prop: '',
       courseNum: '',
       crn: '',
       note: '',
       description: '',
       days: '',
       location: '',
       instructor: '',
       i_user: '',
       unknown1: '',
       unknown2: '',
       unknown3: '',
       unknown4: '',
       unknown5: '',
       unknown6: '',
       unknown7: '',
       myModelId: null
    },

    urlRoot: '/waitlist'
    /*
    url : function() {
      // Important! It's got to know where to send its REST calls. 
      // In this case, POST to '/donuts' and PUT to '/donuts/:id'
      return this.id ? '/waitlist/' + this.id : '/waitlist'; 
    } 
    */
  });


  return CourseModel;

});
