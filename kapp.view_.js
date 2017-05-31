/**
 * Created by lemyskaman on 14/10/16.
 */
var _ = require('underscore');

var Backbone = require('backbone');
var radio = Backbone.Radio;
var Marionette = require('backbone.marionette');

var tools = require('./../libs/kamantools');
var coreOps = require('./kapp.ops.js');

var appChannel = radio.channel('kapp');

var KappView = Marionette.View.extend({
    //setting the language
    behaviors: [coreBehavior],
    name: 'kapp view',
    langSource: {},
    lang: function (key) {

        return KLIBS.tools.lang(key, this.langSource)
    },
    model: new Backbone.Model({}),

    coreInit: function () {
        return coreOps(this, ['model', 'collection']);
    },
    initialize: function (opt) {


        console.log(this.options)

        if (!this.langSource)
            console.warn('there is not language source for: ' + this.name)


        //we turn in object property all the intializing options
        var filtredOptions = _.omit(this.options, ['model', 'collection']);
        _.each(filtredOptions, function (value, key, list) {
            this[key] = value;
        }, this)

        //only add replaceableRegions if they exits
        if (typeof this.replaceableRegions === 'object' && !tools.object.isEmpty(this.replaceableRegions)) {
            this.addReplaceableRegions();
        }
        console.log('continue initializing view')
        //we allow to add others procees at begin with this
        if (typeof this.rInitialize === "function") {
            this.rInitialize(opt)
        }


    },

    addReplaceableRegions: function () {
        _.each(this.replaceableRegions, function (v, k) {
            this.addRegion(k, {el: v, replaceElement: true})
        }, this)
        setTimeout(function () {
            console.log('add ended runing')
        }, 5000)


    }
})

module.exports = KappView;