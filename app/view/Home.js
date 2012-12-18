Ext.define("FaceShop.view.Home", {
    extend: 'Ext.Container',
    requires:['FaceShop.view.IconToolbar'],
    xtype:'facehome',
    config:{
		layout:'fit',
		style:'width:100%;height:100%;background: url(resources/images/background1.png) center no-repeat;background-size:100% 100%;',
		
		items:[
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
				/*
				cls:'btnMenu1',
				pressedCls:'btnMenu1Pressed',
				*/
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
		]
    }
});