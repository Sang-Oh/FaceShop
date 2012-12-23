Ext.define("FaceShop.view.StyleList", {
    extend: 'Ext.dataview.DataView',
    xtype:'stylelist',
    config:{
		layout:'fit',
		style:'width:100%;height:100%;background: url(resources/images/background.png) center no-repeat;background-size:100% 100%;',	
		inline: {
	        wrap: true
        },
		emptyText:'',
		
		itemCls:'styleitemcls',
		pressedCls:'styleitempressedcls',
		selectedCls:'styleitemselectedcls',
		itemTpl: '<img src="{style}" style="border-radius:5px;margin:10px;" width="120" height="120" /></div>',
		store:null,
		items:[
		{
			xtype:'titlebar',
			title:'Styles',
			docked:'top',
			items:[
			{
				xtype:'button',
				action:'home',
				iconCls:'home',
				iconMask:true,
				text:'',
				ui:'back',
				align:'left'
/*			},{
				xtype:'button',
				action:'home',
				text:'Home',
				align:'left',
				ui:'normal',
				align:'right'
*/			}
			]
		},
		]
    }
});