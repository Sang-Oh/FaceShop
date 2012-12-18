Ext.define('FaceShop.controller.Main', {    
  extend: 'Ext.app.Controller',  
  requires:[],
	launch:function() {
	},
	config: {
		userInfo:null,	
		anchors:[],	
		faceItem:null,
		faceItemGroup:null,
		face:null,
		faceGroup:null,
		stage:null,
		isSelectedFace:false,
		isSelectedFaceItem:false,
		selectedItem:null,
		faceItemTransFormAngle:0,
		faceItemTransFormScale:1,
		rotateGuideLine:null,
		
		faceImgSrc:null,
		itemImgSrc:null,
		
		selectedStyle:null,
		
		refs: {
			main:'main',
			faceHome:'facehome',
			faceLayout:'facelayout',
			faceList:'facelist',
			styleList:'stylelist',
			styleView:'styleview',
			collectionMain:'collectionmain',
			collectionPack:'collectionpack',
			editPinch:'faceedit pinchzoomimage',
		},
		control:{
			'viewport': {
				orientationchange:'onOrientationChange'
			},
			'button[action=takephoto]':{
				tap:'onMenuToHome'
			},
			'button[action=viewcollection]':{
				tap:'viewCollection'
			},
			'facehome button[action=takephoto]': {
				tap:'onMenuTakePhoto'
			},
			'facehome button[action=selectphoto]': {
				tap:'onMenuSelectPhoto'
			},
			'facehome button[action=selectstyle]': {
				tap:'onMenuSelectStyle'
			},
			'facelayout button[action=back]': {
				tap:'onBackFromFaceLayout'
			},
			'facelayout button[action=save]': {
				tap:'onSaveFaceLayout'
			},
			'facelayout button[action=menu]': {
				tap:'onLayoutMenu'
			},
			'facelist button[action=back]': {
				tap:'onBackFromFaceList'
			},
			'facelist':{
				itemsingletap:'onItemSelectFromFaceList'
			},
			'stylelist button[action=back]': {
				tap:'onBackFromStyleList'
			},
			'stylelist button[action=home]': {
				tap:'onMenuToHome'
			},
			'stylelist':{
				itemsingletap:'onItemSelectFromStyleList'
			},
			'styleview button[action=buy]': {
				tap:'onBuy'
			},
			'styleview button[action=edit]': {
				tap:'onEditStyle'
			},
			'styleview button[action=back]': {
				tap:'onBackFromStyleView'
			},
			'stylecompare dataview': {
				itemdoubletap:'onItemSelectFromStyleCompare'
			},


			'facelayout':{

				activate:'onActivateFaceLayout',
				pinchstart:'onPinchStart',
				pinchend:'onPinchEnd',
				pinch:'onPinch',
				rotate:'onRotate',
				doubletap:'onDoubleTap'
			},
			'facelayout dataview':{
				itemsingletap:'onItemSelectFromFaceEdit'
			},
			
			'collectionmain button[action=backtolayout]':{
				tap:'backToLayout'
			},
			'#packicon':{
				itemsingletap:'onItemTapFromPackIcon'
			},
			'#faceitemicon':{
				itemsingletap:'onItemTapFromFaceItem'
			}			
		}
	},
	onItemTapFromFaceItem:function(cmp,index,target,record) {
		this.selectFaceItem(record);
		this.backToLayout();
	},
	onItemTapFromPackIcon:function(cmp,index,target,record) {
		var faceitemstore = Ext.getStore('FaceItems');
		var extraParams = {packname:record.get('name'), packtype:record.get('type')};
		faceitemstore.removeAll();
		faceitemstore.getProxy().setExtraParams(extraParams);
		faceitemstore.load();
	},
	backToLayout:function() {
		var me = this;
		me.getMain().setActiveItem(me.getFaceLayout());
	},
	viewCollection:function() {
		var me = this;
		me.getMain().setActiveItem(me.getCollectionMain());
	},
	onLayoutMenu:function() {
		var me = this;
		var actionSheet = Ext.create('Ext.ActionSheet', {
	    items: [
		        {
		            text: 'Save Style',
		            ui:'confirm',
		            handler:function(){
		            	actionSheet.hide();
		            	Ext.Viewport.remove(actionSheet);
		            	actionSheet.destroy();	
		            	me.onSaveFaceLayout();	            	
		            }
		        },
		        {
		            text: 'Take Face',
		            handler:function(){
		            	actionSheet.hide();
		            	Ext.Viewport.remove(actionSheet);
		            	actionSheet.destroy();
		            	me.loadFaceFromCamera();
		            	//me.getMain().setActiveItem(controller.getFaceList());
		            }
		        },
		        {
		            text: 'Load Face',
		            handler:function(){
		            	actionSheet.hide();
		            	Ext.Viewport.remove(actionSheet);
		            	actionSheet.destroy();
		            	me.loadFaceFromLibrary();
		            }
		        },
		        {
		            text: 'Close',
		            ui:'decline',
		            handler:function(){
		            	actionSheet.hide();
		            	Ext.Viewport.remove(actionSheet);
		            	actionSheet.destroy();
		            }
		        }
		    ]
		});
		
		Ext.Viewport.add(actionSheet);
		actionSheet.show();		  	
	},
	loadFaceFromCamera:function() {
		var me = this;
		capturePhotoFile(function(fileUri) {
			me.selectFace(fileUri);
		},function(message){console.log(message)});
	},
	loadFaceFromLibrary:function() {

		var me = this;
		getPhotoFile(function(fileUri) {
			me.selectFace(fileUri);
		},function(message){console.log(message)});
	},
	
	
	onOrientationChange:function(cmp, newOrientation, width, height, eOpts ) {

        	if (newOrientation=='landscape')	
        		Ext.Viewport.setActiveItem(1);
        	else
        		Ext.Viewport.setActiveItem(0);
	},
	onBuy:function() {
		window.open('http://hatson.co.kr/shop/shopdetail.html?branduid=112482');
	},
	onMenuToHome:function() {
		this.getMain().setActiveItem(this.getFaceHome());		
	},
	onSaveFaceLayout:function() {
		var me = this;
		var record = this.getSelectedItem();
		var stage = this.getStage();
		me.setFaceEditMode('face', me);
		
		if (Ext.Viewport.getMasked() == null)
			Ext.Viewport.setMasked({xtype:'loadmask'});
		else
			Ext.Viewport.mask();
		
		stage.toDataURL({callback:function(dataUrl) {
		
			var store = Ext.getStore('Style');
			var newRecord = Ext.create('FaceShop.model.Style', 
				{ style:dataUrl, 
					thumb:record.get('thumb'), 
					faceitemid:record.get('id'), 
					faceimg:me.getFaceImgSrc(), 
					itemimg:me.getItemImgSrc(), 
					stage:stage.toJSON()}
			);
			
			store.add(newRecord);
			Ext.Viewport.unmask();
			//store.sync();
			me.getMain().setActiveItem(me.getStyleList());}
		});
		
	},
	onBackFromFaceList:function() {
		this.getMain().setActiveItem(this.getFaceLayout())
	},
	onBackFromStyleList:function() {
		this.getMain().setActiveItem(this.getFaceLayout())
	},
	onBackFromStyleView:function() {
		this.getMain().setActiveItem(this.getStyleList());
	},
	onBackFromFaceLayout:function() {
		this.getMain().setActiveItem(this.getFaceHome());
	},
	onMenuTakePhoto:function() {
		this.getMain().setActiveItem(this.getFaceLayout());
	},
	onMenuSelectPhoto:function() {
		this.getMain().setActiveItem(this.getFaceLayout());
	},
	onMenuSelectStyle:function() {
		this.getMain().setActiveItem(this.getStyleList());
	},
	onDoubleTap:function(e, el, obj) {
		var face = this.getFace();
		var faceGroup = this.getFaceGroup();
		var rect = this.getDefaultRect(face.getImage());
		face.setScale(1);
		//face.setSize(rect.destWidth,rect.destHeight);
		faceGroup.setX(rect.destX);
		faceGroup.setY(rect.destY);
		faceGroup.setSize(rect.destWidth,rect.destHeight);
		this.getStage().draw();
	},
	onPinchEnd:function (e, el, obj) {

	},
	onPinchStart:function (e, el, obj) {

	},
	onPinch:function (e, el, obj) {
		var facegroup = this.getFaceGroup();
		if (facegroup.getDraggable() == true) {
			//alert('aa');
			var scale = facegroup.getScale().x;
			
			scale = scale*(1+ (e.scale-1)/10);
			console.log('scale:'+e.scale);
			facegroup.setScale(scale);
			facegroup.getLayer().draw();
		}

		var faceitemgroup = this.getFaceItemGroup();
		if (faceitemgroup.getDraggable() == true) {
			//alert('aa');
			var scale = faceitemgroup.getScale().x;
			scale = scale*(1+ (e.scale-1)/10);
			console.log('scale:'+e.scale);
			faceitemgroup.setScale(scale);
			faceitemgroup.getLayer().draw();
		}

		/* not applicable to faceitem
		if (this.getFaceItemGroup().getDraggable() == true) {
			
			//Ext.getDom('viewcollection').innerText=e.angle;
			this.setFaceItemTransFormScale(e.scale);
			this.transformFaceItem();
		}
		*/
	},
	transformFaceItem:function() {
		var scale = this.getFaceItemTransFormScale();
		var angle = this.getFaceItemTransFormAngle();
		var faceItem = this.getFaceItem();
		faceItem.setScale(scale);//, e.scale);
		faceItem.rotateDeg(angle);

		var anchors = this.getAnchors();
		for (var i=0; i<anchors.length; i++) {
		
			anchors[i].rotateDeg(angle);
		}
		/*
		Ext.Array.forEach(this.getAnchors(), function(anchor) {
						
			anchor.rotateDeg(angle);
		});
		*/
		//this.updateAnchorPosition(this.getFaceItemGroup());
		this.getStage().draw();
	},
	onRotate:function (e, el, obj) {
		var fig = this.getFaceItemGroup();
		if (fig.getDraggable() == true) {
			var angle = parseInt(e.angle/50);
			fig.rotateDeg(angle);
			fig.getLayer().draw();
			//this.setFaceItemTransFormAngle(angle);
			//this.transformFaceItem();
			

		}
	},
	onActivateFaceLayout:function(cmp) {
		if (this.getStage() != null) return;
		
		var me = this;
		var callback = null;
		var selectedStyle = me.getSelectedStyle();
		
		if (selectedStyle == null) {
			var store = Ext.getStore('FaceItems');
			var record = store.getAt(0);
			me.setSelectedItem(record);
			
			me.setItemImgSrc(record.getBestStyleIcon());
			me.setFaceImgSrc("resources/images/man/iu1.png");
			
			callback = function(images) {
				me.initStage(images);
			}				
		} else {
			me.setItemImgSrc(selectedStyle.itemimg);
			me.setFaceImgSrc(selectedStyle.faceimg);
			
			callback = function(images) {
				me.loadStyle(images, selctedStyle.style);
			}				
						
		}
		var sources = {
		  item: me.getItemImgSrc(),
		  face: me.getFaceImgSrc()
		};
		
		me.loadImages(sources, callback);
	},
	onItemSelectFromStyleCompare:function(dataview,  index,  target, record){
		var view = this.getStyleView();
		view.setData(record.getData());
		this.getMain().setActiveItem(view);
		Ext.Viewport.setActiveItem(0);		
	},
	onItemSelectFromStyleList:function(dataview,  index,  target, record){
		var view = this.getStyleView();
		view.setData(record.getData());
		this.getMain().setActiveItem(view);
    },
    onEditStyle:function() {
    	var me = this;
    	var view = this.getStyleView();
		var data = view.getData();
		me.setSelectedStyle(data);
		me.getMain().setActiveItem(me.getFaceLayout());	
    } ,
	onItemSelectFromFaceList:function(dataview,  index,  target, record){
		this.selectFace(record.get('face'));
		this.onBackFromFaceList();
    }, 
	onItemSelectFromFaceEdit:function (dataview,  index,  target, record){
		this.selectFaceItem(record);
    }, 
    selectFace:function(imgFace) {
 		var me = this;

		var img = new Image();
		img.onload = function() {
			me.getFace().setImage(img);
			me.getStage().draw();
		}
		img.src = imgFace;    	
    },  
    selectFaceItem:function(record) {
		var me = this;
    	this.setSelectedItem(record);
    	
		var src = record.getBestStyleIcon();
		var img = new Image();
		
		img.onload = function() {
			me.getFaceItem().setImage(img);
			me.getStage().draw();
		}
		me.loadImgByJsonP(src, function(result) {
				img.src = 'data:image/png;base64,'+result.img;
			}, function() {
				
		});		
    },  
	loadImages:function (sources, callback) {
		var me = this;
	    var images = {};
	    var loadedImages = 0;
	    var numImages = 0;
	    for(var src in sources) {
	      numImages++;
	    }
	    

	    for(var src in sources) {
	      images[src] = new Image();
	      images[src].onload = function() {
	        if(++loadedImages >= numImages) {
	          //callback(images);
	          //FaceShop.app.getController('Main').initStage(images);
	          callback(images);
	        }
	      };
	      if (src == 'item') {
	      		var img = images[src];
	      		me.loadImgByJsonP(sources[src], function(result) {
		      		img.src = 'data:image/png;base64,'+result.img;
		      	},
		      	function(result) {
		      		images[src].src = '';
		      	}
	      	) 
	      } else {
	      		images[src].src = sources[src];		
	      }
	      
	    }
	},
	loadImgByJsonP:function(src, callbackScuccess, callbackFail) {
		Ext.data.JsonP.request({
            url: src,
            callbackKey: 'callback',         
            method:'POST',
            success: function(result, request) {  
                callbackScuccess(result);
            },
            failure: function(response) {
	        	callbackFail();
		    }
        });				
	},
	
	getDefaultRect:function(img) {
		//debugger;
		//var container = Ext.DomQuery.select('#facecontainer')[0];
		//var container = Ext.ComponentQuery.query('facelayout')[0].element.dom;
		//d.element.dom.offsetHeight
    	var stageRect = {width:window.innerWidth,height:window.innerHeight};
    	//alert(window.innerHeight);
    	//var stageRect = {width:container.offsetParent.offsetWidth, height:container.offsetParent.offsetHeight};
		
		var rect={srcX:0, srcY:0, srcWidth:0, srcHeight:0, destX:0, destY:0, destWidth:0, destHeight:0, ratioWidth:0, ratioHeight:0}
		rect.srcWidth = img.width;
		rect.srcHeight = img.height;
		
		rect.destWidth = stageRect.width;
		rect.destHeight = stageRect.height;
						
		rect.ratioWidth = rect.srcWidth/rect.destWidth;
		rect.ratioHeight = rect.srcHeight/rect.destHeight;
	
		if (rect.ratioWidth > rect.ratioHeight) {
			rect.destHeight = rect.srcHeight/rect.ratioWidth;
		} else {
			rect.destWidth = rect.srcWidth/rect.ratioHeight;
		}
	
		rect.srcX = 0;
		rect.srcY = 0;	
		rect.destX = (stageRect.width - rect.destWidth)/2;
		rect.destY = (stageRect.height - rect.destHeight)/2;
		
		//alert(rect.destHeight);
		return rect;
				
	},  
    initStage:function(images) {
    		var controller =this;
		var container = Ext.DomQuery.select('#facecontainer')[0];
    	var stageRect = {width:container.offsetWidth, height:container.offsetHeight};
 
		var stage = new Kinetic.Stage({
		    container: 'facecontainer',//container.id,
		    width: stageRect.width,
		    height: stageRect.height,
		});
			
		var layer = new Kinetic.Layer();

		var faceImg = images.face;
		var itemImg = images.item;
		
		var rect = this.getDefaultRect(faceImg);
	
		var itemImgK = new Kinetic.Image({
		  x: 0,
		  y: 0,
		  id:"itemImg",
		  image: itemImg,
		  width: 230,
		  height: 184,
		  name: "image",
		  offset:[115, 92],  
		});
		
		this.setFaceItem(itemImgK);
		
		
		var itemGroup = new Kinetic.Group({
			id:"itemGroup",
			x: rect.destX+rect.destWidth/2 -50,
			y: rect.destY+rect.destHeight/2 - 100,
			draggable: false
		});
		var faceGroup = new Kinetic.Group({
			id:"faceGroup",
			x: rect.destX,
			y: rect.destY,
			draggable: false,
			offset:[rect.destWidth/2, rect.destHeight/2]
		});
		
		var faceImgK = new Kinetic.Image({
		  x: 0,
		  y: 0,
		  id:"faceImg",
		  image: faceImg,
		  width: rect.destWidth,
		  height: rect.destHeight,
		  name: "image",
		  //draggable:true,
		});					
				              
		this.setFace(faceImgK);
		this.setFaceGroup(faceGroup);
		this.setFaceItemGroup(itemGroup);
		
		itemGroup.on("mousedown tap", function() {
			controller.setFaceEditMode('item', controller);
		});
		faceGroup.on("mousedown tap", function() {
				controller.setFaceEditMode('face', controller);
	    });
	    						

		stage.add(layer);

		layer.add(faceGroup);
		layer.add(itemGroup);

		faceGroup.add(faceImgK);
		itemGroup.add(itemImgK);	
		
		this.setStage(stage);
		
		//debugger;
        this.addAnchor(itemGroup, 0, 0, "topLeft");
        this.addAnchor(itemGroup, 0, 0, "topRight");
        this.addAnchor(itemGroup, 0, 0, "bottomLeft");		
        this.addAnchor(itemGroup, 0, 0, "bottomRight");
        var star = this.addAnchor(itemGroup, 0, 0, "center");		
        
 		stage.on("mouseup touchend", function(){
 				console.log("mouseup touchend");
                star.controlled = false;
            }, false);
 
            stage.on("mouseout", function(){
                star.controlled = false;
                console.log("mouseout");
            }, false);
 
            stage.on("drag touchmove", function(evt, a, b){
            	//debugger;
            	console.log("touchmove",evt.pageX,evt.pageY );
                if (star.controlled) {
                	//debugger;
                    var mousePos = stage.getMousePosition();
                    var ptcenter = {x:(itemGroup.attrs.x+itemImgK.getWidth())/2, y:(itemGroup.attrs.y+itemImgK.getHeight())/2};
                    
                    var x,y;
                    if (!mousePos.x) {
                    	mousePos = {x:evt.pageX, y:evt.pageY};
                    }
                	x = ptcenter.x - mousePos.x;
                	y = ptcenter.y - mousePos.y;

                    star.rotation = 0.5 * Math.PI + Math.atan(y / x);
                    var angle = star.rotation*180/Math.PI;
                    angle = angle*0.05;
 
                    if (mousePos.x <= ptcenter.x){
                        angle *= -1;//star.rotation += Math.PI;
                    }
                    itemGroup.rotateDeg(angle);
                    console.log(angle);
                    itemGroup.getLayer().draw();
                }
                
            }, false);       

        this.updateAnchorPosition(itemGroup); //update....position	

				
		itemGroup.moveToTop();		
		stage.draw();	
   	  },
   	  setFaceEditMode:function(mode, controller) {		//
   	  	var face =controller.getFace();
   	  	var faceItem = controller.getFaceItem();
   	  	var faceGroup =controller.getFaceGroup();
   	  	var faceItemGroup = controller.getFaceItemGroup();
   	  	if (mode == 'item') {
     		controller.showAnchor(true);	
   	  		// clear face masking...
   	  		faceGroup.setOpacity(0.7);
			faceGroup.setDraggable(false);
			faceItemGroup.setDraggable(true);
			// hide item selection box
     		faceItem.setStroke('#00F');
     		faceItem.setStrokeWidth(1);
     		faceItem.getLayer().draw();		
		} else {
     		controller.showAnchor(false);		
   	  		// face group unmasking...
   	  		faceGroup.setOpacity(1);
			faceGroup.setDraggable(true);
			faceItemGroup.setDraggable(false);
			// show item selection box
     		faceItem.setStroke(null);
     		faceItem.setStrokeWidth(0);
     		faceItem.getLayer().draw();	
   	  	}
   	  },
   	  updateAnchorPosition:function(group) {
   	  	
        var topLeft = group.get(".topLeft")[0];
        var topRight = group.get(".topRight")[0];
        var bottomRight = group.get(".bottomRight")[0];
        var bottomRight2 = group.get(".bottomRight2")[0];
        var bottomLeft = group.get(".bottomLeft")[0];

        var center = group.get(".center")[0];
        var guideline = group.get(".guideline")[0];

        var image = group.get(".image")[0];
        var offset = {x:0,y:0};//image.getOffset();
        var rect = {left:image.getX()-offset.x, 
        				top:image.getY()-offset.y, 
        				right:image.getX()+image.getWidth()*image.getScale().x-offset.x, 
        				bottom:image.getY()+image.getHeight()*image.getScale().y-offset.y};
        
        topLeft.attrs.x = rect.left;
        bottomLeft.attrs.x = rect.left;
        
        topLeft.attrs.y = rect.top;
        topRight.attrs.y = rect.top;
        
        topRight.attrs.x = rect.right;
        bottomRight.attrs.x = rect.right;

        bottomLeft.attrs.y = rect.bottom;
        bottomRight.attrs.y = rect.bottom;
        
        center.attrs.x = (topLeft.attrs.x+topRight.attrs.x)/2;
		center.attrs.y = (topLeft.attrs.y+bottomRight.attrs.y)/2;        
   	  },  	  
   	  updateGuideLine:function(points) {
   	  	var guideLine = this.getRotateGuideLine();
   	  	guideLine.setPoints(points);
   	  	guideLine.show();
   	  },
      update:function(group, activeAnchor) {
        var topLeft = group.get(".topLeft")[0];
        var topRight = group.get(".topRight")[0];
        var bottomRight = group.get(".bottomRight")[0];
        var bottomRight2 = group.get(".bottomRight2")[0];
        var bottomLeft = group.get(".bottomLeft")[0];
        var center = group.get(".center")[0];
        var guideLine = group.get(".guideline")[0];
        var image = group.get(".image")[0];
		
        // update anchor positions
        switch (activeAnchor.getName()) {
          case "topLeft":
            topRight.attrs.y = activeAnchor.attrs.y;
            bottomLeft.attrs.x = activeAnchor.attrs.x;
	        center.attrs.x = (topLeft.attrs.x+topRight.attrs.x)/2;
			center.attrs.y = (topLeft.attrs.y+bottomRight.attrs.y)/2;                    
			break;
          case "topRight":
            topLeft.attrs.y = activeAnchor.attrs.y;
            bottomRight.attrs.x = activeAnchor.attrs.x;
	        center.attrs.x = (topLeft.attrs.x+topRight.attrs.x)/2;
			center.attrs.y = (topLeft.attrs.y+bottomRight.attrs.y)/2;                    
			break;
          case "bottomRight":
            bottomLeft.attrs.y = activeAnchor.attrs.y;
            topRight.attrs.x = activeAnchor.attrs.x;
	        center.attrs.x = (topLeft.attrs.x+topRight.attrs.x)/2;
			center.attrs.y = (topLeft.attrs.y+bottomRight.attrs.y)/2;                    
			break;            
            /*
            {
            var o = {x:(topLeft.attrs.x+topRight.attrs.x)/2, y:(topLeft.attrs.y+bottomLeft.attrs.y)/2};
           	var a = {x:topRight.attrs.x, y:bottomLeft.attrs.y};
	        var b=  {x:bottomRight2.attrs.x, y:bottomRight2.attrs.y};
	        var oa = Math.sqrt(Math.pow(o.x-a.x,2)+Math.pow(o.y-a.y,2));
	        var ob = Math.sqrt(Math.pow(o.x-b.x,2)+Math.pow(o.y-b.y,2));
	        var ab = Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2));
	        var angle =  Math.acos((Math.pow(oa,2)+Math.pow(ob,2)-Math.pow(ab,2)) / (2*oa*ob));
	        angle = a.x<b.x?angle*-1:angle;
	        
	        angle = angle*180/Math.PI+this.getFaceItemTransFormAngle();
	        this.setFaceItemTransFormAngle(angle);
	        
	        console.log("Angle:" + this.getFaceItemTransFormAngle());
	        //group.rotateDeg(this.getFaceItemTransFormAngle());
			//group.rotateDeg(angle);
			group.getLayer().draw();
            }
            */
          case "bottomLeft":
            bottomRight.attrs.y = activeAnchor.attrs.y;
            topLeft.attrs.x = activeAnchor.attrs.x;
 	        center.attrs.x = (topLeft.attrs.x+topRight.attrs.x)/2;
			center.attrs.y = (topLeft.attrs.y+bottomRight.attrs.y)/2;                    
			break;
        }
      
        image.setPosition(topLeft.attrs.x, topLeft.attrs.y);

        var width = topRight.attrs.x - topLeft.attrs.x;
        var height = bottomLeft.attrs.y - topLeft.attrs.y;
        if(width && height) {
          image.setSize(width, height);
        }
      },
      showAnchor:function(visible) {
      	var anchors = this.getAnchors();
      	var count =  anchors.length;
      	for (var i=0; i<count; i++) {
      		if (visible)
      			anchors[i].show();
      		else
      			anchors[i].hide();
      	}
      },
      addAnchor:function (group, x, y, name) {
      	var controller = this;
        var stage = group.getStage();
        var layer = group.getLayer();
        var image = group.get(".image")[0];
        
        var imageOffset = image.getOffset();
        var anchor = new Kinetic.Circle({
			x: x,
			y: y,
			offset:imageOffset,
			stroke: "#00F",
			fill:name=='center'?'#0F0':"#333",
			opacity:0.5,
			strokeWidth: 1,
			radius: 20,
			name: name,
			visible:false,
			draggable: name=='center'?false:true
			});
      
        if (name != "center") {
	        anchor.on("dragmove", function() {
	        	//<debug>
	        	//console.log("anchor dragmove")
	        	//</debug>
	          	controller.update(group, this);
	          	layer.draw();
	        });
	        anchor.on("mousedown touchstart", function() {
	        	//console.log("anchor touchstart")
		          group.setDraggable(false);
	         	//this.moveToTop();
	        });
	        anchor.on("dragend", function(cmp) {
	            //console.log("anchor dragend")
		      	group.setDraggable(true);
		      	controller.updateAnchorPosition(group);
	          	layer.draw();
	        });
        } else {
	       	anchor.on("mousedown touchstart", function(evt){
	       			group.setDraggable(false);
	                this.angularVelocity = 0;
	                this.controlled = true;
	            });
	        }


		this.getAnchors().push(anchor);
        group.add(anchor);
        
        return anchor;
      },
 
      loadStyle:function(images, style) {
      	var node = Ext.select('#facecontainer > div');
      	if (node.elements.length == 1) {
      		node.removeElement(0,true);	// delete node from dom 
      	}
     
      	var defaultStyle = '{"attrs":{"width":1126,"height":517,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false},"nodeType":"Stage","children":[{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"visible":true,"listening":true,"opacity":0.7,"x":364.3046776232617,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"id":"faceGroup"},"nodeType":"Group","children":[{"attrs":{"visible":true,"listening":true,"name":"image","opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"id":"faceImg","width":397.3906447534766,"height":517},"nodeType":"Shape","shapeType":"Image"}]},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":513,"y":158.5,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":true,"id":"itemGroup"},"nodeType":"Group","children":[{"attrs":{"visible":true,"listening":true,"name":"image","opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":115,"y":92},"draggable":false,"id":"itemImg","width":230,"height":184,"stroke":"#00F","strokeWidth":1},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"radius":12,"visible":true,"listening":true,"name":"topLeft","opacity":0.5,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":115,"y":92},"draggable":true,"stroke":"#00F","fill":"#333","strokeWidth":1},"nodeType":"Shape","shapeType":"Circle"},{"attrs":{"radius":12,"visible":true,"listening":true,"name":"topRight","opacity":0.5,"x":230,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":115,"y":92},"draggable":true,"stroke":"#00F","fill":"#333","strokeWidth":1},"nodeType":"Shape","shapeType":"Circle"},{"attrs":{"radius":12,"visible":true,"listening":true,"name":"bottomRight","opacity":0.5,"x":230,"y":184,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":115,"y":92},"draggable":true,"stroke":"#00F","fill":"#333","strokeWidth":1},"nodeType":"Shape","shapeType":"Circle"},{"attrs":{"radius":12,"visible":true,"listening":true,"name":"bottomLeft","opacity":0.5,"x":0,"y":184,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":115,"y":92},"draggable":true,"stroke":"#00F","fill":"#333","strokeWidth":1},"nodeType":"Shape","shapeType":"Circle"}]}]}]}';
    	
    	var me =this;
		var container = Ext.DomQuery.select('#facecontainer')[0];
		
		var stage = Kinetic.Node.create(style==null?defaultStyle:style, 'facecontainer');
		
		anchors:[],	
		me.setFaceItem(stage.get('#itemImg')[0]);
		me.setFace(stage.get('#faceImg')[0]);
		me.setFaceItemGroup(stage.get('#itemGroup')[0]);
		me.setFaceGroup(stage.get('#faceGroup')[0]);
		me.setFaceItemGroup(stage.get('#faceItemGroup')[0]);
		me.setStage(stage);
		
		stage.get('#faceImg').apply('setImage', images.face);
		stage.get('#itemImg').apply('setImage', images.item);
		stage.draw();   
		
	}
});