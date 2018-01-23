/**
 * Created by lemyskaman on 14/10/16.
 */

var radio = Backbone.Radio;
var Marionette = require('backbone.marionette');

var kamanFunctions = require('./kaman.functions');

var KappView = Marionette.View.extend({

    kind: 'kappView',

    langSource: {},

    extraInit: function () { }, //must be a function
    lang: function (key) {
        return kamanFunctions.lang(key, this.langSource);
    },

    /**
     * A shortway to add regions with replaceElement option set to true
     * form a replaceableRegions object on a marionette Views
     * @param subject Marionette.View
     * @return void
     */
    _addReplaceableRegions: function () {


        _.each(this.replaceableRegions, function (v, k) {
            this.addRegion(k, { el: v, replaceElement: true })
        }, this)
    },
    
    
    /**
    * this is whatmakes special to a Kaman Object this constructor method
    * where some things are fired and added to "this"
    * @return void
    */    
    kappInit: function () { kamanFunctions.kappInit(this) },
    /*
    kappInit: function (opt,callback) {

        //if expose option is added we expose this view
        console.log("kappInit:",opt)
        if (typeof this.getOption("exposeAs")!=='function'){
            console.log("kappInit: found exposeAs option "+this.getOption("exposeAs"))
            this.exposeAs(this.options.exposeAs)

        }

        //as backbone has its owne method to bind a model and collections to views we just
        //avoid to merge it to the object atributes by this way
        kamanFunctions.omitBackboneOptsAsProps(this, ['model', 'collection','exposeAs','lemys'])
        //giving the replaceable regions to the view
        this._addReplaceableRegions();

        if (typeof callback === "function"){
            callback()
        }


    },*/

    initialize: function (opt) {

        this.kappInit(opt);




    },
    exposeAs(name) {

        try {
            kamanFunctions.expose(this, name)
        }
        catch (err) {
            console.error(err)
        }
    }


})


module.exports = KappView;
