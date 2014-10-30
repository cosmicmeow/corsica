define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var ContributorModel = Backbone.Model.extend({
     urlRoot: '/data',
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
       unknown7: ''
    }
  });


  return ContributorModel;

});
