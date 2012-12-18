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
		margin:0,
		padding:0,
		items:[
		{
			xtype:'dataview',
			height:68,
			id:'packicon',
            scrollable:'horizontal',
            inline: {
                wrap: false
            },			
			cls:'packcontainer',
			padding:0,
			
           // style:' background-color:gray;',
			itemTpl: new Ext.XTemplate(
					[
					'<img style="margin:5px;" src="{icons:this.getBestIcon}" width=72" height="48"\/>'
					].join(''),
					{
						getBestIcon:function(icons) {
							var img = '';
							for (var i=0;i<icons.length;i++) {
								if (icons[i].type == '1x') {
									img = icons[i].img;
									break;
								}
								img = icons[i].img;
							}
							return FaceShop.app.server+img;
						}
					}),
			store:'Packs',
			/*
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
			*/
			
		},{
			xtype:'dataview',
			id:'faceitemicon',
			cls:'faceitemcontainer',
            scrollable:'vertical',
            inline: {
                wrap: true
            },	
            //itemCls:'packimg',
			itemTpl: new Ext.XTemplate(
					['<img style="margin:5px;" src="{styles:this.getBestIcon}" width="64" height="64"/>'].join(''),
					{
						getBestIcon:function(icons) {
							var img = '';
							for (var i=0;i<icons.length;i++) {
								if (icons[i].type == '1x') {
									img = icons[i].img;
									break;
								}
								img = icons[i].img;
							}
							return FaceShop.app.server+img;
						}
					}),			
			flex:1,
			store:'FaceItems',
			/*
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
			*/
		}
		]
	}
});
