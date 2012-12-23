Ext.define("FaceShop.view.Home", {
    extend: 'Ext.Container',
    requires:['Ext.Toolbar',
    	'Ext.TitleBar',
    	'Ext.Toolbar',
		'FaceShop.view.PackIcon',
		'FaceShop.view.FaceItemIcon'    	
    ],
    xtype:'facehome',
    config:{
		layout:'vbox',
		style:'width:100%;height:100%;background: url(resources/images/background.png) center no-repeat;background-size:100% 100%;',
		items:[
		{
			xtype:'titlebar',
			title:'Faceware',
			docked:'top',
			items:[
			{
				xtype:'button',
				iconCls:'info',
				iconMask:true,
				align:'right',
				action:'viewhelp'
			}
			]
			
		},
		{
			xtype:'packicon',
			id:'homepackicon'
		},
		{
			xtype:'faceitemicon'
		},
		{
			xtype:'toolbar',
			docked:'bottom',
			items:[
			{
				text:'Take',
				iconCls:'photo1',
				iconMask:true,
				iconAlign:'left',
				action:'takephoto'
			},{
				xtype:'spacer'
			},{
				text:'Select',
				iconCls:'photos2',
				iconMask:true,
				iconAlign:'left',
				action:'selectphoto'
			}, {
				xtype:'spacer'
			}, {
				text:'Styles',
				iconCls:'address_book',
				iconMask:true,
				iconAlign:'left',
				action:'selectstyle'
			}
			]
		}
/*
		{
			xtype:'icontoolbar',
			docked:'bottom',
    		defaults:{
    			xtype:'button',
  			},			
			items:[
			{
				xtype:'spacer'
			},{
				text:'Enter',
				ui:'confirm',
				action:'takephoto'
			}, {
				xtype:'spacer'
			},{
				//cls:'btnMenu3',
				text:'Styles',
				//	pressedCls:'btnMenu3Pressed',
				action:'selectstyle'
			}, {
				xtype:'spacer'
			},
*/
			/*
			{
				text:'reset',
				handler:function() {
					window.localStorage.clear();
		  			window.location.reload();
				}
			}
			*/

		]
    }
});