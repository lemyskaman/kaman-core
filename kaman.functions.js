

var Promise = require('bluebird');
var _ = require('underscore');

/** 
* It takes a Backbone Object as subject and merge all  
*  opt as subjet properties removing the opt from view options
* @param subject Backbone.Object, the object to operate over
* @param opts  Object, the options to add
* @return void
*/


function backboneOptsAsProps(subject, opts) {
    if (!opts) {
        opts = subject.options
    }

    subject.mergeOptions(subject.options, _.keys(opts));
    //removing form view.options the options that ve been merged above
    //so if we use view.getOption("opt") will return the merged opt and not the opt in view.options boject 
    subject.options=_.omit(subject.options,_.keys(opts))
    
    
    console.log("opts mergerged for ",subject);


};

/**
* It takes a Backbone Object as subject and return same object without omit
* @param subject Backbone.Object, the object to operate over
* @param omit Array, the keys from subjet.options to omit
* @return void
*/

function omitBackboneOptsAsProps(subject, omit) {
    console.log("omitBackboneOptsAsProps:")
    console.log(subject, subject.options, omit, _.omit(subject.options, omit))
    backboneOptsAsProps(subject, _.omit(subject.options, omit))
}

/**
 * you got to bind view object to this function 
 * @param {function} callback 
 */
function kappInit(subject, callback) {

    //if expose option is added we expose this view
    console.log("kappInit:", subject)
    if (subject.getOption("expose_as")) {
        console.log("kappInit: found exposeAs option " + subject.getOption("expose_as"))
        subject.exposeAs(subject.getOption("expose_as"))

    }

    //as backbone has its owne method to bind a model and collections to views we just
    //avoid to merge it to the object atributes by this way
    omitBackboneOptsAsProps(subject, ['model', 'collection'])
    //giving the replaceable regions to the view
    if (typeof subject._addReplaceableRegions === "function") {
        subject._addReplaceableRegions();
    };

    if (typeof callback === "function") {
        callback()
    }


}


/**
 * utility function to get the language value from keys 
 * on a languageSource object acording the specified language
 * comming from the server and placed in the 
 * @param key String, the key to search of
 * @param source Object, the list to search for the key
 * @return string, the key value if it is in the source list, otherwise will retrun the key name 
 */
function lang(key, source) {
    //first we retrive the lang value of the root of the DOM
    var LANG = document.documentElement.lang;
    //console.log(source)
    //console.log(LANG+' '+key+' - '+source[LANG][key]);
    if (_.isObject(source) && _.isObject(source[LANG]) && _.isString(source[LANG][key])) {
        return source[LANG][key]
    } else {
        return key
    }

}

function checkName(subject) {

    if (_.isString(subject.name)) {
        return true
    } else {
        console.warn('cant find a valid name property for a kaman object')
        return false
    }

}

function exposer(subject, name) {
    if (window[name])
        console.warn("window."+name+ " content its being replaced")

    window[name] = subject
    console.log("exposer: exposed as:" + name)
}

/**
 * a tool to let some object to be exposed to window on 
 * browsers avoiding overwrite existent objects
 */
function expose(subject, name) {
    //console.log(window[name])
    if (subject.isRendered()) {
        exposer(subject, name);
    } else {
        subject.on("attach", function () {
            exposer(subject, name);
        })
    }
}

/**
 * this function will iterate over each list elements  
 * setting the one on key to true an all other on false 
 * @param key String, the key to set as true
 * @param list Object, the object to search for the key to set to true
 * @return void
 */
function commutate(key, list) {
    _.each(list, function (v, k, l) {
        if (k === key) {
            l[key] = true
        }
        if (v === true && k !== key) {
            l[k] = false
        }
    })
}

module.exports = {
    lang: lang,
    checkName: checkName,
    backboneOptsAsProps: backboneOptsAsProps,
    omitBackboneOptsAsProps: omitBackboneOptsAsProps,
    kappInit: kappInit,
    expose: expose
}