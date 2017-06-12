/**
 * Created by lemyskaman on 14/10/16.
 */

var radio = Backbone.Radio;
var Marionette = require('backbone.marionette');

var kamanFunctions = require('./kaman.functions');

var KappView = Marionette.View.extend({

    kind: 'kappView',

    langSource: {},
    lang: function (key) {
        return kamanFunctions.lang(key, this.langSource);
    },
    

    kappInit: function () {
        //as backbone has its on method to add model and collection to views we just
        //avoid to merge it to the object by this way
        var opts = _.omit(this.options, ['model', 'collection'])
        this.mergeOptions(this.options,_.keys(opts))

        //ccreating replaceable regions
        _.each(this.replaceableRegions, function (v, k) {
            this.addRegion(k, {el: v, replaceElement: true})
        }, this)

        return this
    },
    PkappInit: function () {
        return kamanFunctions.omitBackboneOptsAsProps(this, ['model', 'collection'])
            //.then(kamanFunctions.checkName)
            .then(kamanFunctions.addReplaceableRegions)
            .then(function () {
                kamanFunctions.checkName(this)
            }.bind(this))

    },
    initialize: function () {

        this.kappInit();


    }


})


module.exports = KappView;
