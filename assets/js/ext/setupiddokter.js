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
	
	var grupDokter = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kd_dokter','fs_nm_dokter',
			'fs_kd_user','fs_password','fs_alamat',
			'fs_kota','fs_tlp','fs_email',
			'fs_kd_paket','fs_nm_paket',
			'fs_kd_akses','fs_nm_akses','fs_nm_db'
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
			url: 'setupiddokter/KodeDokter'
		},
		listeners: {
			beforeload: function(store, operation) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_dokter': Ext.getCmp('cboID').getValue(),
					'fs_nm_dokter': Ext.getCmp('cboID').getValue()
				});
			}
		}
	});
	
	var winGrid = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupDokter,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDokter,
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
			{text: 'ID Dokter', dataIndex: 'fs_kd_dokter', menuDisabled: true, width: 110},
			{text: 'Nama Dokter', dataIndex: 'fs_nm_dokter', menuDisabled: true, width: 270},
			{text: 'Kode User', dataIndex: 'fs_kd_user', menuDisabled: true, width: 100},
			{text: 'Password', dataIndex: 'fs_password', hidden: true},
			{text: 'Alamat', dataIndex: 'fs_alamat', hidden: true},
			{text: 'Kota', dataIndex: 'fs_kota', hidden: true},
			{text: 'Telp', dataIndex: 'fs_tlp', hidden: true},
			{text: 'Email', dataIndex: 'fs_email', hidden: true},
			{text: 'Kode Paket', dataIndex: 'fs_kd_paket', hidden: true},
			{text: 'Nama Paket', dataIndex: 'fs_nm_paket', hidden: true},
			{text: 'Kode Akses', dataIndex: 'fs_kd_akses', hidden: true},
			{text: 'Nama Akses', dataIndex: 'fs_nm_akses', hidden: true},
			{text: 'Nama DB', dataIndex: 'fs_nm_db', hidden: true}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboID').setValue(record.get('fs_kd_dokter'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nm_dokter'));
				Ext.getCmp('txtUser').setValue(record.get('fs_kd_user'));
				Ext.getCmp('txtPassword').setValue(record.get('fs_password'));
				Ext.getCmp('txtAlamat').setValue(record.get('fs_alamat'));
				Ext.getCmp('txtKota').setValue(record.get('fs_kota'));
				Ext.getCmp('txtTlp').setValue(record.get('fs_tlp'));
				Ext.getCmp('txtEmail').setValue(record.get('fs_email'));
				Ext.getCmp('cboPaket').setValue(record.get('fs_kd_paket'));
				Ext.getCmp('txtPaket').setValue(record.get('fs_nm_paket'));
				Ext.getCmp('cboAkses').setValue(record.get('fs_kd_akses'));
				Ext.getCmp('txtAkses').setValue(record.get('fs_nm_akses'));
				Ext.getCmp('cboDB').setValue(record.get('fs_nm_db'));
				
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
				vMask.hide();
			},
			beforeshow: function() {
				grupDokter.load();
				vMask.show();
			}
		}
	});
	
	var cboID = {
		emptyText: 'BARU',
		fieldLabel: 'ID Dokter',
		fieldStyle: 'text-transform: uppercase;',
		anchor: '95%',
		editable: true,
		id: 'cboID',
		maxLength: 25,
		name: 'cboID',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
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
	
	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Nama Dokter',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNama',
		maxLength: 100,
		name: 'txtNama',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};
	
	var txtUser = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		fieldLabel: 'ID User Login',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtUser',
		maxLength: 25,
		name: 'txtUser',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};
	
	var txtPassword = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Password User',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtPassword',
		maxLength: 50,
		name: 'txtPassword',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};
	
	var txtAlamat = {
		fieldLabel: 'Alamat',
		fieldStyle: 'text-transform: uppercase;',
		grow: true,
		growMin: 35,
		growMax: 35,
		id: 'txtAlamat',
		maxLength: 200,
		name: 'txtAlamat',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};
	
	var txtKota = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Kota',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKota',
		maxLength: 50,
		name: 'txtKota',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};
	
	var txtTlp = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Telp / HP',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtTlp',
		maxLength: 50,
		name: 'txtTlp',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};
	
	var txtEmail = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Email',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtEmail',
		maxLength: 50,
		name: 'txtEmail',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};
	
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
			url: 'setuppaket/KodePaketAktif'
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
	
	var winGrid2 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		selType: 'rowmodel',
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
					winCari2.hide();
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
				
				winCari2.hide();
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
	
	var winCari2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid2
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
		anchor: '98%',
		fieldLabel: 'Grup Paket',
		fieldStyle: 'text-transform: uppercase;',
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
					winCari2.show();
					winCari2.center();
				}
			}
		}
	};
	
	var txtPaket = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase',
		id: 'txtPaket',
		maxLength: 50,
		name: 'txtPaket',
		readOnly: true,
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};
	
	var grupAkses = Ext.create('Ext.data.Store', {
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
			url: 'setuppaket/KodePaketAkses'
		},
		listeners: {
			beforeload: function(store, operation) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_paket': Ext.getCmp('cboAkses').getValue(),
					'fs_nm_paket': Ext.getCmp('cboAkses').getValue()
				});
			}
		}
	});
	
	var winGrid3 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupAkses,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupAkses,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari3.hide();
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
				Ext.getCmp('cboAkses').setValue(record.get('fs_kd_paket'));
				Ext.getCmp('txtAkses').setValue(record.get('fs_nm_paket'));
				
				winCari3.hide();
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
	
	var winCari3 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid3
		],
		listeners: {
			beforehide: function() {
				grupGridDetil.load();
				vMask.hide();
			},
			beforeshow: function() {
				grupAkses.load();
				vMask.show();
			}
		}
	});
	
	var cboAkses = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		fieldLabel: 'Akses Petugas',
		fieldStyle: 'text-transform: uppercase;',
		id: 'cboAkses',
		maxLength: 50,
		name: 'cboAkses',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
				Ext.getCmp('txtAkses').setValue('');
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
					winCari3.show();
					winCari3.center();
				}
			}
		}
	};
	
	var txtAkses = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase',
		id: 'txtAkses',
		maxLength: 50,
		name: 'txtAkses',
		readOnly: true,
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};
	
	var grupDB = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_nm_db'
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
			url: 'setupiddokter/ListDB'
		},
		listeners: {
			beforeload: function(store, operation) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_nm_db': Ext.getCmp('cboDB').getValue()
				});
			}
		}
	});
	
	var winGrid4 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupDB,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDB,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari4.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama DB', dataIndex: 'fs_nm_db', menuDisabled: true, width: 480}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboDB').setValue(record.get('fs_nm_db'));
				
				winCari4.hide();
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
	
	var winCari4 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid4
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupDB.load();
				vMask.show();
			}
		}
	});
	
	var cboDB = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '70%',
		fieldLabel: 'Database',
		fieldStyle: 'text-transform: uppercase;',
		id: 'cboDB',
		maxLength: 50,
		name: 'cboDB',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
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
					winCari4.show();
					winCari4.center();
				}
			}
		}
	};
	
	var grupDokter2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kd_dokter','fs_nm_dokter','fs_email','fs_nm_db'
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
			url: 'setupiddokter/KodeDokterAktif'
		},
		listeners: {
			beforeload: function(store, operation) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kd_dokter': Ext.getCmp('cboDokter').getValue(),
					'fs_nm_dokter': Ext.getCmp('cboDokter').getValue()
				});
			}
		}
	});
	
	var winGrid5 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupDokter2,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDokter2,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari5.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'ID Dokter', dataIndex: 'fs_kd_dokter', menuDisabled: true, width: 100},
			{text: 'Nama Dokter', dataIndex: 'fs_nm_dokter', menuDisabled: true, width: 300},
			{text: 'Email', dataIndex: 'fs_email', menuDisabled: true, width: 200}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboDokter').setValue(record.get('fs_kd_dokter'));
				Ext.getCmp('txtDokter').setValue(record.get('fs_nm_dokter'));
				Ext.getCmp('txtEmail2').setValue(record.get('fs_email'));
				
				winCari5.hide();
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
	
	var winCari5 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid5
		],
		listeners: {
			beforehide: function() {
				grupGridDetil.load();
				vMask.hide();
			},
			beforeshow: function() {
				grupDokter2.load();
				vMask.show();
			}
		}
	});
	
	var grupBln = Ext.create('Ext.data.ArrayStore', {
		autoLoad: false,
		data: [
			['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'],
			['7', '7'], ['8', '8'], ['9', '9'], ['10', '10'], ['11', '11'], ['12', '12']
		],
		fields: ['fs_kd_bln', 'fs_nm_bln']
	});
	
	var winGrid6 = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupDokter2,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDokter2,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari6.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'ID Dokter', dataIndex: 'fs_kd_dokter', menuDisabled: true, width: 110},
			{text: 'Nama Dokter', dataIndex: 'fs_nm_dokter', menuDisabled: true, width: 300},
			{text: 'Email', dataIndex: 'fs_email', menuDisabled: true, width: 200}
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				var recordgrid = gridBayar.getSelectionModel().getSelection()[0];
				recordgrid.set('fs_kd_dokter',record.get('fs_kd_dokter'));
				recordgrid.set('fs_nm_dokter',record.get('fs_nm_dokter'));
				recordgrid.set('fs_email',record.get('fs_email'));
				
				winCari6.hide();
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
	
	var winCari6 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid6
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupDokter2.load();
				vMask.show();
			}
		}
	});
	
	var cellEditingBayar = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});
	
	Ext.define('DataGridBayar', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kd_dokter', type: 'string'},
			{name: 'fs_nm_dokter', type: 'string'},
			{name: 'fs_email', type: 'string'},
			{name: 'fs_kd_bln', type: 'string'}
		]
	});
	
	var grupGridBayar = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridBayar',
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
			url: ''
		},
		listeners: {
			beforeload: function(store, operation) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});
	
	var gridBayar = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 420,
		sortableColumns: false,
		store: grupGridBayar,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kd_dokter',
			menuDisabled: true,
			text: 'ID',
			width: 100,
			editor: {
				editable: true,
				xtype: 'textfield',
				listeners: {
					change: function() {
						var recordgrid = gridBayar.getSelectionModel().getSelection()[0];
						recordgrid.set('fs_nm_dokter','');
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
							winCari6.show();
							winCari6.center();
						}
					}
				}
			}
		},{
			dataIndex: 'fs_nm_dokter',
			menuDisabled: true,
			text: 'Dokter',
			width: 250
		},{
			dataIndex: 'fs_email',
			menuDisabled: true,
			text: 'Email',
			width: 180
		},{
			dataIndex: 'fs_kd_bln',
			menuDisabled: true,
			text: 'Bulan',
			width: 80
		}],
		tbar: [{
			flex: 2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Pilih Dokter',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboDokter',
				name: 'cboDokter',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
						Ext.getCmp('txtDokter').setValue('');
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
							winCari5.show();
							winCari5.center();
						}
					}
				}
			},{
				anchor: '95%',
				emptyText: 'Masukkan Dokter',
				fieldStyle: 'text-transform: uppercase;',
				hidden: true,
				id: 'txtDokter',
				name: 'txtDokter',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			},{
				anchor: '95%',
				emptyText: 'Masukkan Email',
				fieldStyle: 'text-transform: uppercase;',
				hidden: true,
				id: 'txtEmail2',
				name: 'txtEmail2',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.8,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nm_bln',
				editable: false,
				emptyText: 'Pilih Bulan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboBulan',
				listConfig: {
					maxHeight: 110
				},
				name: 'cboBulan',
				store: grupBln,
				value: '1',
				valueField: 'fs_kd_bln',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			xtype: 'buttongroup',
			columns: 2,
			defaults: {
				scale: 'small'
			},
			items: [{
				iconCls: 'icon-add',
				text: 'Tambah',
				handler : function() {
					var xTotal = grupGridBayar.getCount();
					var xdokter = Ext.getCmp('cboDokter').getValue();
					var xData = Ext.create('DataGridBayar', {
						fs_kd_dokter: Ext.getCmp('cboDokter').getValue(),
						fs_nm_dokter: Ext.getCmp('txtDokter').getValue(),
						fs_email: Ext.getCmp('txtEmail2').getValue(),
						fs_kd_bln: Ext.getCmp('cboBulan').getValue()
					});
					
					var xStore = gridBayar.getStore();
					var xLanjut = true;
					xStore.each(function(record, idx) {
						var xText = trim(record.get('fs_kd_dokter'));
						
						if (xText == xdokter) {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.OK,
								closable: false,
								icon: Ext.MessageBox.INFO,
								message: 'Dokter sudah ada, tambah dokter batal!!',
								title: 'DokterPraktek'
							});
							xLanjut = false;
						}
						
					});
					if (xLanjut === false) {
						return;
					}
					
					if (trim(xdokter) === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							message: 'Dokter tidak ada dalam daftar!',
							title: 'DokterPraktek'
						});
						return;
					}
					
					grupGridBayar.insert(xTotal, xData);
					Ext.getCmp('cboDokter').setValue('');
					Ext.getCmp('txtDokter').setValue('');
					Ext.getCmp('txtEmail2').setValue('');
					Ext.getCmp('cboBulan').setValue('1');
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Hapus',
				handler: function() {
					var sm = gridBayar.getSelectionModel();
					cellEditingBayar.cancelEdit();
					grupGridBayar.remove(sm.getSelection());
					gridBayar.getView().refresh();
					if (grupGridBayar.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}],
		listeners: {
			'selectionchange': function(view, records) {
				gridBayar.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			cellEditingBayar
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});
	
	Ext.define('DataGrid', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kd_dokter', type: 'string'},
			{name: 'fs_nm_dokter', type: 'string'},
			{name: 'fs_email', type: 'string'},
			{name: 'fs_kd_user', type: 'string'},
			{name: 'fs_password', type: 'string'},
			{name: 'fs_alamat', type: 'string'},
			{name: 'fs_kota', type: 'string'},
			{name: 'fs_tlp', type: 'string'},
			{name: 'fs_nm_paket', type: 'string'},
			{name: 'fs_nm_akses', type: 'string'},
			{name: 'fd_jatuh_tempo', type: 'string'},
			{name: 'fs_nm_db', type: 'string'},
			{name: 'fs_status', type: 'string'}
		]
	});
	
	var grupGridDetil = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGrid',
		pageSize: 25,
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
			url: 'setupiddokter/GridDetil'
		},
		listeners: {
			beforeload: function(store, operation) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});
	
	var gridDetil = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		sortableColumns: false,
		store: grupGridDetil,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kd_dokter',
			locked: true,
			menuDisabled: true,
			text: 'ID',
			width: 100
		},{
			dataIndex: 'fs_nm_dokter',
			locked: true,
			menuDisabled: true,
			text: 'Dokter',
			width: 150
		},{
			dataIndex: 'fs_email',
			menuDisabled: true,
			text: 'Email',
			width: 150
		},{
			dataIndex: 'fd_jatuh_tempo',
			menuDisabled: true,
			text: 'Jatuh Tempo',
			width: 80
		},{
			dataIndex: 'fs_kd_user',
			menuDisabled: true,
			text: 'User',
			width: 150
		},{
			dataIndex: 'fs_password',
			menuDisabled: true,
			text: 'User Pass',
			width: 150
		},{
			dataIndex: 'fs_tlp',
			menuDisabled: true,
			text: 'Telp',
			width: 150
		},{
			dataIndex: 'fs_alamat',
			menuDisabled: true,
			text: 'Alamat',
			width: 150
		},{
			dataIndex: 'fs_kota',
			menuDisabled: true,
			text: 'Kota',
			width: 150
		},{
			dataIndex: 'fs_nm_paket',
			menuDisabled: true,
			text: 'Paket',
			width: 150
		},{
			dataIndex: 'fs_nm_akses',
			menuDisabled: true,
			text: 'Akses',
			width: 150
		},{
			dataIndex: 'fs_nm_db',
			menuDisabled: true,
			text: 'DB',
			width: 200
		},{
			dataIndex: 'fs_status',
			hidden: true,
			menuDisabled: true,
			text: 'Status',
			width: 100
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridDetil
		}),
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Ketik id / nama dokter / email / telp / alamat / kota / nama db',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtCari',
				name: 'txtCari',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				},
				triggers: {
					reset: {
						cls: 'x-form-clear-trigger',
						handler: function(field) {
							field.setValue('');
							grupGridDetil.load();
						}
					},
					cari: {
						cls: 'x-form-search-trigger',
						handler: function() {
							grupGridDetil.load();
						}
					}
				}
			}]
		}],
		viewConfig: {
			markDirty: false,
			getRowClass: function(record) {
				var xwarna = '';
				if (record.get('fs_status') == 'KUNING') {
					xwarna = 'kuning-row';
				}
				else if (record.get('fs_status') == 'EXPIRED') {
					xwarna = 'expired-row';
				}
				else {
					xwarna = 'go-row';
				}
				return xwarna;
			}
		}
	});
	
	function fnCekSimpan(){
		if (this.up('form').getForm().isValid()) {
			
			Ext.Ajax.on('beforerequest', vMask.show, vMask);
			Ext.Ajax.on('requestcomplete', vMask.hide, vMask);
			Ext.Ajax.on('requestexception', vMask.hide, vMask);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'setupiddokter/CekSimpan',
				params: {
					'fs_kd_dokter': Ext.getCmp('cboID').getValue(),
					'fs_kd_user': Ext.getCmp('txtUser').getValue(),
					'fs_email': Ext.getCmp('txtEmail').getValue()
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
		Ext.Ajax.on('beforerequest', vMask.show, vMask);
		Ext.Ajax.on('requestcomplete', vMask.hide, vMask);
		Ext.Ajax.on('requestexception', vMask.hide, vMask);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'setupiddokter/Simpan',
			params: {
				'fs_kd_dokter': Ext.getCmp('cboID').getValue(),
				'fs_nm_dokter': Ext.getCmp('txtNama').getValue(),
				'fs_kd_user': Ext.getCmp('txtUser').getValue(),
				'fs_password': Ext.getCmp('txtPassword').getValue(),
				'fs_alamat': Ext.getCmp('txtAlamat').getValue(),
				'fs_kota': Ext.getCmp('txtKota').getValue(),
				'fs_tlp': Ext.getCmp('txtTlp').getValue(),
				'fs_email': Ext.getCmp('txtEmail').getValue(),
				'fs_kd_paket': Ext.getCmp('cboPaket').getValue(),
				'fs_kd_akses': Ext.getCmp('cboAkses').getValue(),
				'fs_nm_db': Ext.getCmp('cboDB').getValue(),
				'fd_simpan': Ext.Date.format(new Date(), 'Y-m-d H:i:s')
			},
			success: function(response, opts) {
				var xText = Ext.decode(response.responseText);
				/*
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					message: xText.hasil,
					title: 'DokterPraktek'
				});*/
				Ext.getCmp('cboID').setValue(xText.iddokter);
				fnSimpan2();
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
	
	function fnSimpan2() {
		Ext.Ajax.on('beforerequest', vMask.show, vMask);
		Ext.Ajax.on('requestcomplete', vMask.hide, vMask);
		Ext.Ajax.on('requestexception', vMask.hide, vMask);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'setupiddokter/SimpanUser',
			params: {
				'fs_kd_dokter': Ext.getCmp('cboID').getValue(),
				'fs_nm_dokter': Ext.getCmp('txtNama').getValue(),
				'fs_kd_user': Ext.getCmp('txtUser').getValue(),
				'fs_password': Ext.getCmp('txtPassword').getValue(),
				'fs_alamat': Ext.getCmp('txtAlamat').getValue(),
				'fs_kota': Ext.getCmp('txtKota').getValue(),
				'fs_tlp': Ext.getCmp('txtTlp').getValue(),
				'fs_email': Ext.getCmp('txtEmail').getValue(),
				'fs_kd_akses': Ext.getCmp('cboAkses').getValue(),
				'fs_nm_akses': Ext.getCmp('txtAkses').getValue(),
				'fs_nm_db': Ext.getCmp('cboDB').getValue(),
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
				grupGridDetil.load();
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
	
	function fnSimpanGrid() {
		var xdokter = '';
		var xbln = '';
		var xStore = gridBayar.getStore();
		
		xStore.each(function(record, idx) {
			if (trim(record.get('fs_nm_dokter')) !== '') {
				xdokter = xdokter +'|'+ record.get('fs_kd_dokter');
				xbln = xbln +'|'+ record.get('fs_kd_bln');
			}
		});
		
		if (xdokter === '') {
			Ext.MessageBox.show({
				buttons: Ext.MessageBox.OK,
				closable: false,
				icon: Ext.MessageBox.INFO,
				message: 'Grid masih kosong!',
				title: 'DokterPraktek'
			});
			return;
		}
		
		Ext.Ajax.on('beforerequest', vMask.show, vMask);
		Ext.Ajax.on('requestcomplete', vMask.hide, vMask);
		Ext.Ajax.on('requestexception', vMask.hide, vMask);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'setupiddokter/SimpanGrid',
			params: {
				'fs_kd_dokter': xdokter,
				'fs_kd_bln': xbln,
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
				Ext.getCmp('cboID').setValue(xText.iddokter);
				grupGridDetil.load();
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
		Ext.getCmp('cboID').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('txtUser').setValue('');
		Ext.getCmp('txtPassword').setValue('');
		Ext.getCmp('txtKota').setValue('');
		Ext.getCmp('txtAlamat').setValue('');
		Ext.getCmp('txtTlp').setValue('');
		Ext.getCmp('txtEmail').setValue('');
		Ext.getCmp('cboPaket').setValue('');
		Ext.getCmp('txtPaket').setValue('');
		Ext.getCmp('cboAkses').setValue('');
		Ext.getCmp('txtAkses').setValue('');
		Ext.getCmp('cboDB').setValue('');
		Ext.getCmp('txtCari').setValue('');
	}
	
	function fnReset2() {
		Ext.getCmp('cboDokter').setValue('');
		Ext.getCmp('txtDokter').setValue('');
		Ext.getCmp('txtEmail2').setValue('');
		Ext.getCmp('cboBulan').setValue('1');
		
		grupGridBayar.removeAll();
	}
	
	var frmSetupIdDokter = Ext.create('Ext.form.Panel', {
		border: false,
		floating: false,
		frame: true,
		region: 'center',
		title: 'Generate ID Dokter',
		width: 700,
		items: [{
			activeTab: 0,
			bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				height: 450,
				title: 'ID Dokter',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						anchor: '100%',
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 90,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [
								cboID
							]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container'
						}]
					}, 
						txtNama,
					{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [
								txtUser
							]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container'
						}]
					},
						txtPassword,
						txtAlamat,
						txtKota,
						txtTlp,
						txtEmail,
					{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [
								cboPaket,
								cboAkses
							]
						},{
							flex: 1.2,
							layout: 'anchor',
							xtype: 'container',
							items: [
								txtPaket,
								txtAkses
							]
						}]
					},
						cboDB
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					text: 'Simpan',
					handler: fnCekSimpan
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					handler: fnReset
				}]
			},{
				border: false,
				frame: false,
				title: 'Jatuh Tempo',
				xtype: 'form',
				items: [
					gridBayar
				],
				buttons: [{
					iconCls: 'icon-save',
					text: 'Simpan',
					handler: fnSimpanGrid
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					handler: fnReset2
				}]
			},{
				border: false,
				frame: false,
				title: 'List Dokter',
				xtype: 'form',
				items: [
					gridDetil
				]
			}]
		}]
	});
	
	var vMask = new Ext.LoadMask({
		msg: 'Silakan tunggu...',
		target: frmSetupIdDokter
	});
	
	frmSetupIdDokter.render(Ext.getBody());
	Ext.get('loading').destroy();
});