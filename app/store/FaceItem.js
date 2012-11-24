Ext.define('FaceShop.store.FaceItem', {
    extend: 'Ext.data.Store',
    requires: [
        'FaceShop.model.FaceItem',
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
		model: 'FaceShop.model.FaceItem',
		//autoLoad:true,
       
        data:[
		{shop:'STCO', model:'12,000', thumb:'resources/images/itemsmall/cap2.png', item:'resources/images/item/cap2.png'},
		{shop:'STCO', model:'70,000', thumb:'resources/images/itemsmall/cap1.png', item:'resources/images/item/cap1.png'},

		{shop:'STCO', model:'8,000', thumb:'resources/images/itemsmall/cap3.png', item:'resources/images/item/cap3.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/cap4.png', item:'resources/images/item/cap4.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/cap5.png', item:'resources/images/item/cap5.png'},

		{shop:'STCO', model:'70,000', thumb:'resources/images/itemsmall/bean1.png', item:'resources/images/item/bean1.png'},
		{shop:'STCO', model:'12,000', thumb:'resources/images/itemsmall/bean2.png', item:'resources/images/item/bean2.png'},
		{shop:'STCO', model:'8,000', thumb:'resources/images/itemsmall/bean3.png', item:'resources/images/item/bean3.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/bean4.png', item:'resources/images/item/bean4.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/bean5.png', item:'resources/images/item/bean5.png'},
		
		{shop:'STCO', model:'70,000', thumb:'resources/images/itemsmall/hat1.png', item:'resources/images/item/hat1.png'},
		{shop:'STCO', model:'12,000', thumb:'resources/images/itemsmall/hat2.png', item:'resources/images/item/hat2.png'},
		{shop:'STCO', model:'8,000', thumb:'resources/images/itemsmall/hat3.png', item:'resources/images/item/hat3.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/hat4.png', item:'resources/images/item/hat4.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/hat5.png', item:'resources/images/item/hat5.png'},
		
		{shop:'STCO', model:'70,000', thumb:'resources/images/itemsmall/cap1.png', item:'resources/images/item/cap1.png'},
		{shop:'STCO', model:'12,000', thumb:'resources/images/itemsmall/cap2.png', item:'resources/images/item/cap2.png'},

		{shop:'STCO', model:'8,000', thumb:'resources/images/itemsmall/cap3.png', item:'resources/images/item/cap3.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/cap4.png', item:'resources/images/item/cap4.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/cap5.png', item:'resources/images/item/cap5.png'},

		{shop:'STCO', model:'70,000', thumb:'resources/images/itemsmall/bean1.png', item:'resources/images/item/bean1.png'},
		{shop:'STCO', model:'12,000', thumb:'resources/images/itemsmall/bean2.png', item:'resources/images/item/bean2.png'},
		{shop:'STCO', model:'8,000', thumb:'resources/images/itemsmall/bean3.png', item:'resources/images/item/bean3.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/bean4.png', item:'resources/images/item/bean4.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/bean5.png', item:'resources/images/item/bean5.png'},
		
		{shop:'STCO', model:'70,000', thumb:'resources/images/itemsmall/hat1.png', item:'resources/images/item/hat1.png'},
		{shop:'STCO', model:'12,000', thumb:'resources/images/itemsmall/hat2.png', item:'resources/images/item/hat2.png'},
		{shop:'STCO', model:'8,000', thumb:'resources/images/itemsmall/hat3.png', item:'resources/images/item/hat3.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/hat4.png', item:'resources/images/item/hat4.png'},
		{shop:'STCO', model:'31,000', thumb:'resources/images/itemsmall/hat5.png', item:'resources/images/item/hat5.png'},
       ]
       
	},

});