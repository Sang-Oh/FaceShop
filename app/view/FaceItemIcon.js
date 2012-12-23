Ext.define('FaceShop.view.FaceItemIcon', {
	extend:'Ext.dataview.DataView',
	xtype:'faceitemicon',
	config:{
		//cls:'faceitemcontainer',
		scrollable:'vertical',
		inline: {
		    wrap: true
		},
		margin:'0 5 5 5',
		cls:'faceitemcontainer',
		itemCls:'packimg',
		itemTpl: new Ext.XTemplate(
				[
				//'<div class="{styles:this.getIconClass}">',
				//	'{styles:this.getImages}',
				'<img style="margin:0px;" src="{styles:this.getBestIcon}" width="64" />'
				//'</div>'
				].join(''),
				{
					getBestIcon:function(icons) {
						var img = icons[0].img;
						for (var i=0;i<icons.length;i++) {
							if (icons[i].type == '1x') {
								img = icons[i].img;
								break;
							}
							
						}
						return (SERVER_ADDR+img);
					},					
					getIconClass:function(icons) {
						var className = Ext.String.format('cf{0}a',icons.length);
						return className;
					},
					getImages:function(icons) {
						var images='';
						for (var i=0;i<icons.length;i++) {
							var icon = icons[i];
							if (parseInt(icon.height)>parseInt(icon.width))
								images += Ext.String.format('<img src="{0}{1}" height="64px" />', SERVER_ADDR,icon.img);
							else
								images += Ext.String.format('<img src="{0}{1}" width="64px" />', SERVER_ADDR,icon.img);
							
						}
						return images;
					},
				}),			
		flex:1,
		store:'FaceItems'
	}
});