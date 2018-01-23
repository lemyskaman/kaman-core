var Marionette = require('backbone.marionette');
var kamanFunctions = require('./kaman.functions');
var core = require('kaman-core')


var KappCollectionView = Marionette.CollectionView.extend({
    kind: 'KappCollectionView',

    langSource: {},
    lang: function (key) {
        return kamanFunctions.lang(key, this.langSource);
    },

    kappInit: function () { kamanFunctions.kappInit(this) },
    initialize: function () {

        this.kappInit();
    },
    exposeAs(name) {

        try {
            kamanFunctions.expose(this, name)
        }
        catch (err) {
            console.error(err)
        }

    }
});


module.exports = KappCollectionView