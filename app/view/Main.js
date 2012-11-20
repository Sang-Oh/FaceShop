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
	                	layout:'fit',
	                	xtype:'pinchzoomimage',
		            	style:'background-color:#000',
		            	src:'resources/images/b.png',
		            	isFrozen:false,                		
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
				/*
				var carousel =
				Ext.create('Ext.Carousel', {
					left:'0',
					top:0,
					width:'100%',
					height:'100%',
					renderTo: node,
					items:[
					{
						html:'<div style=""><img src="resources/images/0.png" style="position:absolute;left:50%;top:50%;opacity:0.4;margin-left:-160px;margin-top:-240px;" width="320" height="480"/></div>'
					},{						
						html:'<div style=""><img src="resources/images/c.png" style="position:absolute;left:50%;top:50%;" width="100" height="100"/></div>'
					}
					],
					scope: this
				});
				carousel.on('activeitemchange', cmp.activeitemchange)
				*/
			},
		}		
	},
	activeitemchange: function(container, value, oldValue, eOpts) {
		var activeItemIndex = container.getActiveIndex();
		var galleryTotal = container.getInnerItems() ? container.getInnerItems().length : 0;
		// this would be retrieved normally prior to initially populating the carousel
		var photos = [
		{xtype: 'container', html:'<div style=""><img src="resources/images/1.png" style="position:absolute;left:50%;top:50%;" width="200" height="100"/></div>'},
		{xtype: 'container', html:'<div style=""><img src="resources/images/2.png" style="position:absolute;left:50%;top:50%;" width="100" height="100"/></div>'},
		{xtype: 'container', html:'<div style=""><img src="resources/images/3.png" style="position:absolute;left:50%;top:50%;" width="100" height="100"/></div>'},
		{xtype: 'container', html:'<div style=""><img src="resources/images/4.png" style="position:absolute;left:50%;top:50%;" width="100" height="100"/></div>'},
		];
		
		if ((activeItemIndex + 1 == galleryTotal) && photos.length > galleryTotal) {
		    var nextPhoto = photos[galleryTotal]; //loading one in this example, but can be tweaked to load more.
					    this.add(nextPhoto);
					}
	       	 	}
	   
});