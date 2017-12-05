

var Promise = require('bluebird');
var _  = require('underscore');

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
        //we turn in object property all the elements in options 

        subject.mergeOptions(subject.options, _.keys(opts))

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
    if (_.isObject(source) &&  _.isObject(source[LANG]) && _.isString(source[LANG][key])) {
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



/**
 * this function will iterate over each list elements  
 * setting the one on key to true an all other on false 
 * @param key String, the key to set as true
 * @param list Object, the object to search for the key to set to true
 * @return void
 */
function commutate(key,list){
    _.each(list,function(v,k,l){
        if (k===key){
            l[key]=true
        }
        if (v===true && k!==key){
            l[k]=false
        }
    })
}

module.exports = {
    lang: lang,
    checkName: checkName,
    backboneOptsAsProps: backboneOptsAsProps,
    omitBackboneOptsAsProps: omitBackboneOptsAsProps
}