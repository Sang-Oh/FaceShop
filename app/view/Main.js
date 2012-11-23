Ext.define("FaceShop.view.Main", {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar',
    'FaceShop.view.FaceEdit',
    'FaceShop.view.Layout',
    'Ext.ux.PinchZoomImage'], 
    xtype:'main', 
    config: {
    	layout:'card',
        items: [
        {
        	xtype:'facelayout'
        },
        {
        		xtype:'faceedit',
	    }, {
	    		xtype:'container',
	    		//width:'100%',
	    		//height:'100%',
	    		style:'background-color:yellow',
	    		//		styleHtmlContent:true,
	    		//html:['<div id="dest" style="position:absolute;background-color:yellow;height:100%;width:100%;"></div>',
	    		html:['<img id="dest"/>',
			].join(''),
	    },
	    {
	    		xtype:'toolbar',
	    		docked:'bottom',
	    		items:[
	    		{
	    			text:'edit',
	    			handler:function() {
	    				Ext.ComponentQuery.query('main')[0].setActiveItem(0);
	    			}
	    		}, {
	    			text:'view',
	    			handler:function() {
	    				Ext.ComponentQuery.query('main')[0].setActiveItem(2);
	    			}
	    		}, {
	    			xtype:'spacer'
	    		}, {
	    			text:'draw',
	    			handler:function() {
	    				var bgcanvas = Ext.select("#bg").elements[0];
	    				var bgctx = bgcanvas.getContext('2d');
	    				
	    				var obcanvas = Ext.select("#ob").elements[0];
	    				var obctx = obcanvas.getContext('2d');
	    				
	    				var bgimg = new Image();
	    				bgimg.onload = function(m){
	    					//bgctx.drawImage(bgimg,0,0);
	    				}
	    				bgimg.src= "resources/images/b.png";
	    				
	    				var obimg = new Image();
	    				obimg.onload = function(m){
	    					obctx.drawImage(obimg,0,0);
	    					//obctx.drawImage(obimg,0,0,obimg.width,obimg.height,100,100, 100,200);
	    				}
	    				obimg.src = "resources/images/a.png";
	    			}
	    		}, {
	    			text:'convert',
	    			handler:function() {
						var sources = {
				          item: "resources/images/a.png",
				          face: "resources/images/b.png"
				        };
				        var controller = FaceShop.app.getController('Main');
				        var callback = function(images) {
				        	controller.initStage(images);
				        }
				        controller.loadImages(sources, null);
	    				
	    				
	    				/*
	    				var src = Ext.select('canvas').elements[0];//.parentElement;
	    				
	    				//src = Ext.select("#src").elements[0];
	    				
	    				html2canvas([src], {onrendered: function( canvas ) { 
	    					dest.src = canvas.toDataURL();
	    					//console.log(dest.src);
	    					window.open(canvas.toDataURL());
	    					//debugger;
	    					//dest.appendChild(canvas);
	    					//canvas.width="100%";
	    					//canvas.height="100%;"
	    						
	    					}
	    					
	    				});
	    				*/
	    			}
	    		}
	    		]
	    }
	    ]
	}   
});