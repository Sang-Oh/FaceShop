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
});