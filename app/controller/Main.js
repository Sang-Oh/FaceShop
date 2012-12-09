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
		faceItemTransFormScale:0,
		
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
			'styleview button[action=back]': {
				tap:'onBackFromStyleView'
			},
			'stylecompare dataview': {
				itemdoubletap:'onItemSelectFromStyleCompare'
			},


			'facelayout':{
				viewcollection:'viewCollection',
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
			
			'collectionpack button[action=backtolayout]':{
				tap:'backToLayout'
			}
		}
	},
	backToLayout:function() {
		me.getMain().setActiveItem(me.getLayout());
	},
	viewCollection:function() {
		var me = this;
		me.getMain().setActiveItem(me.getCollectionMain());
	},
	onLayoutMenu:function() {
		var controller = this;
		var actionSheet = Ext.create('Ext.ActionSheet', {
	    items: [
		        {
		            text: 'Save Style',
		            ui:'confirm',
		            handler:function(){
		            	actionSheet.hide();
		            	Ext.Viewport.remove(actionSheet);
		            	actionSheet.destroy();	
		            	controller.onSaveFaceLayout();	            	
		            }
		        },
		        {
		            text: 'Load Face',
		            handler:function(){
		            	actionSheet.hide();
		            	Ext.Viewport.remove(actionSheet);
		            	actionSheet.destroy();
		            	controller.getMain().setActiveItem(controller.getFaceList());
		            }
		        },
		        {
		            text: 'Upload Facebook',
		            handler:function(){
		            	actionSheet.hide();
		            	Ext.Viewport.remove(actionSheet);
		            	actionSheet.destroy();
		            }
		        },
		        {
		            text: 'Close',
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
		if (Ext.Viewport.getMasked() == null)
			Ext.Viewport.setMasked({xtype:'loadmask'});
		else
			Ext.Viewport.mask();
		
		
		var controller = this;
		var record = this.getSelectedItem();
		//this.showAnchor(false);
		
		this.getStage().toDataURL({callback:function(dataUrl) {
		
			var store = Ext.getStore('Style');
			var newRecord = Ext.create('FaceShop.model.Style', 
			{style:dataUrl, thumb:record.get('thumb'), item:record.get('item'), shop:record.get('shop'), model:record.get('model'), layout:''})	;
			store.add(newRecord);
			Ext.Viewport.unmask();
			//store.sync();
			controller.getMain().setActiveItem(controller.getStyleList());}
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
		if (this.getFaceGroup().getDraggable() == true) {
			//alert('aa');
			this.getFaceGroup().setScale(e.scale);//, e.scale);
			this.getFaceGroup().getLayer().draw();
		}
		if (this.getFaceItemGroup().getDraggable() == true) {
			
			//Ext.getDom('viewcollection').innerText=e.angle;
			this.setFaceItemTransFormScale(e.scale);
			this.transformFaceItem();
		}
	},
	transformFaceItem:function() {
		var scale = this.getFaceItemTransFormScale();
		var angle = this.getFaceItemTransFormAngle();
		var faceItem = this.getFaceItem();
		faceItem.setScale(scale);//, e.scale);
		faceItem.rotateDeg(angle);

		Ext.Array.forEach(this.getAnchors(), function(anchor) {
			anchor.rotateDeg(angle);
		});

		this.updateAnchorPosition(this.getFaceItemGroup());
		this.getStage().draw();
	},
	onRotate:function (e, el, obj) {
		if (this.getFaceItemGroup().getDraggable() == true) {
			Ext.getDom('viewcollection').innerText=e.angle;
			this.setFaceItemTransFormAngle(e.angle);
			this.transformFaceItem();
			

		}
	},

	onActivateFaceLayout:function(cmp) {
		if (this.getStage() != null) return;

		var controller = this;
		var store = Ext.getStore('FaceItems');
		var record = store.getAt(0);
		controller.setSelectedItem(record);

		var sources = {
		  item: record.getBestStyleIcon(),
		  face: "resources/images/man/iu1.png"
		};
		var callback = function(images) {
			controller.initStage(images);
		}
		controller.loadImages(sources, null);
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
	onItemSelectFromFaceList:function(dataview,  index,  target, record){
		this.selectFace(record);
		this.onBackFromFaceList();
    }, 
	onItemSelectFromFaceEdit:function (dataview,  index,  target, record){
		this.selectItem(record);
    }, 
    selectFace:function(record) {
 		var controller = this;
		var src = record.get('face');
		var img = new Image();
		img.onload = function() {
			controller.getFace().setImage(img);
			controller.getStage().draw();
		}
		img.src = src;    	
    },  
    selectItem:function(record) {
    	this.setSelectedItem(record);
    	
		var controller = this;
		var src = record.getBestThumbIcon();
		var img = new Image();
		img.onload = function() {
			controller.getFaceItem().setImage(img);
			controller.getStage().draw();
		}
		img.src = src;    	
    },  
	loadImages:function (sources, callback) {
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
	          FaceShop.app.getController('Main').initStage(images);
	        }
	      };
	      images[src].src = sources[src];
	    }
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
		  image: itemImg,
		  width: 230,
		  height: 184,
		  name: "image",
		  offset:[115, 92],  
		});
		
		this.setFaceItem(itemImgK);
	
		var itemGroup = new Kinetic.Group({
			x: rect.destX+rect.destWidth/2 -50,
			y: rect.destY+rect.destHeight/2 - 100,
			draggable: false
		});
		var faceGroup = new Kinetic.Group({
			x: rect.destX,
			y: rect.destY,
			draggable: false
		});
		
		var faceImgK = new Kinetic.Image({
		  x: 0,
		  y: 0,
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
			/*
			controller.showAnchor(true);
	      	if (controller.getIsSelectedFace() == false) {
	     		controller.setIsSelectedFaceItem(true);
	     		itemImgK.setStroke('#00F');
	     		itemImgK.setStrokeWidth(1);
	     		itemImgK.getLayer().draw();
	     		itemGroup.setDraggable(true);
	     	}
	     	else {
	     		console.log('aaa');
	     		faceGroup.setDraggable(false);
	     		controller.setIsSelectedFace(false);
	     	}
	     	*/
		});
		faceGroup.on("mousedown tap", function() {
		
				controller.setFaceEditMode('face', controller);
			/*
	      	controller.showAnchor(false);
	      	if (controller.getIsSelectedFaceItem() == false) {
	     		controller.setIsSelectedFace(true);
	     		Ext.Function.defer(function(){
				    					faceGroup.setDraggable(true);
									}, 1000);
	     		
	     	}
	     	else {
	     		itemImgK.setStroke(null);
	     		itemImgK.setStrokeWidth(0);
	     		itemImgK.getLayer().draw();
	     		itemGroup.setDraggable(false);
	     		controller.setIsSelectedFaceItem(false);
	     	}
	     	*/	
			
	    });
	    						
		faceGroup.on("dragstart", function() {
	     // this.moveToTop();
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
        this.addAnchor(itemGroup, 0, 0, "bottomRight");
        this.addAnchor(itemGroup, 0, 0, "bottomLeft");		
        this.updateAnchorPosition(itemGroup); //update....position	

		//layer.add(faceImg);
		//layer.add(itemImg);
				
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
        var bottomLeft = group.get(".bottomLeft")[0];
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
		
		
		   	  	
   	  } ,  	  
      update:function(group, activeAnchor) {
        var topLeft = group.get(".topLeft")[0];
        var topRight = group.get(".topRight")[0];
        var bottomRight = group.get(".bottomRight")[0];
        var bottomLeft = group.get(".bottomLeft")[0];
        var image = group.get(".image")[0];

        // update anchor positions
        switch (activeAnchor.getName()) {
          case "topLeft":
            topRight.attrs.y = activeAnchor.attrs.y;
            bottomLeft.attrs.x = activeAnchor.attrs.x;
            break;
          case "topRight":
            topLeft.attrs.y = activeAnchor.attrs.y;
            bottomRight.attrs.x = activeAnchor.attrs.x;
            break;
          case "bottomRight":
            bottomLeft.attrs.y = activeAnchor.attrs.y;
            topRight.attrs.x = activeAnchor.attrs.x;
            break;
          case "bottomLeft":
            bottomRight.attrs.y = activeAnchor.attrs.y;
            topLeft.attrs.x = activeAnchor.attrs.x;
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
        
        var anchor = new Kinetic.Circle({
          x: x,
          y: y,
          offset:image.getOffset(),
          stroke: "#00F",
          fill: "#333",
          opacity:0.5,
          strokeWidth: 1,
          radius: 12,
          name: name,
          visible:false,
          draggable: true
        });

        anchor.on("dragmove", function() {
          controller.update(group, this);
          layer.draw();
        });
        anchor.on("mousedown touchstart", function() {
          group.setDraggable(false);
         // this.moveToTop();
        });
        anchor.on("dragend", function() {
          group.setDraggable(true);
          layer.draw();
        });
        /*
        // add hover styling
        anchor.on("mouseover", function() {
          var layer = this.getLayer();
          document.body.style.cursor = "pointer";
          this.setStrokeWidth(4);
          layer.draw();
        });
        anchor.on("mouseout", function() {
          var layer = this.getLayer();
          document.body.style.cursor = "default";
          this.setStrokeWidth(2);
          layer.draw();
        });
        */
		this.getAnchors().push(anchor);
        group.add(anchor);
      }
   
});