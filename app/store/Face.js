Ext.define('FaceShop.store.Face', {
    extend: 'Ext.data.Store',
    requires: [
        'FaceShop.model.Face',
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
		model: 'FaceShop.model.Face',
		autoLoad:true,
       
        data:[
		{thumb:'resources/images/man/ahn1.png', face:'resources/images/man/ahn1.png'},
		{thumb:'resources/images/man/front2.png', face:'resources/images/man/front2.png'},
		{thumb:'resources/images/man/front3.png', face:'resources/images/man/front3.png'},
		{thumb:'resources/images/man/front4.png', face:'resources/images/man/front4.png'},
		{thumb:'resources/images/man/iu1.png', face:'resources/images/man/iu1.png'},
		{thumb:'resources/images/man/iu2.png', face:'resources/images/man/iu2.png'},
		{thumb:'resources/images/man/jury1.png', face:'resources/images/man/jury1.png'},
		{thumb:'resources/images/man/psyu1.png', face:'resources/images/man/ahn1.png'},
		{thumb:'resources/images/man/san1.png', face:'resources/images/man/san1.png'},
		{thumb:'resources/images/man/san2.png', face:'resources/images/man/san2.png'},
		{thumb:'resources/images/man/son1.png', face:'resources/images/man/son1.png'},
		{thumb:'resources/images/man/sang.png', face:'resources/images/man/sang.png'},
       ]
       
	},

});