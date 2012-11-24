Ext.define("FaceShop.view.StyleList", {
    extend: 'Ext.dataview.DataView',
    xtype:'stylelist',
    config:{
		layout:'fit',
		style:'width:100%;height:100%;background: url(resources/images/background.png) center no-repeat;background-size:100% 100%;',	
		store:'Style',
		inline: {
	        wrap: true
        },
		//tpl:'<tpl for="items"><img src="{style}"/></tpl>',	
		itemTpl: '<div class="stylebox"><img src="{style}" class="styleimg"/></div>',
		items:[
		{
			xtype:'titlebar',
			title:'Style Album',
			docked:'top',
			items:[
			{
				xtype:'button',
				action:'back',
				text:'Back',
				align:'left',
				ui:'back',
				align:'left',
			},{
				xtype:'button',
				action:'home',
				text:'Home',
				align:'left',
				ui:'normal',
				align:'right'
			}
			]
		},
		]
    }
});