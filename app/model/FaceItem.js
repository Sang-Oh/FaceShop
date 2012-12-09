Ext.define('FaceShop.model.FaceItem',{
	extend:'Ext.data.Model',
	requires:[
	],
	config:{
		fields:['model','descript','ranks','categorys','tags','thumbs','styles','markets'],
        proxy: {
            type: 'jsonp',
            url: 'service.php?service=faceitem.json',
            reader: {
                type: 'json',
                rootProperty: 'faceitems'
            }
        },		
	},
	getBestThumbIcon:function() {
		return FaceShop.app.server+this.get('thumbs')[0].img;
	},
	getBestStyleIcon:function() {
		return FaceShop.app.server+this.get('styles')[0].img;
	}
})