Ext.define("FaceShop.view.FaceList", {
    extend: 'Ext.dataview.DataView',
    xtype:'facelist',
    config:{
		layout:'fit',
		style:'width:100%;height:100%;background: url(resources/images/background.png) center no-repeat;background-size:100% 100%;',	
		store:'Face',
		inline: {
	        wrap: true
        },

		itemTpl: '<div class="stylebox"><img src="{face}" class="styleimg"/></div>',
		items:[
		{
			xtype:'titlebar',
			title:'Faces',
			docked:'top',
			items:[
			{
				xtype:'button',
				action:'back',
				text:'Back',
				align:'left',
				ui:'back',
				align:'left',
			}
			]
		},
		]
    }
});