Ext.define('FaceShop.view.collection.Pack', {
	extend:'Ext.Container',
	requires:[
	'Ext.dataview.DataView',
	'FaceShop.view.PackIcon',
	'FaceShop.view.FaceItemIcon'
	],
	xtype:'collectionpack',
	config:{
		layout:{
			type:'vbox'
		},
		style:'width:100%;height:100%;background: url(resources/images/background.png) center no-repeat;background-size:100% 100%;',

		margin:0,
		items:[
		{
			xtype:'packicon',
			id:'facepackicon'		
		},{
			id:'faceitemicon',
			xtype:'faceitemicon'
		}
		]
	}
});
