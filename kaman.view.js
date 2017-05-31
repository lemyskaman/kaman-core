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
    model: new Backbone.Model({}),

    kappInit: function () {
        return kamanFunctions.omitBackboneOptsAsProps(this, ['model', 'collection'])
            //.then(kamanFunctions.checkName)
            .then(kamanFunctions.addReplaceableRegions)
            .then(function(){
                kamanFunctions.checkName(this)
            }.bind(this))
           
    },
    initialize: function () {

        this.kappInit()
            .then(function () {



            })
    }


})


module.exports = KappView;