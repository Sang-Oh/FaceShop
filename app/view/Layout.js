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
			xtype:'titlebar',
			docked:'top',
			title:'Stage',
			items:[
			{
				iconCls:'backspace',
				iconMask:true,
				align:'left',
        		action:'back',				
			}, {
				iconCls:'action',
				iconMask:true,
				align:'right',	
        		action:'menu',				
			}	
			]
		},
		/*
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
*/
 	            {
	            	xtype:'container',            	
	            	docked:'bottom',
	            	cls:'thumbnailcontainer',
	            	layout:{
	            		type:'hbox'
	            	},
	            	items:[
	            	{
	            		xtype:'button',
	            		iconCls:'hanger',
	            		iconMask:true,
	            		ui:'confirm',
	            		margin:'6 6 6 6',
	            		height:'48px',
	            		action:'viewcollection'
	            		/*
	            		width:'64px',
	            		html:'<a id="viewcollection" href="#">col</a>',
	            		*/
	            	},	            	
	            	{
	                    xtype: 'dataview',
	                    flex:1,
	                    scrollable:'horizontal',
	                    //margin:'100 0 0 0',
	                    inline: {
	                        wrap: false
	                    },
	                    itemTpl: new Ext.XTemplate('<img src="{thumbs:this.getBestIcon}" class="thumbnailimg" />',
	                    				{
										getBestIcon:function(icons) {
												var img = '';
											for (var i=0;i<icons.length;i++) {
												if (icons[i].type == '1x') {
													img = icons[i].img;
													break;
												}
												img = icons[i].img;
											}
											return (FaceShop.app.server+img);
										}
									}),
	                    store:'FaceItems',
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