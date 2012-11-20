Ext.define("FaceShop.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: ['Ext.TitleBar',
    'Ext.carousel.Carousel',
    'Ext.ux.PinchZoomImage'],   
    config: {
        tabBarPosition: 'top',
        items: [
            {
                title: 'FaceShop',
                iconCls: 'home',
                layout:'fit',
                items: [{
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'FaceShop'
                },
                {
                	//layout:'fit',
                	xtype:'pinchzoomimage',
	            	style:'background-color:#000',
	            	src:'resources/images/b.png',
	            	isFrozen:true,
	            }
	            /*
	            , {
	            	xtype:'container',
	            	style:[
	            	'width:100%;',
	            	'height:100;'
	            	].join(''),
	            	html:['<div style="position:absolute;left:100px;top:1000px;color:white;">',
	            		'hello',
			           '</div>'
	            	].join(''),
	            }   
	            */
                ]
            }
		],
		listeners:{
			scope:this,
			initialize:function(cmp) {
				var bg = cmp.query('pinchzoomimage')[0];
				var node = bg.element.dom.firstChild;
				Ext.create('Ext.Carousel', {
					left:0,
					top:0,
					width:'100%',
					height:'100%',
					renderTo: node,
					items:[
					{
						html:'<div style=""><img src="resources/images/a.png" style="position:absolute;left:250px;top:150px;" width="200" height="200"/></div>'
					},{						
						html:'<div style=""><img src="resources/images/c.png" style="position:absolute;left:250px;top:150px;" width="200" height="200"/></div>'
					}
					],
					scope: this
				});
			}
		}
		
    }
});