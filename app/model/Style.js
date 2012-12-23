Ext.define('FaceShop.model.Style',{
	extend:'Ext.data.Model',
	requires:['Ext.data.identifier.Uuid'],
	config:{
		identifier: 'uuid',
		fields:[
		{
			name:'faceitemid',
			type:'int'				
		},{
			name:'style',
			type:'string'				
		},{
			name:'stage',
			type:'string'				
		}, {
			name:'faceimg',
			type:'string'
		}, {
			name:'itemimg',
			type:'string'
		}
		],
		proxy:{
			type:'localstorage',
			id:'face-style'
		}
	}
})