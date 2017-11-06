<?php

class MSetupPaket extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	function LoadMenu($xKdUser)
	{
		$xSQL = ("
			SELECT	a.fs_kd_menu, a.fs_kd_induk, fs_nm_menu,
					fs_nm_form,
					CASE IFNULL((SELECT	h.fs_kd_menu
							FROM	tm_paketlevel h
							WHERE	h.fs_kd_menu = a.fs_kd_menu
								AND	fs_kd_level = '".trim($xKdUser)."'), '') WHEN '' THEN 'false' ELSE 'true' END fb_tambah
			FROM	tm_menu_dokter a
		");
		
		$xSQL = $xSQL.("
			ORDER BY fs_kd_menu, fs_kd_induk
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekKodePaket($xKdPaket)
	{
		$xSQL = ("
			SELECT	fs_kd_paket
			FROM	tm_paket
			WHERE	fs_kd_paket = '".trim($xKdPaket)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}
?>