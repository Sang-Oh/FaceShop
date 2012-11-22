Ext.define('FaceShop.controller.Main', {    
  extend: 'Ext.app.Controller',  
  requires:[],
	launch:function() {
	},
	config: {
		userInfo:null,		
		refs: {
			face:'pinchzoomimage',
		},
		control:{
			face: {
				//activate:'onInitFace',
			},
			'canvas': {
				//:'onInitFace',
			}
		}
	},
	onInitFace:function(view) {
		//var canvasParentEl = document.getElementsByTagName('canvas')[0];//.parentElement;

		var canvasParentEl = view.element.dom.firstChild.firstChild;
		var objframe = Ext.DomQuery.select('#objframe')[0];
		canvasParentEl.appendChild(objframe.parentNode.removeChild(objframe));
	} 
});