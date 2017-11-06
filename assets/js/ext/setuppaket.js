Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.LiveSearchGridPanel',
	'Ext.ux.ProgressBarPager'
]);

Ext.onReady(function() {
    Ext.QuickTips.init();
	
	var required = '<span style="color:red;font-weight:bold" data-qtip="Field ini wajib diisi">*</span>';
	
	function trim(text) {
		return text.replace(/^\s+|\s+$/gm, '');
	}
	
	function gridTooltipSearch(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Klik 2x pada record untuk memilih',
			target: view.el,
			trackMouse: true,
			listeners: {
				beforeshow: function (tip) {
					var tooltip = view.getRecord(tip.triggerElement).get('tooltip');
					if(tooltip){
						tip.update(tooltip);
					}
					else {
						tip.on('show', function() {
							Ext.defer(tip.hide, 5000, tip);
						}, tip, {single: true});
					}
				}
			}
		});
	}
	
	var vPaket = '';
	
	var grupPaket = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kd_paket','fs_nm_paket'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'setuppaket/KodePaket'
		},
		listeners: {
			beforeload: function(store, operation) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_paket': Ext.getCmp('cboPaket').getValue(),
					'fs_nm_paket': Ext.getCmp('cboPaket').getValue()
				});
			}
		}
	});
	
	var winGrid = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPaket,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPaket,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Paket', dataIndex: 'fs_kd_paket', menuDisabled: true, width: 120},
			{text: 'Nama Paket', dataIndex: 'fs_nm_paket', menuDisabled: true, width: 360}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboPaket').setValue(record.get('fs_kd_paket'));
				Ext.getCmp('txtPaket').setValue(record.get('fs_nm_paket'));
				
				vPaket = trim(record.get('fs_kd_paket'));
				winCari.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipSearch
			}
		}
	});
	
	var winCari = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid
		],
		listeners: {
			beforehide: function() {
				grupGridDetil.load();
				vMask.hide();
			},
			beforeshow: function() {
				grupPaket.load();
				vMask.show();
			}
		}
	});
	
	var cboPaket = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		fieldLabel: 'Kode Paket',
		fieldStyle: 'text-transform: uppercase;',
		editable: true,
		id: 'cboPaket',
		maxLength: 50,
		name: 'cboPaket',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
				Ext.getCmp('txtPaket').setValue('');
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari.show();
					winCari.center();
				}
			}
		}
	};
	
	var txtPaket = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Paket',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtPaket',
		maxLength: 50,
		name: 'txtPaket',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};
	
	Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nm_menu', type: 'string'},
			{name: 'fs_kd_menu', type: 'string'},
			{name: 'fb_tambah', type: 'bool'}
		]
	});
	
	var grupGridDetil = Ext.create('Ext.data.TreeStore', {
		autoLoad: true,
		model: 'DataGridDetil',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'setuppaket/AmbilNodes'
		},
		rootProperty: {
			expanded: true
		},
		listeners: {
			beforeload: function(store, operation) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_paket': vPaket
				});
			}
		}
	});
	
	var gridDetil = Ext.create('Ext.tree.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 381,
		rootVisible: false,
		sortableColumns: false,
		store: grupGridDetil,
		columns: [{
			dataIndex: 'fs_nm_menu',
			flex: 1.5,
			menuDisabled: true,
			text: 'Menu',
			xtype: 'treecolumn'
		},{
			dataIndex: 'fs_kd_menu',
			flex: 0.5,
			hidden: true,
			menuDisabled: true,
			text: 'Kode'
		},{
			align: 'center',
			dataIndex: 'fb_tambah',
			flex: 0.25,
			menuDisabled: true,
			stopSelection: false,
			text: 'Cek',
			xtype: 'checkcolumn',
			listeners: {
				checkchange: function(grid, rowIndex, checked) {
					var xStore = gridDetil.getStore();
					var xRecord = xStore.getAt(rowIndex);
					var xTotal = grupGridDetil.getCount();
					
					var xKode = trim(xRecord.get('fs_kd_menu'));
					var xCek = xRecord.get('fb_tambah');
					var xLen = 0;
					xLen = xKode.length;
					var j = 0;
					var xada = false;
					
					if (xCek === true) {
						
						if (xLen === 2) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2 && i !== rowIndex) {
									break;
								}
								else {
									xRecord.set('fb_tambah','1');
								}
							}
						}
						
						else if (xLen === 4) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if ((xLen === 2) || (xLen === 4 && i !== rowIndex)) {
									break;
								}
								else {
									xRecord.set('fb_tambah','1');
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
						}
						
						else if (xLen === 6) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if ((xLen === 2) || (xLen === 4) || (xLen === 6 && i !== rowIndex)) {
									break;
								}
								else {
									xRecord.set('fb_tambah','1');
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 4) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
						}
						
						else if (xLen === 8) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if ((xLen === 2) || (xLen === 4) || (xLen === 6) || (xLen === 8 && i !== rowIndex)) {
									break;
								}
								else {
									xRecord.set('fb_tambah','1');
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 6) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 4) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
						}
						
						else if (xLen === 10) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if ((xLen === 2) || (xLen === 4) || (xLen === 6) || (xLen === 8) || (xLen === 10 && i !== rowIndex)) {
									break;
								}
								else {
									xRecord.set('fb_tambah','1');
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 8) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 6) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 4) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
							
							for (i=rowIndex;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2) {
									xRecord.set('fb_tambah','1');
									break;
								}
							}
						}
						
					}
					
					else { //uncek
						
						if (xLen === 2) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2 && i !== rowIndex) {
									break;
								}
								else {
									xRecord.set('fb_tambah','0');
								}
							}
						}
						
						else if (xLen === 4) {
							// uncek 4
							j = 0;
							xada = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if ((xLen === 2) || (xLen === 4 && i !== rowIndex)) {
									break;
								}
								else if (xLen === 6 || xLen === 8) {
									xRecord.set('fb_tambah','0');
								}
							}
							// eof uncek 4
							
							// uncek 2
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xada = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 2) {
									if (xada === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 4 && xCek === true) {
										xada = true;
									}
								}
							}
							// eof uncek 2
						}
						
						else if (xLen === 6) {
							// uncek 6
							j = 0;
							xada = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if ((xLen === 2) || (xLen === 4) || (xLen === 6 && i !== rowIndex)) {
									break;
								}
								else if (xLen === 8) {
									xRecord.set('fb_tambah','0');
								}
							}
							// eof uncek 6
							
							// uncek 4
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2 || xLen === 4) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xada = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 4) {
									if (xada === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 6 && xCek === true) {
										xada = true;
									}
								}
							}
							// eof uncek 4
							
							// uncek 2
							j = 0;
							xada = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xada = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 2) {
									if (xada === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 4 && xCek === true) {
										xada = true;
									}
								}
							}
							// eof uncek 2
						}
						
						else if (xLen === 8) {
							// uncek 8
							j = 0;
							xada = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if ((xLen === 2) || (xLen === 4) || (xLen === 6) || (xLen === 8 && i !== rowIndex)) {
									break;
								}
								else if (xLen === 10) {
									xRecord.set('fb_tambah','0');
								}
							}
							// eof uncek 8
							
							// uncek 6
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2 || xLen === 4 || xLen === 6) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xada = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 6) {
									if (xada === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 8 && xCek === true) {
										xada = true;
									}
								}
							}
							// eof uncek 6
							
							// uncek 4
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2 || xLen === 4) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xada = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 4) {
									if (xada === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 6 && xCek === true) {
										xada = true;
									}
								}
							}
							// eof uncek 4
							
							// uncek 2
							j = 0;
							xada = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xada = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 2) {
									if (xada === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 4 && xCek === true) {
										xada = true;
									}
								}
							}
							// eof uncek 2
						}
						
						else if (xLen === 10) {
							// uncek 10
							j = 0;
							xada = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if ((xLen === 2) || (xLen === 4) || (xLen === 6) || (xLen === 8) || (xLen === 10 && i !== rowIndex)) {
									break;
								}
								else if (xLen === 12) {
									xRecord.set('fb_tambah','0');
								}
							}
							// eof uncek 10
							
							// uncek 8
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2 || xLen === 4 || xLen === 6 || xLen === 8) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xada = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 8) {
									if (xada === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 10 && xCek === true) {
										xada = true;
									}
								}
							}
							// eof uncek 8
							
							// uncek 6
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2 || xLen === 4 || xLen === 6) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xada = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 6) {
									if (xada === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 8 && xCek === true) {
										xada = true;
									}
								}
							}
							// eof uncek 6
							
							// uncek 4
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2 || xLen === 4) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xada = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 4) {
									if (xada === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 6 && xCek === true) {
										xada = true;
									}
								}
							}
							// eof uncek 4
							
							// uncek 2
							j = 0;
							xada = false;
							
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								
								if (xLen === 2) {
									j = i - 1;
									break;
								}
								else if (i === xTotal - 1) {
									j = i;
									break;
								}
							}
							
							xada = false;
							for (i=j;i>=0;i--) {
								xRecord = xStore.getAt(i);
								xKode = trim(xRecord.get('fs_kd_menu'));
								xLen = xKode.length;
								xCek = xRecord.get('fb_tambah');
								
								if (xLen === 2) {
									if (xada === false) {
										xRecord.set('fb_tambah','0');
									}
									break;
								}
								else {
									if (xLen === 4 && xCek === true) {
										xada = true;
									}
								}
							}
							// eof uncek 2
						}
						
					}
				}
			}
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});
	
	function fnCekSimpan(){
		if (this.up('form').getForm().isValid()) {
			
			Ext.Ajax.on('beforerequest', vMask.show, vMask);
			Ext.Ajax.on('requestcomplete', vMask.hide, vMask);
			Ext.Ajax.on('requestexception', vMask.hide, vMask);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'setuppaket/CekSimpan',
				params: {
					'fs_kd_paket': Ext.getCmp('cboPaket').getValue(),
					'fs_nm_paket': Ext.getCmp('txtPaket').getValue()
				},
				success: function(response, opts) {
					var xText = Ext.decode(response.responseText);
					
					if (xText.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							message: xText.hasil,
							title: 'DokterPraktek'
						});
					}
					else {
						if (xText.sukses === true && xText.hasil == 'lanjut') {
							fnSimpan();
						}
						else {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								message: xText.hasil,
								title: 'DokterPraktek',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSimpan();
									}
								}
							});
						}
					}
				},
				failure: function(response, opts) {
					var xText = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						message: 'Simpan Gagal, Koneksi Gagal!!',
						title: 'DokterPraktek'
					});
					vMask.hide();
				}
			});
		}
	}
	
	function fnSimpan() {
		var xmenu = '';
		var xStore = gridDetil.getStore();
		
		xStore.each(function(record, idx) {
			if (record.get('fb_tambah') === true) {
				xmenu = xmenu +'|'+ record.get('fs_kd_menu');
			}
		});
		
		Ext.Ajax.on('beforerequest', vMask.show, vMask);
		Ext.Ajax.on('requestcomplete', vMask.hide, vMask);
		Ext.Ajax.on('requestexception', vMask.hide, vMask);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'setuppaket/Simpan',
			params: {
				'fs_kd_paket': Ext.getCmp('cboPaket').getValue(),
				'fs_nm_paket': Ext.getCmp('txtPaket').getValue(),
				'fs_kd_menu': xmenu,
				'fd_simpan': Ext.Date.format(new Date(), 'Y-m-d H:i:s')
			},
			success: function(response, opts) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					message: xText.hasil,
					title: 'DokterPraktek'
				});
				
				if (xText.sukses === true) {
					fnReset();
				}
			},
			failure: function(response, opts) {
				var xText = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					message: 'Simpan Gagal, Koneksi Gagal!!',
					title: 'DokterPraktek'
				});
				vMask.hide();
			}
		});
	}
	
	function fnReset() {
		Ext.getCmp('cboPaket').setValue('');
		Ext.getCmp('txtPaket').setValue('');
		
		vPaket = '';
		grupGridDetil.load();
	}
	
	var frmSetupPaket = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Menu Paket',
		width: 550,
		fieldDefaults: {
			labelAlign: 'right',
			labelSeparator: '',
			labelWidth: 80,
			msgTarget: 'side'
		},
		items: [{
			style: 'padding: 5px;',
			xtype: 'fieldset',
			items: [{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 2,
					layout: 'anchor',
					xtype: 'container',
					items: [
						cboPaket
					]
				},{
					flex: 1,
					layout: 'anchor',
					xtype: 'container'
				}]
			},
				txtPaket
			]
		},
			gridDetil
		],
		buttons: [{
			iconCls: 'icon-save',
			text: 'Simpan',
			handler: fnCekSimpan
		},{
			iconCls: 'icon-reset',
			text: 'Reset',
			handler: fnReset
		}]
	});
	
	var vMask = new Ext.LoadMask({
		msg: 'Silakan tunggu...',
		target: frmSetupPaket
	});
	
	frmSetupPaket.render(Ext.getBody());
	Ext.get('loading').destroy();
});