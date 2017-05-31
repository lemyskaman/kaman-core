/**
 * Created by lemyskaman on 17/01/17.
 */


var radio = require('backbone.radio');
var Backbone = require('backbone');

var lang = require('./../lang');
var KCFG = require('./../config');

var uiChannel=radio.channel('ui');
var debug= KCFG.debug


var KappModel = Backbone.Model.extend({
    //config:appChannel.request('get:config'),
    config:KCFG,
    langSource: lang,
    kind:'kappModel',
    lang: function(key) {
        return KLIBS.tools.lang(key, this.langSource)
    },
    onSaveSuccess: {
        action: false,
        channelName: false,
        param: null,
        message: null
    },
    onSaveFails: {
        action: false,
        channelName: false,
        param: null,
        //message comes from server on sync error
    },


    setOnRequestNotifyListener: function() {
        this.on('request', function() {

            if (debug)
                console.warn('kappModel request')
           //appChannel.request('notify', this.lang('requesting'), 'warning');
            uiChannel.request('notify:warn',this.lang('requesting'))
        });
    },
    setOnSyncNotifyListener: function() {

        this.on('sync', function(m, r, o) {

            //console.log(m,r,o)
            var syncMessage = '';

            if (this.onSaveSuccess.message) {
                syncMessage = this.onSaveSuccess.message;
            } else {
                syncMessage = r.message || 'sync' ;
            }
            if (debug)
                console.log('kappModel sync: '+syncMessage)
            //appChannel.request('notify', this.lang(syncMessage), 'success');
            uiChannel.request('notify:success',this.lang(syncMessage))
        }, this);
    },
    //message key comes from server on sync error
    setOnErrorNotifyListener: function() {
        this.on('error', function(m, r, o) {

            //console.log(m,r,o)
            var errorMessage = '';
            if (r.readyState === 0 || r.status === 0) {
                errorMessage = 'no_server_response'
            } else {
                errorMessage = r.responseJSON.message || 'error'
            }

            if (debug)
                console.error('kappModel error: '+errorMessage)
            //appChannel.request('notify', this.lang(errorMessage), 'danger')
            uiChannel.request('notify:danger',this.lang(errorMessage))
        });
    },


    setOnSyncActionListener: function() {
        if (this.onSaveSuccess) {
            if (this.onSaveSuccess.action && this.onSaveSuccess.channelName) {
                this.on('sync', function() {
                    radio.channel(this.onSaveSuccess.channelName).request(this.onSaveSuccess.action, this.onSaveSuccess.param);
                }, this);
            }

        };
    },
    setOnErrorActionListener: function() {

        if (this.onSaveFails) {
            if (this.onSaveFails.action && this.onSaveFails.channelName) {
                this.on('error', function(m, r, o) {
                    radio.channel(this.onSaveFails.channelName).request(this.onSaveFails.action, this.onSaveFails.param);
                }, this);
            }
        };
    },

    setOnSaveNotifyListeners: function() {
        console.log('set notify listeners for: '+this.channelName )
        this.setOnRequestNotifyListener();
        this.setOnSyncNotifyListener();
        this.setOnErrorNotifyListener();
    },
    setOnSaveActionListeners: function() {

        this.setOnSyncActionListener();
        this.setOnErrorActionListener();

    },
    initialize: function() {
        console.log('kaapmodel initialized');
        this.setOnSaveActionListeners();
        this.setOnSaveNotifyListeners();
    }


})


module.exports = KappModel;