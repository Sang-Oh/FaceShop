Ext.define("FaceShop.view.FaceEdit", {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar',
    'Ext.carousel.Carousel',
    'Ext.dataview.DataView',
    'Ext.data.Store',
    'Ext.ux.PinchZoomImage'],   
    xtype:'faceedit',
    config: {
    	layout:'fit',
        items: [
                {
                	layout:'fit',
                	xtype:'pinchzoomimage',
	            	style:'background-color:#000',
	            	src:'resources/images/b.png',
	            	isFrozen:false,                		
	            },
	            /*
	            {
	            	xtype:'container',
	            	width:"100%",
	            	html:'<div id="dbg"/>',
	            	height:50,
	            	docked:'top',
	            }, 
	            */
	            {
	            	xtype:'container',
	            	
	            	docked:'bottom',
	            	cls:'thumbnailcontainer',
	            	layout:'fit',
	            	items:[
	            	{
	                    xtype: 'dataview',
	                    height:'100%',
	                    scrollable: 'horizontal',
	                    inline: {
	                        wrap: false
	                    },
	                    //set the itemtpl to show the fields for the store
	                    itemTpl: '<img src="{src}" class="thumbnailimg"/>',
	    				data:[
	    				{src:'resources/images/a.png'},
	    				{src:'resources/images/1.png'},
	    				{src:'resources/images/2.png'},
	    				{src:'resources/images/a.png'},
	    				{src:'resources/images/3.png'},
	    				{src:'resources/images/4.png'},
	    				{src:'resources/images/0.png'},
	    				{src:'resources/images/1.png'},
	    				{src:'resources/images/2.png'},
	    				{src:'resources/images/a.png'},
	    				{src:'resources/images/3.png'},
	    				{src:'resources/images/4.png'},
	    				{src:'resources/images/a.png'},
	    				{src:'resources/images/0.png'},
	    				{src:'resources/images/1.png'},
	    				{src:'resources/images/2.png'},
	    				{src:'resources/images/a.png'},
	    				{src:'resources/images/3.png'},
	    				{src:'resources/images/4.png'},
	    				{src:'resources/images/a.png'},
	    				{src:'resources/images/0.png'},
	    				{src:'resources/images/1.png'},
	    				{src:'resources/images/2.png'},
	    				{src:'resources/images/3.png'},
	    				{src:'resources/images/4.png'},
	    				{src:'resources/images/0.png'},
	    				{src:'resources/images/1.png'},
	    				{src:'resources/images/2.png'},
	    				{src:'resources/images/3.png'},
	    				{src:'resources/images/4.png'},
	    				{src:'resources/images/0.png'},
	    				{src:'resources/images/1.png'},
	    				{src:'resources/images/2.png'},
	    				{src:'resources/images/3.png'},
	    				{src:'resources/images/4.png'},
	    				{src:'resources/images/0.png'},
	    				{src:'resources/images/1.png'},
	    				{src:'resources/images/2.png'},
	    				{src:'resources/images/3.png'},
	    				{src:'resources/images/4.png'},
	    				]
	            	}
	            	]
	            	
	            }
	           
		],
		listeners:{
			scope:this,
			initialize:function(cmp) {
			
			/*
					var node = bg.element.dom.firstChild;
				var carousel =
				Ext.create('Ext.Container', {
					left:'0',
					id:'bg',
					top:0,
					width:'100%',
					height:'100%',
					renderTo: node,
					items:[
					{
						html:'<div style=""><img src="resources/images/0.png" style="position:absolute;left:50%;top:50%;opacity:0.4;margin-left:-160px;margin-top:-240px;" width="320" height="480"/></div>'
					}
					],
					scope: this
				});
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