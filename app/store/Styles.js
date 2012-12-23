Ext.define('FaceShop.store.Styles', {
    extend: 'Ext.data.Store',
    requires: [
        'FaceShop.model.Style',
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
		model: 'FaceShop.model.Style',
		autoLoad:true,
		/*
		proxy: {
            type: 'localstorage',
            id  : 'style'
       }
       */
       /*
       data:[
       {thumb:'resources/images/itemsmall/cap1s.png', item:'resources/images/item/cap1.png', style:'resources/images/item/cap1.png', layout:''},
       {thumb:'resources/images/itemsmall/cap1s.png', item:'resources/images/item/cap1.png', style:'resources/images/item/cap1.png', layout:''},
       {thumb:'resources/images/itemsmall/cap1s.png', item:'resources/images/item/cap1.png', style:'resources/images/item/cap1.png', layout:''},
       {thumb:'resources/images/itemsmall/cap1s.png', item:'resources/images/item/cap1.png', style:'resources/images/item/cap1.png', layout:''},
       {thumb:'resources/images/itemsmall/cap1s.png', item:'resources/images/item/cap1.png', style:'resources/images/item/cap1.png', layout:''},
       {thumb:'resources/images/itemsmall/cap1s.png', item:'resources/images/item/cap1.png', style:'resources/images/item/cap1.png', layout:''},
       {thumb:'resources/images/itemsmall/cap1s.png', item:'resources/images/item/cap1.png', style:'resources/images/item/cap1.png', layout:''},
       {thumb:'resources/images/itemsmall/cap1s.png', item:'resources/images/item/cap1.png', style:'resources/images/item/cap1.png', layout:''},
       ]
       */
	},

});
