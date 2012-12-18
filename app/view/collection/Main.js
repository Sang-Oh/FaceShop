Ext.define('FaceShop.view.collection.Main',{
	extend:'Ext.Container',
	requires:[
	'Ext.TitleBar',
	'FaceShop.view.collection.Pack'
	],
	xtype:'collectionmain',
	config:{
		layout:{
			type:'card'
		},
		items:[
		{
			xtype:'titlebar',
			title:'Collection',
			docked:'top',
			items:[
			{
				iconCls:'backspace',
				iconMask:true,
				ui:'back',
				align:'left',
				action:'backtolayout'
			}]
			
		},
		{
			xtype:'collectionpack'
//		},{
//			xtype:'collectionsearch'
		}]
	}
})
