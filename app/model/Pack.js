Ext.define('FaceShop.model.Pack',{
	extend:'Ext.data.Model',
	requires:[
		'FaceShop.model.Icon'
	],
	config:{
		fields:[
		{
			name:'name'
		},
		{
			name:'type'
		},
		{
			name:'icons'
		}
		],
		/*
		hasMany: {
            model: 'FaceShop.model.Icon',
            name: 'icons'
        },
        */
        proxy: {
            type: 'jsonp',
            url: FaceShop.app.server+'service.php?name=packlist',
            reader: {
                type: 'json',
                rootProperty: 'rows'
            }
        },
	}
})