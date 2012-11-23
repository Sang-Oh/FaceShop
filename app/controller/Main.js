Ext.define('FaceShop.controller.Main', {    
  extend: 'Ext.app.Controller',  
  requires:[],
	launch:function() {
	},
	config: {
		userInfo:null,		
		refs: {
			face:'pinchzoomimage',
			editView:'faceedit',
			editPinch:'faceedit pinchzoomimage',
		},
		control:{
			'faceedit dataview':{
				itemsingletap:'onItemSelectFromFaceEdit'
			}
		}
	},
	onItemSelectFromFaceEdit:function (dataview,  index,  target, record){
		var img = this.getEditPinch().getObjectImgEl();
		img.src = record.get('src');
    },   
	loadImages:function (sources, callback) {
	    var images = {};
	    var loadedImages = 0;
	    var numImages = 0;
	    for(var src in sources) {
	      numImages++;
	    }
	    debugger;
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
    initStage:function(images) {
	    				var container = Ext.DomQuery.select('#facecontainer')[0];
	    				var stage = new Kinetic.Stage({
					        container: 'facecontainer',//container.id,
					        width: container.offsetWidth,
					        height: container.offsetHeight,
					      });
					
					      var layer = new Kinetic.Layer();
					      
					      
					      var itemGroup = new Kinetic.Group({
					          x: 270,
					          y: 100,
					          draggable: true
					        });
					      var faceGroup = new Kinetic.Group({
					          x: 100,
					          y: 110,
					          draggable: true
					      });

				        var itemImg = new Kinetic.Image({
				          x: 0,
				          y: 0,
				          image: images.item,
				          width: 200,
				          height: 100,
				          name: "image"
				        });

				        var faceImg = new Kinetic.Image({
				          x: 200,
				          y: 200,
				          image: images.face,
				          width: 200,
				          height: 200,
				          name: "image"
				        });					
				              

						itemGroup.on("dragstart", function() {
				          this.moveToTop();
				        });
				        						
						faceGroup.on("dragstart", function() {
				          this.moveToTop();
				        });
						faceGroup.add(faceImg);
						itemGroup.add(itemImg);

        				stage.draw();
    	
    }
});