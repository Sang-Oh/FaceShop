Ext.define("FaceShop.view.Layout", {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar',
    'Ext.carousel.Carousel',
    'Ext.dataview.DataView',
    'Ext.ActionSheet',
    'Ext.data.Store',
    'Ext.ux.PinchZoomImage'],   
    xtype:'facelayout',
    config: {
    	layout:'fit',
    	html:'<div id="facecontainer" style="background:url(resources/images/background.png) center no-repeat;background-size:100% 100%;position:absolute;background-color:#000;width:100%;height:100%;"></div>',
        items: [

        {
        	xtype:'container',
        	padding:10,
        	items:[
        	{
        		xtype:'button',
        		text:'Home',
        		style:'float:left',
        		width:'5em',
        		ui:'normal',
        		action:'back',
        		
        	},
        	{
        		xtype:'button',
        		text:'Menu',
        		style:'float:right',
        		width:'5em',
        		action:'menu',
        	}
        	
        	]
        },

 	            {
	            	xtype:'container',            	
	            	docked:'bottom',
	            	cls:'thumbnailcontainer',
	            	layout:{
	            		type:'hbox'
	            	},
	            	items:[
	            	{
	            		width:'64px',
	            		html:'<a id="viewcollection" href="#">collection</a>',
	            	},	            	
	            	{

	                    xtype: 'dataview',
	                    height:'100%',
	                    width:'100%',
	                    scrollable:'horizontal',
	                    //margin:'100 0 0 0',
	                    inline: {
	                        wrap: false
	                    },
	                    itemTpl: '<img src="{thumb}" class="thumbnailimg" />',
	                    store:'FaceItem',
	            	}
	            	]
	            	
	            }
	            
	           
		],
		listeners:{
			scope:this,
			initialize:function(cmp) {
			},
			tap: {
				fn:function(e,el,obj) {
					if (e.getTarget().id == 'viewcollection') {
						this.fireEvent('viewcollection', e, el,obj);
					}
				},
				element:'element',
				delegate:'a'
			},
			doubletap: {
				fn :function (e, el, obj) {
					this.fireEvent('doubletap', e, el,obj);
				},	
				element: 'element',				
			},
			rotate: {
				fn :function (e, el, obj) {
					this.fireEvent('rotate', e, el,obj);
				},	
				element: 'element',				
			},
			pinchstart: {
				fn :function (e, el, obj) {
					this.fireEvent('pinchstart', e, el,obj);
				},	
				element: 'element',
			},
			pinchend: {
				fn : function (e, el, obj) {
					this.fireEvent('pinchend', e, el,obj);
				},	
				element: 'element',
			},	
			pinch : {
				fn : function (e, el, obj) {	
					this.fireEvent('pinch', e, el,obj);
				},	
				element: 'element',
			},		
		}		
	},
	
});