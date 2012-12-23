Ext.define('FaceShop.view.PackIcon',{
	extend:'Ext.dataview.DataView',
	xtype:'packicon',
	config:{
		height:60,
		scrollable:'horizontal',
	    inline: {
	        wrap: false
	    },			
		cls:'packcontainer',
		margin: 5,
		padding:5,
		emptyText:'Loading faceware packs...',
		itemCls:'packitemcls',
		pressedCls:'packitempressedcls',
		selectedCls:'packitemselectedcls',
		itemTpl: new Ext.XTemplate(
			[
			'<img src="{icons:this.getBestIcon}" style="margin-left:5px;margin-right:5px;margin-top:5px;" width="72" height="40" />'
			].join(''),
			{
				getBestIcon:function(icons) {
					var img = icons[0].img;
					for (var i=0;i<icons.length;i++) {
						if (icons[i].type == '1x') {
							img = icons[i].img;
							break;
						}
						//img = icons[i].img;
					}
					return SERVER_ADDR+img;
				}
			}),
		store:'Packs'
	}

})