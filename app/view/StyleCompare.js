Ext.define("FaceShop.view.StyleCompare", {
    extend: 'Ext.Container',
    requires:[
    'Ext.dataview.DataView',
    'Ext.dataview.List',
    ],
    xtype:'stylecompare',
    config:{
		layout:'hbox',
		style:'width:100%;height:100%;background: url(resources/images/background.png) center no-repeat;background-size:100% 100%;',	
		items:[
		{
			flex:1,
			xtype:'dataview',
			emptyText:'',
			itemTpl: '<img src="{style}" style="width:100%;" />',
			/*
			data:[
				{style:'resources/images/man/b.png'},
				{style:'resources/images/man/b.png'},
			]
			*/
			store:null
			/*
			inline: {
		        wrap: false
	        },
	        */					
		},{
			flex:1,
			emptyText:'',
			xtype:'dataview',
			itemTpl: '<img src="{style}" style="width:100%;" />',
			store:null		
		}
		],
    }
});