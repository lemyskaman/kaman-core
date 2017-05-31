var radio = require('backbone.radio');
var Backbone = require('backbone');

var kappOps = require('./kapp.ops.js');
var lang = require('./../lang');
var KCFG = require('./../config');

var KappCollection = Backbone.Collection.extend({
    config: KCFG,
    langSource: lang,
    kind:'kappCollection',
    lang: function(key) {
        return KLIBS.tools.lang(key, this.langSource)
    },
    kappInit:function(){
        kappOps.optionsAsProperties(this,['model'])

    },
    initialize:function(){
       this.kappInit();
    }

});

module.exports = KappCollection;