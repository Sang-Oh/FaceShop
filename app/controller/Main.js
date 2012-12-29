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
			help:'help',
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
			'button[action=viewhelp]':{
				tap:'viewHelp'
			},
			'help button[action=back]': {
				tap:'onBackFromHelp'
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
				itemsingletap:'onItemSelectFromStyleList',
				activate:'onActivateStyleList'
			},
			'styleview button[action=viewfaceiteminfo]': {
				tap:'onViewFaceItemInfo'
			},
			'styleview button[action=edit]': {
				tap:'onEditStyle'
			},
			'styleview button[action=back]': {
				tap:'onBackFromStyleView'
			},
			'styleview button[action=delete]':{
				tap:'deleteStyleFromView'
			},
			
			'stylecompare dataview': {
				itemdoubletap:'onItemSelectFromStyleCompare',
				activate:'onActivateStyleCompareDataView'
			},
			'facelayout':{

				activate:'onActivateFaceLayout',
				pinchstart:'onPinchStart',
				pinchend:'onPinchEnd',
				pinch:'onPinch',
				//rotate:'onRotate',
				doubletap:'onDoubleTap'
			},
			'#faceitemlist':{
				itemsingletap:'onItemSelectFromFaceLayoutItemList'
			},
			'#faceitemsublist':{
				itemsingletap:'onItemSelectFromFaceLayoutItemSubList'
			},
			
			'collectionmain button[action=backtolayout]':{
				tap:'backToLayout'
			},
			'packicon':{
				itemsingletap:'onItemTapFromPackIcon'
			},
			'#faceitemicon':{
				itemsingletap:'onItemTapFromFaceItem'
			}			
		}
	},
	viewHelp:function() {
		var me = this;
		me.getMain().setActiveItem(me.getHelp());
	},
	onBackFromHelp:function() {
		var me = this;
		me.getMain().setActiveItem(me.getFaceHome())
	},
	deleteStyleFromView:function() {
		var me = this;
		var styleView = me.getStyleView();
		var store = Ext.getStore('Styles');
		var record = store.getById(styleView.getData()['id']);
		me.deleteStyle(record);
		me.onBackFromStyleView();
	},
	deleteStyle:function(record) {
		Ext.getStore('Styles').remove(record);
		record.erase();
	},
	onActivateStyleList:function(cmp) {
		cmp.setStore(Ext.getStore('Styles'));
	},
	onActivateStyleCompareDataView:function(cmp) {
		cmp.setStore(Ext.getStore('Styles'));
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
		var store= Ext.getStore('FaceItems');
		if (store.getCount() == 0) return;
				
		var size = Ext.Viewport.getSize();
		me.setSelectedStyle(null);
	
		if (pictureSource) {
			capturePhotoFile(function(fileUri) {
				console.log(fileUri);
				me.setFaceImgSrc(fileUri);
				me.getMain().setActiveItem(me.getFaceLayout());
			},function(message){console.log(message)
			}, size);
		} else {
			if (me.getFaceImgSrc() == "resources/images/man/iu1.png")
				me.setFaceImgSrc("resources/images/man/iu2.png");	
			else
				me.setFaceImgSrc("resources/images/man/iu1.png");	
				
			me.getMain().setActiveItem(me.getFaceLayout());
		}

	},
	loadFaceFromLibrary:function() {
		var me = this;
		var store= Ext.getStore('FaceItems');
		if (store.getCount() == 0) return;
				
		
		var size = Ext.Viewport.getSize();
		me.setSelectedStyle(null);
		if (pictureSource) {
			getPhotoFile(function(fileUri) {
				console.log(fileUri);
				me.setFaceImgSrc(fileUri);
				me.getMain().setActiveItem(me.getFaceLayout());
			},function(message){console.log(message)
			}, size);
		} else {
			me.setFaceImgSrc("resources/images/man/iu1.png");	
			me.getMain().setActiveItem(me.getFaceLayout());
		}		
	},
	
	
	onOrientationChange:function(cmp, newOrientation, width, height, eOpts ) {

        	if (newOrientation=='landscape')	
        		Ext.Viewport.setActiveItem(1);
        	else
        		Ext.Viewport.setActiveItem(0);
	},
	onViewFaceItemInfo:function() {
		var me = this;
		var info = me.getStyleView().getData().info;
		var overlay = 
		Ext.Viewport.add({
            xtype: 'panel',
            modal: true,
            hideOnMaskTap: true,
            showAnimation: {
                type: 'popIn',
                duration: 250,
                easing: 'ease-out'
            },
            hideAnimation: {
                type: 'popOut',
                duration: 250,
                easing: 'ease-out'
            },
            centered: true,
            width: Ext.os.deviceType == 'Phone' ? 260 : 400,
            height: Ext.os.deviceType == 'Phone' ? 220 : 400,
            styleHtmlContent: true,
            cls:'faceiteminfocontainer',
            data:info,
            tpl:[
            '<div style="color:white;">',
            'Model&nbsp;&nbsp;<strong>{model}</strong><br />',
            'Maker&nbsp;&nbsp;<strong>{maker}</strong><br />',
            'Shop&nbsp;&nbsp;<strong>{shop}</strong><br />',
            'Price&nbsp;&nbsp;<strong>{price}</strong><br />',
            '{descript}<br />',
            '</div>'
            ].join(''),
            scrollable: true
        });


    overlay.show();
		
		
	//	window.open('http://hatson.co.kr/shop/shopdetail.html?branduid=112482');
	},
	onMenuToHome:function() {
		this.getMain().setActiveItem(this.getFaceHome());		
	},
	onSaveFaceLayout:function() {
		var me = this;
		var itemrecord = this.getSelectedItem();
		
		var stage = this.getStage();
		me.setFaceEditMode('face', me);
		
		if (Ext.Viewport.getMasked() == null)
			Ext.Viewport.setMasked({xtype:'loadmask', message:'saving...'});
		else {
			Ext.Viewport.getMasked().setMessage('saving...');
			Ext.Viewport.mask();
		}
		stage.toDataURL({callback:function(dataUrl) {
			var store = Ext.getStore('Styles');
			var newRecord=me.getSelectedStyle();
			if (newRecord == null) {
				newRecord = Ext.create('FaceShop.model.Style', 
					{ 	
						style:dataUrl, 
						//thumb:itemrecord.get('thumb'), 
						faceitemid:itemrecord.get('id'), 
						faceimg:me.getFaceImgSrc(), 
						itemimg:me.getItemImgSrc(),
						stage:stage.toJSON()
					}
				);
				store.add(newRecord);
			} else {
				var faceitemid = itemrecord?itemrecord.get('id'):newRecord.get('faceitemid');
				newRecord.set('style', dataUrl);
				newRecord.set('faceitemid', faceitemid);
				newRecord.set('faceimg', me.getFaceImgSrc());
				newRecord.set('itemimg', me.getItemImgSrc());
				newRecord.set('stage', stage.toJSON());
				/*
				newRecord.setData(
					{ 	
						style:dataUrl, 
						//thumb:itemrecord?itemrecord.get('thumb'):newRecord.get('thumb'), 
						faceitemid:faceitemid,
						faceimg:me.getFaceImgSrc(), 
						itemimg:me.getItemImgSrc(),
						stage:stage.toJSON()
					}				
				);
				*/
				
			}
			newRecord.save();
			Ext.Viewport.unmask();
		
			if (me.getSelectedStyle() != null) {	// if edit mode , return to style view
				var view = me.getStyleView();
				view.setData(null);	// for the image update... refresh...
				view.setData(newRecord.getData());				
				me.onBackFromFaceLayout();
			}
			
			//me.getMain().setActiveItem(me.getStyleList()); // always... stay if new layout
			}
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
		var me = this;
		if (me.getSelectedStyle() == null)
			me.getMain().setActiveItem(me.getFaceHome());
		else {
			me.setSelectedStyle(null);
			me.getMain().setActiveItem(me.getStyleView());
		}
		
	},
	onMenuTakePhoto:function() {
		this.loadFaceFromCamera();
		
	},
	onMenuSelectPhoto:function() {
		this.loadFaceFromLibrary();
	},
	onMenuSelectStyle:function() {
		this.getMain().setActiveItem(this.getStyleList());
	},
	onDoubleTap:function(e, el, obj) {
		var me = this;
		me.drawFaceAtDefault();
	},
	
	drawFaceAtDefault:function() {
		var face = this.getFace();
		var stage = this.getStage();
		var faceGroup = this.getFaceGroup();
		var rect = this.getDefaultFaceRect(face.getImage());
		faceGroup.setScale(1);
//		faceGroup.setPosition(rect.destX+rect.destWidth/2, rect.destY+rect.destHeight/2);
		faceGroup.setPosition(0, 0);
		faceGroup.setSize(stage.getSize());
		
		var offset =  {x:rect.destWidth/2, y:rect.destHeight/2};
		face.setX(rect.destX+offset.x);
		face.setY(rect.destY+offset.y);
		face.setOffset(offset);
		face.setSize(rect.destWidth,rect.destHeight);
		
		faceGroup.getLayer().draw();
	},
	
	onPinchEnd:function (e, el, obj) {

	},
	onPinchStart:function (e, el, obj) {
		var facegroup = this.getFaceGroup();
		if (facegroup.getDraggable() == true) {
			facegroup.pinch = true;
		}
	},
	onPinch:function (e, el, obj) {
		var facegroup = this.getFace();
		//if (facegroup.pinch == true) {
			var scale = facegroup.getScale().x;
			
			scale = scale*(1+ (e.scale-1)/10);
			//<debug>
			console.log('scale:'+e.scale);
			//</debug>
			facegroup.setScale(scale);
			facegroup.getLayer().draw();
		//}

		/* not applicable to faceitem
		var faceitemgroup = this.getFaceItemGroup();
		if (faceitemgroup.getDraggable() == true) {
			//alert('aa');
			var scale = faceitemgroup.getScale().x;
			scale = scale*(1+ (e.scale-1)/10);
			console.log('scale:'+e.scale);
			faceitemgroup.setScale(scale);
			faceitemgroup.getLayer().draw();
		}

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
		}
	},
	onActivateFaceLayout:function(cmp) {
		//if (this.getStage() != null) return;
		var me = this;
		var callback = null;
		var selectedStyle = me.getSelectedStyle();

		if (me.getSelectedItem() != null)	// if stage is already built.
			return;
		
		if (Ext.Viewport.getMasked() == null)
			Ext.Viewport.setMasked({xtype:'loadmask', message:'loading...'});
		else {
			Ext.Viewport.getMasked().setMessage('loading...');
			Ext.Viewport.mask();
		}
		if (selectedStyle == null) {
			var store = Ext.getStore('FaceItems');
			var record = store.getAt(0);
			me.setSelectedItem(record);
			
			me.setItemImgSrc(record.getBestStyleIcon());
			
			callback = function(images) {
				me.buildStage(images);
				Ext.Viewport.unmask()
			}				
		} else {
			var styleData = selectedStyle.getData();
			me.setItemImgSrc(styleData.itemimg);
			me.setFaceImgSrc(styleData.faceimg);
			
			callback = function(images) {
				me.loadStage(images, styleData.stage);
				Ext.Viewport.unmask()
			}						
		}
		var sources = {
		  item: me.getItemImgSrc(),
		  face: me.getFaceImgSrc(),
		  rotateicon: "resources/images/rotate.png",
		  resizeicon: "resources/images/resize.png",
		  resizeicon2: "resources/images/resize2.png"
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
		view.setData(null);	// for the image update... refresh...
		view.setData(record.getData());
		this.getMain().setActiveItem(view);
    },
    onEditStyle:function() {
    	var me = this;
    	var view = this.getStyleView();
		var data = view.getData();
		var record = Ext.getStore('Styles').getById(data.id);
		
		me.setSelectedStyle(record);
		me.getMain().setActiveItem(me.getFaceLayout());	
    } ,
	onItemSelectFromFaceList:function(dataview,  index,  target, record){
		this.onBackFromFaceList();
    }, 
	onItemSelectFromFaceLayoutItemList:function (dataview,  index,  target, record){
		var list = Ext.getCmp('faceitemsublist');
		var icons = record.get('thumbs');
		
		if (icons.length >1) {

			var store = list.getStore();
			if (store) {
				store.removeAll();
				store.setData(icons)
			}else {
				list.setData(icons);
			}
//			list.refresh();
			list.show();
		} else {
			list.hide();
		}
		this.selectFaceItem(record);
    }, 
	onItemSelectFromFaceLayoutItemSubList:function (dataview,  index,  target, record){
		var me = this;
		var record = me.getSelectedItem();
		
		this.selectFaceItem(record, index);
    },  
    selectFaceItem:function(record, nThImage) {
		var me = this;
		Ext.Viewport.getMasked().setMessage('loading...');
		Ext.Viewport.mask();
    	this.setSelectedItem(record);
		var src = record.getStyleIconAt(nThImage);
		var img = new Image();
		Ext.Viewport.mask();
		img.onload = function() {
			me.getFaceItem().setImage(img);
			me.getFaceItem().getLayer().draw();
			//me.drawFaceAtDefault();
		}
		me.loadImgByJsonP(src, function(result) {
				img.src = 'data:image/png;base64,'+result.img;
				me.setItemImgSrc(img.src);
				Ext.Viewport.unmask();
			}, function() {
				Ext.Viewport.unmask();
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
	          callback(images);
	        }
	      };
	      if (src=='item' && sources[src][0] != 'd') {		// if icon source == base 64
	      		var img = images[src];
	      		me.loadImgByJsonP(sources[src], function(result) {
		      		img.src = 'data:image/png;base64,'+result.img;
		      	},
		      	function(result) {
		      		images[src].src = '';
		      	});
	      } else {
	      		images[src].src = sources[src];
	      		//<debug>
	      		console.log('loadImages:'+sources[src]);
	      		//</debug>
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
	
	getDefaultFaceRect:function(img) {
		var me = this;
		var stage = me.getStage();
		var stageRect = stage.getSize();//{width:container.offsetParent. Width, height:container.offsetParent.offsetHeight};
		
		var rect={srcX:0, srcY:0, srcWidth:0, srcHeight:0, destX:0, destY:0, destWidth:0, destHeight:0, ratioWidth:0, ratioHeight:0}
		rect.srcWidth = img.width;
		rect.srcHeight = img.height;
		
		rect.destWidth = stageRect.width;
		rect.destHeight = stageRect.height;
						
		rect.ratioWidth = rect.srcWidth/rect.destWidth;
		rect.ratioHeight = rect.srcHeight/rect.destHeight;
	
		if (rect.ratioWidth > rect.ratioHeight) {
			rect.destHeight = parseInt(rect.srcHeight/rect.ratioWidth);
		} else {
			rect.destWidth = parseInt(rect.srcWidth/rect.ratioHeight);
		}
	
		rect.srcX = 0;
		rect.srcY = 0;	
		rect.destX = parseInt((stageRect.width - rect.destWidth)/2);
		rect.destY = parseInt((stageRect.height - rect.destHeight)/2);
		console.log('image rect:'+img.width+','+img.height);
		console.log('default rect:'+rect.destX+','+rect.destY+','+rect.destWidth+','+rect.destHeight);
		//alert(rect.destHeight);
		return rect;
				
	},  
    buildStage:function(images) {
    	var me =this;
      	var node = Ext.select('#facecontainer > div');
      	if (node.elements.length == 1) {
      		node.removeElement(0,true);	// delete node from dom 
      	}    	
    	
		var container = Ext.DomQuery.select('#facecontainer')[0];
    	var stageRect = {width:container.offsetWidth, height:container.offsetHeight};

		var stage = new Kinetic.Stage({
		    container: 'facecontainer',//container.id,
		    x:0,
		    y:0,
		    width: stageRect.width,
		    height: stageRect.height
		});
		me.setStage(stage);
		
		var faceLayer = new Kinetic.Layer({name:'facelayer'});
		var grayLayer = new Kinetic.Layer({name:'graylayer', visible:false});
		var itemLayer = new Kinetic.Layer({name:'itemlayer'});

		stage.add(faceLayer);		
		stage.add(grayLayer);		
		stage.add(itemLayer);		
		var grayRect = new Kinetic.Rect({
			x:0,
			y:0,
			name:'grayrect',
			width:stageRect.width,
			height:stageRect.height,
			fill:'black',
			opacity:0.5,
			visible:true
		});
		grayLayer.add(grayRect);
		
		var faceImg = images.face;
		var itemImg = images.item;
		
		var rect = me.getDefaultFaceRect(faceImg);
	
		var itemImgK = new Kinetic.Image({
		  x: 0,
		  y: 0,
		  id:"itemImg",
		  image: itemImg,
		  width: 230,
		  height: 184,
		  name: "image", 
		});
		
//		this.setFaceItem(itemImgK);

		var itemGroup = new Kinetic.Group({
			id:"itemGroup",
			name:'itemgroup',
			x: rect.destX+rect.destWidth/2-itemImgK.getWidth()/2,
			y: rect.destY+rect.destHeight/2-itemImgK.getHeight(),
		  	draggable: false
		});
		var faceGroup = new Kinetic.Group({
			id:"faceGroup",
			name:'facegroup',
			x: 0,
			y: 0,
			//y: rect.destY+rect.destHeight/2,
			draggable: false,
			pinch:false,
		});
		
		var faceoffset = {x:rect.destWidth/2, y:rect.destHeight/2};
		var faceImgK = new Kinetic.Image({
			x: rect.destX+faceoffset.x,
		  	y: rect.destY+faceoffset.y,
		  	id:"faceImg",
		  	image: faceImg,
		 	width: rect.destWidth,
		  	height: rect.destHeight,
		  	name: "image",
		  	offset:faceoffset
		  	
		  //draggable:true,
		});					
				              

		faceLayer.add(faceGroup);
		itemLayer.add(itemGroup);

		faceGroup.add(faceImgK);
		itemGroup.add(itemImgK);	
		
		//debugger;
        me.addAnchor2(itemGroup, 0, 0, "topLeft",images.resizeicon2);
        me.addAnchor2(itemGroup, 0, 0, "topRight",images.resizeicon);
        me.addAnchor2(itemGroup, 0, 0, "bottomLeft",images.resizeicon);		
        //var rotate = 
        me.addAnchor2(itemGroup, 0, 0, "bottomRight",images.rotateicon);
      
        me.updateStageEvent(stage);
        
        //this.updateAnchorPosition(itemGroup); //update....position	
				
		itemLayer.moveToTop();
		itemGroup.moveToTop();
   	  },
   	  updateAnchorEvent:function(group, anchors) {
   	  	var me =this;
   	  	var layer = group.getLayer();
   	  	for (var i=0; i<anchors.length;i++) {
   	  		var anchor = anchors[i];
   	  		var name = anchor.getName();
   	  		
	   	  	if (name != "bottomRight") {
		        anchor.on("dragmove", function() {
		        	//<debug>
		        	//console.log("anchor dragmove")
		        	//</debug>
		          	me.update(group, this);
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
			      	me.updateAnchorPosition(group);
		          	layer.draw();
		        });
	        } else {
		       	anchor.on("mousedown touchstart", function(evt){
		       			group.setDraggable(false);
		                this.angularVelocity = 0;
		                this.controlled = true;
		            });
		    }
   	  	}
   	  },
   	  updateStageEvent:function(stage) {
   	  	var me = this;
/*
   	  	me.setFaceItem(stage.get('#itemImg')[0]);
		me.setFace(stage.get('#faceImg')[0]);
		me.setFaceItemGroup(stage.get('#itemGroup')[0]);
		me.setFaceGroup(stage.get('#faceGroup')[0]);
		me.setFaceItemGroup(stage.get('#faceItemGroup')[0]);
		me.setStage(stage);
*/

   	  	var faceLayer = stage.get('.facelayer')[0];
   	  	var itemLayer = stage.get('.itemlayer')[0];
   	  	var grayLayer = stage.get('.graylayer')[0];
   	  	
   	  	var faceItemGroup = itemLayer.get('.itemgroup')[0];
   	  	var faceGroup = faceLayer.get('.facegroup')[0];
   	  	
   	  	var grayRect = grayLayer.get('.grayrect')[0];
   	  	var face = faceGroup.get('.image')[0];
   	  	var faceItem = faceItemGroup.get('.image')[0];
   	  	
   	  	me.setStage(stage);
		me.setFaceItemGroup(faceItemGroup);
		me.setFaceGroup(faceGroup);
		me.setFace(face);
		me.setFaceItem(faceItem);
		
		var anchors = me.getAnchors();
		anchors.splice(0, anchors.length);
   	  	anchors.push(faceItemGroup.get('.topLeft')[0]);
   	  	anchors.push(faceItemGroup.get('.bottomLeft')[0]);
   	  	anchors.push(faceItemGroup.get('.topRight')[0]);
   	  	var rotate = faceItemGroup.get('.bottomRight')[0];
   	  	anchors.push(rotate);
   	  	
		me.updateAnchorEvent(faceItemGroup, anchors);
   	  	
   	  	
        grayRect.on("mousedown touchstart", function() {
        	me.setFaceEditMode('face', me);
        });
		faceItem.on("mousedown touchstart", function() {
			rotate.controlled = false;
			me.setFaceEditMode('item', me);
			
		});
		face.on("mousedown touchstart", function() {
			rotate.controlled = false;
			me.setFaceEditMode('face', me);
			
	    });
 		stage.on("mouseup tap", function(){
			//console.log("stage touchend");
            rotate.controlled = false;
            Ext.getCmp('faceitemsublist').hide();
        }, false);
        stage.on("touchmove", function(evt, a, b){
            if (rotate.controlled) {
            	var mousePos = stage.getMousePosition();
				var ptcenter = rotate.getAbsolutePosition();
				var offset = rotate.getOffset();
				//console.log(Ext.String.format('absolute ({0},{1}) offset({2},{3})', 
            	//						ptcenter.x, ptcenter.y, offset.x, offset.y));
                ptcenter.x -= offset.x;
                ptcenter.y -= offset.y;
                var x,y;
                if (!mousePos.x) {
                	mousePos = stage.getTouchPosition();
                }
            	x = ptcenter.x - mousePos.x;
            	y = ptcenter.y - mousePos.y;
				var dist = parseInt( Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
            	//console.log(Ext.String.format('mouse ({0},{1}) center({2},{3}, dist:{4})', 
            	//						mousePos.x, mousePos.y, ptcenter.x, ptcenter.y, dist));
                	if (dist < 20)  {
                		return;
                	}
                    rotate.rotation = 0.5 * Math.PI + Math.atan(y / x);
                    //rotate.rotation =  Math.atan(y / x);
                    var angle = rotate.rotation*180/Math.PI;
                    angle = angle*0.05;
 					angle = 1;
                    if (mousePos.y < ptcenter.y){
                        angle *= -1;//star.rotation += Math.PI;
                }
                faceItemGroup.rotateDeg(angle);
                faceItemGroup.getLayer().draw();
            }
            
        }, false);       

        me.updateAnchorPosition(faceItemGroup); //update....position	
				
		faceLayer.moveToTop();		
		grayLayer.moveToTop();		
		itemLayer.moveToTop();		
		stage.draw();	  	  	
   	  },
   	  setFaceEditMode:function(mode, controller) {		//
   	  	var stage = controller.getStage();
   	  	var face =controller.getFace();
   	  	var faceItem = controller.getFaceItem();
   	  	var faceGroup = controller.getFaceGroup();
   	  	var faceItemGroup = controller.getFaceItemGroup();
   	  	console.log('setFaceEditMode');
   	  	if (mode == 'item') {
     		controller.showAnchor(true);	
   	  		// clear face masking...
     		faceGroup.setDraggable(false);
			faceItemGroup.setDraggable(true);
			// hide item selection box
     		faceItem.setStroke('#FFF');
     		faceItem.setStrokeWidth(2);
     		faceGroup.pinch = false;
     		
     		stage.get('.graylayer')[0].show();
		} else {
     		controller.showAnchor(false);		
   	  		// face group unmasking...

			faceGroup.setDraggable(true);
			faceItemGroup.setDraggable(false);
			// show item selection box
     		faceItem.setStroke(null);
     		faceItem.setStrokeWidth(0);
     		
     		faceGroup.pinch = true;
     		stage.get('.graylayer')[0].hide();
   	  	}
   	  	stage.draw();
	  	
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
			//offset:imageOffset,
			stroke: "#00F",
			fill:name=='bottomRight'?'#0F0':"#333",
			opacity:0.5,
			strokeWidth: 1,
			radius: 20,
			name: name,
			visible:false,
			draggable: name=='bottomRight'?false:true
			});
      
        if (name != "bottomRight") {
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
	addAnchor2:function (group, x, y, name, img) {
      	var controller = this;
        var stage = group.getStage();
        var layer = group.getLayer();
        var image = group.get(".image")[0];
        
        var imageOffset = image.getOffset();
        var anchor = new Kinetic.Image({
			x: x,
			y: y,
			image:img,
			opacity:0.5,
			name: name,
			width: 36,
		  	height: 36,		
		  	visible:false,
		  	offset:[18,18],
			draggable: name=='bottomRight'?false:true
			});
		//this.getAnchors().push(anchor);
        group.add(anchor);
        
        return anchor;
      }, 
      loadStage:function(images, style) {
    	var me =this;
      	var node = Ext.select('#facecontainer > div');
      	if (node.elements.length == 1) {
      		node.removeElement(0,true);	// delete node from dom 
      	}
      	
      	var container = Ext.DomQuery.select('#facecontainer')[0];
		var stage = Kinetic.Node.create(style, 'facecontainer');
		
		stage.get('#faceImg').apply('setImage', images.face);
		stage.get('#itemImg').apply('setImage', images.item);
		stage.get('.topLeft').apply('setImage', images.resizeicon2);
		stage.get('.bottomLeft').apply('setImage', images.resizeicon);
		stage.get('.topRight').apply('setImage', images.resizeicon);
		stage.get('.bottomRight').apply('setImage', images.rotateicon);
		
		me.updateStageEvent(stage);
	}
});