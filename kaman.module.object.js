var Backbone = require('backbone');
var Mn = require('backbone.marionette');
var KamanFunctions = require('./kaman.functions');


var ModuleObject = Mn.Object.extend({
    name:'',
    channelName:'',
    icon:'',
    caption: '',

})


module.exports=ModuleObject;