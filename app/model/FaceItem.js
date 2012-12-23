Ext.define('FaceShop.model.FaceItem',{
	extend:'Ext.data.Model',
	requires:[
	],
	config:{
		fields:['id','model','descript','ranks','categorys','tags','thumbs','styles','markets'],
        proxy: {
            type: 'jsonp',
            url: SERVER_ADDR+'service.php?name=faceitem&packname=hot&packtype=event',
            
            extraParams:{	// default faceitem...
            	packname:'hot',
            	packtype:'event'
            },
            
            reader: {
                type: 'json',
                rootProperty: 'rows'
            }
        }
	},
	getStyleIconAt:function(nth) {
		if (!nth)
			nth = 0;
		return SERVER_ADDR+'file.php?file='+this.get('styles')[nth].img;
	},
	getBestThumbIcon:function() {
		return SERVER_ADDR+this.get('thumbs')[0].img;
	},
	getBestStyleIcon:function() {
		return SERVER_ADDR+'file.php?file='+this.get('styles')[0].img;
	}
})