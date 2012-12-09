Ext.define('FaceShop.model.Icon',{
	extend:'Ext.data.Model',
	config:{
		fields:[
		{
			name:'id',
		},{
			name:'img',			
		},{
			name:'width',		
		},{
			name:'height',						
		}
		],
		belongsTo: 'FaceShop.model.Pack'
	}
})