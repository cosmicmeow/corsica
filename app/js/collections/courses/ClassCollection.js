define(['backbone', 'models/course/Course.js'], function(Backbone, ClassModel) {

    var ClassCollection = Backbone.Collection.extend({
        model: ClassModel,
        //url: config.base_url + 'assets/data/events.json',
        url: '/data',

        initialize: function(models) {},

        parse: function(data) {
            return data.events || [];
        }
    });
    console.log(ClassCollection.fetch());

    return ClassCollection;

});
