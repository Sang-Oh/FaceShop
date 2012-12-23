Ext.define("FaceShop.view.StyleView", {
    extend: 'Ext.Container',
    xtype:'styleview',
    config:{
		layout:'fit',
		style:'background: url(resources/images/background.png) center no-repeat;background-size:100% 100%;',	
		tpl: [
			'<img src="{style}" style="width:100%;" />'
			/*
				'<div style="position:absolute;bottom:100px;right:5px;width:150px;height:80px">',
					'<img src="resources/images/tag.png" style="width:100%;height:100%"/>',
					'<div style="position:absolute;right:10px;top:20px">',
					'{shop}<br/>{model}',
					'</div>',
					
			'</div>'
			*/
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
				iconCls:'settings3',
				iconMask:true,
				action:'edit',
				ui:'normal',
				align:'right'
			}
			]
		},{
			xtype:'toolbar',
			docked:'bottom',
			items:[
			{
				xtype:'button',
				iconCls:'shop1',
				iconMask:true,
				ui:'confirm',
				text:'Shop',
				action:'viewfaceiteminfo'
			},
			{
				xtype:'spacer'
			},
			{
				xtype:'button',
				iconCls:'trash',
				iconMask:true,
				ui:'decline',
				action:'delete'
			}
			]
		}
		]
    },
    applyData:function(newData,oldData) {
    	var me = this;
    	var btn = me.query('[action=viewfaceiteminfo]')[0];
    	btn.setDisabled(true);
		Ext.data.JsonP.request({
			url: SERVER_ADDR+'service.php?name=faceiteminfo',
			callbackKey:'callback',
			params:{
				faceitemid:newData.faceitemid
			},
			success:function(response) {
				if (response.total == 1) {
					btn.setDisabled(false);
					newData.info = response.rows[0];
				}
			},
			failure:function(response) {
				//<debug>
				console.log(response);
				//</debug>
			},
			callback:function(response) {
			}
		});    	
    	
    	return newData;
    }
});