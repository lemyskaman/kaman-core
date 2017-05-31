var radio = require('backbone.radio');
var Backbone = require('backbone');

var lang = require('./../lang');

var KCFG = require('./../config');

/*
    special backbone collection with an upgrade 
    allow to retrive filtred elem,ent from aresource based on a searchKey
    of a backbone model (search Key)

    YOU HAVE TO EXTEND IT TO MUTATE IT CANT PASS A OBJECT DIFERENT THAN A MODEL
    ON INSTANTIATED

*/
var KappSearchableCollection = Backbone.Collection.extend({
    name: '',
    config: KCFG,
    langSource: lang,
    resource: '-',
    searchModel: {},
    searchKey: 'guess',
    lang: function (key) {
        return KLIBS.tools.lang(key, this.langSource)
    },
    initialize: function () {
        console.log('a searchable collection has ben initialized')


        if (this.searchModel instanceof Backbone.Model) {
            this.listenTo(this.searchModel, 'change', function () {
                console.log('search model of searchable collection changed')
                this.fetch()
            })
        }

        if (typeof this.rInitialize === "function") {
            this.rInitialize(opt)
        }
    },
    url: function () {
        if (this.searchModel instanceof Backbone.Model && this.searchKey !== '') {
            //console.log(this.name + 'searchable collection is using a dinamic url with ' + this.searchKey + ' as key')
            return this.config.resourcesUrl + '/' + this.resource + '/' + this.searchModel.get(this.searchKey)
        } else {
            //console.log(this.name + 'searchable collection WITH STATIC URL');
            return this.config.resourcesUrl + '/' + this.resource
        }
    }

});

module.exports = KappSearchableCollection;