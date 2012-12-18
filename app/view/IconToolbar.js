Ext.define('FaceShop.view.IconToolbar',{
	extend:'Ext.Container',
	xtype:'icontoolbar',
	config:{
		pressedButton:null,
		layout:{
			type:'hbox',
			align:'center',
			pack:'center'
		},
		style:[
			//'background:url(resources/img/s_bottombg1.gif) no-repeat;',
			'background-size:100% 100%; height:60px; text-align:center; width:100%;margin-top:1px;'
			].join(''),
		listeners:{
      	scope:this,
				tap: {
					fn: function(button) {
						//this.selectButton(button);
      		},
      		delegate:'button'
  			},	
		}			
	},
	selectButton:function(button) {
//		if (button.getCls()[0] == 'btnMenuHome') return;
		
		var pressedCls=null;
		var cls=null;
		var pressedButton = this.getPressedButton();
		if (pressedButton == button) return;
		if (pressedButton != null) {      			
			pressedCls = pressedButton.getCls()[0];
			cls = pressedCls.substring(0, pressedCls.indexOf("Pressed"));
			pressedButton.setCls(cls);
			button.setPressedCls(cls+'Pressed');
		}
		
		
		cls = button.getCls()[0];
		pressedCls = ""+cls+"Pressed";

		button.setPressedCls(cls);
		button.setCls(pressedCls);
		this.setPressedButton(button);
	}
	
});