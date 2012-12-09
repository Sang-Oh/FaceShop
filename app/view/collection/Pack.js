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
		cls:'mybg',
		items:[
		{
			xtype:'dataview',
            scrollable:'horizontal',
            margin:'0 0 10 0',
            inline: {
                wrap: false
            },			
			style:'border-radius: 5px; background-color:gray;line-height:100px;',
			height:84,
			padding:5,
			itemTpl: new Ext.XTemplate(
					['<img style="margin:5px;" src="{icons:this.getBestIcon}"/>'].join(''),
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
							return img;
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
