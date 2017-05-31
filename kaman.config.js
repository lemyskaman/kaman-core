
var Backbone = require('backbone')

var Config = Backbone.Model.extend({
    defaults: {
        name: '',
        debug: true,
        resourcesUrl: '',
        nodeSelector: '',
    }
});

module.exports=Config;


/**
var Mn = require('backbone.marionette');
var libs =require('./../libs')


var Config  = Mn.Object.extend({
    channelName:'config',
    model:new Backbone.Model({
        defaults:{
            name:'',
            debug:true,
            resourcesUrl:'',
            nodeSelector:'',
        }
    }),
    radioRequest:{
        'set':'set_config',
        'get':'get_config',
        'data':'get_model'
    },
    set_config:function(key,value){
        return this.model.set(key,value)
    },
    get_config:function(key){
        return this.model.get(key);
    },
    get_model:function(){
        return this.model
    },

    kind:'kappConfig',

    intialize:function(opt){
        
        this.model.set(opt)
        //we check for a mandatory name value
        if (!_.isString(this.model.get('name'))){
            if (this.model.get(debug)){
                console.warn('a config object has been initiated without a name')
            }
        }
        this.model.on('name:change',function(){console.log})
    }
    
});
 */