Ext.define('FaceShop.store.Packs', {
	extend:'Ext.data.Store',
	requires:['FaceShop.model.Pack','Ext.MessageBox'],
	config:{
		model:'FaceShop.model.Pack',
		autoLoad:true,	
		listeners:{
			load:function(store, records, successful) {
				if (successful!=true) {
					Ext.Msg.alert('Message', 'Sorry. Failed to load facewares.<br/>Please confirm connection and restart Facware.');
				}
			}
		}
	},
	
	
});
