/**
 * Created by lemyskaman on 24/01/17.
 */

var Marionette = require('backbone.marionette');

var core = require('kaman-core')


var KappCollectionView = Marionette.CollectionView.extend({

 	


    initialize: function () {

        var filtredOptions = _.omit(this.options, ['model', 'collection']);
        _.each(filtredOptions, function (value, key, list) {
            this[key] = value;
        }, this)

        if (typeof this.rInitialize === 'function') {
            this.rInitialize()
        }
    }
});


module.exports = KappCollectionView