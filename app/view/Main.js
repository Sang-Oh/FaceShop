Ext.define("FaceShop.view.Main", {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar',
    'FaceShop.view.Layout',
    'FaceShop.view.Home',
    'FaceShop.view.StyleList',
    'FaceShop.view.FaceList',
    'FaceShop.view.StyleView',
    'FaceShop.view.collection.Main',
    'Ext.ux.PinchZoomImage'], 
    xtype:'main', 
    config: {
    	layout:'card',
        items: [
        {
        	xtype:'facehome'
        },
        {
        	xtype:'facelayout'
        },
        {
        	xtype:'stylelist'
        },
        {
        	xtype:'collectionmain'
        },
        {
        	xtype:'styleview'
        },
        {
        	xtype:'facelist'
        },
	    ]
	}   ,

});