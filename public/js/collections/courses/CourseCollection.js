define(['backbone', 'models/course/Course'], function(Backbone, CourseModel) {

    var CourseCollection = Backbone.Collection.extend({
        model: CourseModel,
        //url: config.base_url + 'assets/data/events.json',
        url: '/api/waitlists',

        initialize: function(models) {},

        parse: function(data) {
            //console.log(data);
            return data || [];
        }
    });

    return CourseCollection;

});
/*
define(['backbone', 'app/models/event', 'app/utils/config'], function(Backbone, EventModel, config) {

    var EventCollection = Backbone.Collection.extend({
        model: EventModel,
        url: config.base_url + 'assets/data/events2.json',
        initialize: function(models) {},
        parse: function(data) {
            return data.events || [];
        }
    });

    return EventCollection;

});*/