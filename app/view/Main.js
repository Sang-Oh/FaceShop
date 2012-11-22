Ext.define("FaceShop.view.Main", {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar',
    'FaceShop.view.FaceEdit',
    'Ext.ux.PinchZoomImage'],   
    config: {
    	layout:'card',
        items: [
        {
                	xtype:'faceedit',
	    }
	    ]
	}   
});