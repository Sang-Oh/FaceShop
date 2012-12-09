Ext.define('FaceShop.store.Packs', {
	extend:'Ext.data.Store',
	requires:['FaceShop.model.Pack'],
	config:{
		model:'FaceShop.model.Pack',
		autoLoad:true,	
	}
});
