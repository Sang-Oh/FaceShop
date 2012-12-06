Ext.define('FaceShop.view.collection.Pack', {
	extend:'Ext.Container',
	requires:[
	'Ext.dataview.DataView',
	],
	xtype:'collectionpack',
	config:{
		layout:{
			type:'vbox'
		},
		padding:'10 10 10 10',
		items:[
		{
			xtype:'dataview',
            scrollable:'horizontal',
            margin:'0 0 10 0',
            inline: {
                wrap: false
            },			
			style:'background-color:blue',
			height:100,
			itemTpl:'<img src="{img}"/>',
			data:[
				{img:'resources/images/itemsmall/bean1.png'},
				{img:'resources/images/itemsmall/bean2.png'},
				{img:'resources/images/itemsmall/bean3.png'},
				{img:'resources/images/itemsmall/bean4.png'},
				{img:'resources/images/itemsmall/bean5.png'},
				{img:'resources/images/itemsmall/bean2.png'},
				{img:'resources/images/itemsmall/bean3.png'},
				{img:'resources/images/itemsmall/bean4.png'},
				{img:'resources/images/itemsmall/bean5.png'},
			]
			
		},{
			xtype:'dataview',
			style:'background-color:green',
            scrollable:'vertical',
            inline: {
                wrap: true
            },			
			itemTpl:'<img src="{img}"/>',
			flex:1,
			data:[
				{img:'resources/images/itemsmall/bean1.png'},
				{img:'resources/images/itemsmall/bean2.png'},
				{img:'resources/images/itemsmall/bean3.png'},
				{img:'resources/images/itemsmall/bean4.png'},
				{img:'resources/images/itemsmall/bean5.png'},
				{img:'resources/images/itemsmall/bean2.png'},
				{img:'resources/images/itemsmall/bean3.png'},
				{img:'resources/images/itemsmall/bean4.png'},
				{img:'resources/images/itemsmall/bean5.png'},
				{img:'resources/images/itemsmall/bean1.png'},
				{img:'resources/images/itemsmall/bean2.png'},
				{img:'resources/images/itemsmall/bean3.png'},
				{img:'resources/images/itemsmall/bean4.png'},
				{img:'resources/images/itemsmall/bean5.png'},
				{img:'resources/images/itemsmall/bean2.png'},
				{img:'resources/images/itemsmall/bean3.png'},
				{img:'resources/images/itemsmall/bean4.png'},
				{img:'resources/images/itemsmall/bean5.png'},				
			]
		}
		]
	}
});
