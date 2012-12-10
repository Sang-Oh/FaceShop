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
            url: 'service.php?service=collection/pack.json',
            reader: {
                type: 'json',
                rootProperty: 'collections'
            }
        },
	}
})