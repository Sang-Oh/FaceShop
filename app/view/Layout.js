Ext.define("FaceShop.view.Layout", {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar',
    'Ext.carousel.Carousel',
    'Ext.dataview.DataView',
    'Ext.data.Store',
    'Ext.ux.PinchZoomImage'],   
    xtype:'facelayout',
    config: {
    	layout:'fit',
    	html:'<div id="facecontainer" style="position:absolute;background-color:yellow;width:100%;height:100%;"></div>',
        items: [
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
	    				]
	            	}
	            	]
	            	
	            }
	           
		],
		listeners:{
			scope:this,
			initialize:function(cmp) {
			},
		}		
	},
	
});