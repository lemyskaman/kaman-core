var Marionette = require('backbone.marionette');

var core = require('kaman-core')


var KappCollectionView = Marionette.CollectionView.extend({
    kind: 'KappCollectionView',

    langSource: {},
    lang: function (key) {
        return kamanFunctions.lang(key, this.langSource);
    },

    kappInit: function () {
        //as backbone has its own method to add a model and a collection to views we just
        //avoid to merge it to the object by this way
        var opts = _.omit(this.options, ['model', 'collection'])
        this.mergeOptions(this.options, _.keys(opts))

    },
    initialize: function () {

        this.kappInit();


    }
});


module.exports = KappCollectionView