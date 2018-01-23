var Mn = require('backbone.marionette');

var KamanBehavior = Mn.Behavior.extend({
    /**
     * this method takes an array of behavior methods name and 
     * copy them to the view object which this behavior is attched to 
     * allowing to acces them directly from the view
     * @param methodListm array with the names of methos
     * @return void
     */
    bindMethods:function(methodList){
        _.each(methodList,function(e,i){
            this.view[e]=this[e].bind(this)
        },this  )
    },

})

module.exports= KamanBehavior;