define(['backbone', 'models/course/Course'], function(Backbone, CourseModel) {

    var ClassCollection = Backbone.Collection.extend({
        model: CourseModel,
        //url: config.base_url + 'assets/data/events.json',
        url: '/data',

        initialize: function(models) {},

        parse: function(data) {
            return data.events || [];
        }
    });
    console.log(ClassCollection);

    return ClassCollection;

});
