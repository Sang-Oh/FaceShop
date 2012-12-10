Ext.define("FaceShop.view.StyleView", {
    extend: 'Ext.Container',
    xtype:'styleview',
    config:{
		layout:'fit',
		style:'background: url(resources/images/background.png) center no-repeat;background-size:100% 100%;',	
		tpl: [
			'<img src="{style}" style="width:100%;" />',
				'<div style="position:absolute;bottom:100px;right:5px;width:150px;height:80px">',
					'<img src="resources/images/tag.png" style="width:100%;height:100%"/>',
					'<div style="position:absolute;right:10px;top:20px">',
					'{shop}<br/>{model}',
					'</div>',
			'</div>'
		].join(''),
		items:[
		{
			xtype:'titlebar',
			title:'My Style',
			docked:'top',
			items:[
			{
				xtype:'button',
				action:'back',
				text:'Back',
				align:'left',
				ui:'back'
			},{
				xtype:'button',
				text:'Edit',
				action:'edit',
				ui:'normal',
				align:'right'
			}
			]
		},
		]
    }
});