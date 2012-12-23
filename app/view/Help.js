Ext.define('FaceShop.view.Help', {
	extend:'Ext.Container',
	xtype:'help',
	config: {
		layout:'fit',
		items:[
		{
			xtype:'titlebar',
			title:'About',
			docked:'top',
			items:[{
				xtype:'button',
				iconCls:'home',
				iconMask:true,
				//text:'Back',
				align:'left',
				action:'back',
				ui:'back'
			}]
		},{
			styleHtmlContent:true,
			scrollable:'vertical',
			style:'width:100%;height:100%;background: url(resources/images/background.png) center no-repeat;background-size:100% 100%;',
			html:[
				'<div  style="border-radius:5px;padding:10px;background-color: rgba(0, 0, 0, 0.3);color:white">',
				'<h4>Usage</h4>',
				'<h6>Choose faceware pack</h6>',
				'Select faceware pack in the top and see icons of it.',
				'<h6>Prepare photo for your style</h6>',
				'<p>Take new photo or Select it from your stored album.It will be used for building your style. You can start it by tap "Start" or "Select" button.</p>',
				'<h6>Build your style</h6>',
				'<li><b>face scaling and position</b></li>',
				'<p>Tap your face first. It can be saled by pinch and moved by dragg.<p>',
				'<li><b>edit faceware</b></li>',
				'<p>Tap the facware icon at the bottom. You can move it by dragging and rotate and scale by anchor touch.</p>',
				'<li><b>change faceware pack</b></li>',
				'<p>Tap the hang icon at left-bottom of corner. You could move to the faceware collection panel and choose on which you try on.</p>',
				'<li><b>save your faceware style</b></li>',
				'<p>Just tap the save button and you can see all item in the styles album at home page.</p>',
				'<h6>View style album</h6>',
				'<p>Your faceware styles are saved in style album of main page. you can  see the detail and edit it by tap.</p>',
				'<h4>Share</h4>',
					'<p>We are pleased to add your facewares. <br />',
					'Please contact us if you want to share it with others.</p>',
					'<a href="mailto:swoh77@gmail">swoh77@gmail.com</a>',
					'<p>Sang Oh</p>',
				'</div>'
				
			].join(''),			
		}
		]
	}
})