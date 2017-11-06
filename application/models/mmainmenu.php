<?php

class MMainMenu extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	function LoadMenu()
	{
		$xSQL = ("
			SELECT	fs_kd_menu, fs_kd_induk, fs_nm_menu,
					fs_nm_form
			FROM	tm_menu
		");
		
		$xSQL = $xSQL.("
			ORDER BY fs_kd_menu, fs_kd_induk
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}
?>