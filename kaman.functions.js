

var Promise = require('bluebird');

/** 
* It takes a Backbone Object as subject and return a promise of
* merging all opt as subjet propertie
* @param subject Backbone.Object, the object to operate over
* @param opts  Object, the options to add
* @return Promise
*/
function backboneOptsAsProps(subject, opts) {
    if (!opts) {
        opts = subject.options
    }
    return new Promise(function (resolve) {
        //we turn in object property all the opt
        _.each(opts, function (value, key, list) {
            subject[key] = value;
        }, subject)


        resolve(subject)
    }).bind(subject)
};

/** 
* It takes a Backbone Object as subject and return a promise of
* merging only some opts as subjet propertie
* @param subject Backbone.Object, the object to operate over
* @param omit Array, the keys from subjet.options to omit
* @return Promise
*/
function omitBackboneOptsAsProps(subject, omit) {
    return backboneOptsAsProps(subject, _.omit(subject.options, omit)).bind(subject)
}


/**
 * A shortway to add regions with replaceElement option set to true
 * form a replaceableRegions object on a marionette Views
 * @param subject Marionette.View 
 * @return void 
 */
function addReplaceableRegions(subjet) {
    _.each(subjet.replaceableRegions, function (v, k) {
        this.addRegion(k, { el: v, replaceElement: true })
    }, subjet)
    console.log('add replaceable regions ', subjet.name)
}





/**
 * utility function to provide language value from keys 
 * on a languageSource object acording some DOM element with 
 * a language value
 * @param key String, the key to search of
 * @param source Object, the object to search for the key
 * @return string, the key as string if it is not in source to returns its value
 */
function lang(key, source) {
    //first we retrive the lang value of the root of the DOM
    var LANG = document.documentElement.lang;

    if (_.isObject(source) &&  _.isObject(source[LANG]) && _.isString(source[LANG][key])) {
        return source[LANG][key]
    } else {
        return key
    }


    /* if (source) {
         if (typeof source[LANG] === "object") {
             if (typeof source[LANG][key] === "string") {
                 return source[LANG][key]
             } else {
                 return key
             }

         } else {
             return key
         }
     } else {
         return key
     }*/
}

function checkName(subject) {

    if (_.isString(subject.name)) {
        return true
    } else {
        console.warn('cant find a valid name property for a kaman object')
        return false
    }

}

module.exports = {
    lang: lang,
    checkName: checkName,

    addReplaceableRegions: addReplaceableRegions,
    backboneOptsAsProps: backboneOptsAsProps,
    omitBackboneOptsAsProps: omitBackboneOptsAsProps
}