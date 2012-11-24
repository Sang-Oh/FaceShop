Ext.define('FaceShop.model.Face',{
	extend:'Ext.data.Model',
	requires:['Ext.data.identifier.Uuid'],
	config:{
		identifier: 'uuid',
		fields:[
		{
			name:'thumb',
			type:'string'	
		},{
			name:'face',
			type:'string'				
		}
		]
	}
})