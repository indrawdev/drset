<?php

class MSearch extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	function KodeDokter_all($xKdDokter,$xNmDokter)
	{
		$xSQL = ("
			SELECT	a.fs_kd_dokter, a.fs_nm_dokter,
					a.fs_kd_user, a.fs_password, a.fs_alamat,
					a.fs_kota, a.fs_tlp, a.fs_email,
					a.fs_kd_paket, IFNULL(b.fs_nm_paket, '') fs_nm_paket,
					a.fs_kd_akses, IFNULL(c.fs_nm_paket, '') fs_nm_akses,
					a.fs_nm_db
			FROM 	tm_dokter a
			LEFT JOIN tm_paket b ON a.fs_kd_paket = b.fs_kd_paket
			LEFT JOIN tm_paket c ON a.fs_kd_akses = c.fs_kd_paket
		");
			
		if (trim($xKdDokter) <> '' or trim($xNmDokter) <> '')
		{
			$xSQL = $xSQL.("
				WHERE (a.fs_kd_dokter LIKE '%".trim($xKdDokter)."%'
				OR a.fs_nm_dokter LIKE '%".trim($xNmDokter)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY a.fs_kd_dokter, a.fs_nm_dokter
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function KodeDokter($xKdDokter,$xNmDokter,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	a.fs_kd_dokter, a.fs_nm_dokter,
					a.fs_kd_user, a.fs_password, a.fs_alamat,
					a.fs_kota, a.fs_tlp, a.fs_email,
					a.fs_kd_paket, IFNULL(b.fs_nm_paket, '') fs_nm_paket,
					a.fs_kd_akses, IFNULL(c.fs_nm_paket, '') fs_nm_akses,
					a.fs_nm_db
			FROM 	tm_dokter a
			LEFT JOIN tm_paket b ON a.fs_kd_paket = b.fs_kd_paket
			LEFT JOIN tm_paket c ON a.fs_kd_akses = c.fs_kd_paket
		");
			
		if (trim($xKdDokter) <> '' or trim($xNmDokter) <> '')
		{
			$xSQL = $xSQL.("
				WHERE (a.fs_kd_dokter LIKE '%".trim($xKdDokter)."%'
				OR a.fs_nm_dokter LIKE '%".trim($xNmDokter)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY a.fs_kd_dokter, a.fs_nm_dokter LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function KodeDokterAktifAll($xKdDokter,$xNmDokter)
	{
		$xSQL = ("
			SELECT	DISTINCT a.fs_kd_dokter, a.fs_nm_dokter, a.fs_email, a.fs_nm_db
			FROM 	tm_dokter a
		");
			
		if (trim($xKdDokter) <> '' or trim($xNmDokter) <> '')
		{
			$xSQL = $xSQL.("
				WHERE (a.fs_kd_dokter LIKE '%".trim($xKdDokter)."%'
				OR a.fs_nm_dokter LIKE '%".trim($xNmDokter)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY a.fs_kd_dokter, a.fs_nm_dokter
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function KodeDokterAktif($xKdDokter,$xNmDokter,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	DISTINCT a.fs_kd_dokter, a.fs_nm_dokter, a.fs_email, a.fs_nm_db
			FROM 	tm_dokter a
		");
			
		if (trim($xKdDokter) <> '' or trim($xNmDokter) <> '')
		{
			$xSQL = $xSQL.("
				WHERE (a.fs_kd_dokter LIKE '%".trim($xKdDokter)."%'
				OR a.fs_nm_dokter LIKE '%".trim($xNmDokter)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY a.fs_kd_dokter, a.fs_nm_dokter LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function KodePaketAll($xKdPaket,$xNmPaket)
	{
		$xSQL = ("
			SELECT	fs_kd_paket, fs_nm_paket
			FROM 	tm_paket
		");
			
		if (trim($xKdPaket) <> '' or trim($xNmPaket) <> '')
		{
			$xSQL = $xSQL.("
				WHERE (fs_kd_paket LIKE '%".trim($xKdPaket)."%'
				OR fs_nm_paket LIKE '%".trim($xNmPaket)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_kd_paket, fs_nm_paket
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function KodePaket($xKdPaket,$xNmPaket,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	fs_kd_paket, fs_nm_paket
			FROM 	tm_paket
		");
			
		if (trim($xKdPaket) <> '' or trim($xNmPaket) <> '')
		{
			$xSQL = $xSQL.("
				WHERE (fs_kd_paket LIKE '%".trim($xKdPaket)."%'
				OR fs_nm_paket LIKE '%".trim($xNmPaket)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_kd_paket, fs_nm_paket LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function KodePaketAktifAll($xKdPaket,$xNmPaket)
	{
		$xSQL = ("
			SELECT	fs_kd_paket, fs_nm_paket
			FROM 	tm_paket
			WHERE	fs_kd_paket LIKE '%PAKET%'
		");
			
		if (trim($xKdPaket) <> '' or trim($xNmPaket) <> '')
		{
			$xSQL = $xSQL.("
				AND (fs_kd_paket LIKE '%".trim($xKdPaket)."%'
				OR fs_nm_paket LIKE '%".trim($xNmPaket)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_kd_paket, fs_nm_paket
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function KodePaketAktif($xKdPaket,$xNmPaket,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	fs_kd_paket, fs_nm_paket
			FROM 	tm_paket
			WHERE	fs_kd_paket LIKE '%PAKET%'
		");
			
		if (trim($xKdPaket) <> '' or trim($xNmPaket) <> '')
		{
			$xSQL = $xSQL.("
				AND (fs_kd_paket LIKE '%".trim($xKdPaket)."%'
				OR fs_nm_paket LIKE '%".trim($xNmPaket)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_kd_paket, fs_nm_paket LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function KodePaketAksesAll($xKdPaket,$xNmPaket)
	{
		$xSQL = ("
			SELECT	fs_kd_paket, fs_nm_paket
			FROM 	tm_paket
			WHERE	fs_kd_paket LIKE '%AKSES%'
		");
			
		if (trim($xKdPaket) <> '' or trim($xNmPaket) <> '')
		{
			$xSQL = $xSQL.("
				AND (fs_kd_paket LIKE '%".trim($xKdPaket)."%'
				OR fs_nm_paket LIKE '%".trim($xNmPaket)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_kd_paket, fs_nm_paket
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function KodePaketAkses($xKdPaket,$xNmPaket,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	fs_kd_paket, fs_nm_paket
			FROM 	tm_paket
			WHERE	fs_kd_paket LIKE '%AKSES%'
		");
			
		if (trim($xKdPaket) <> '' or trim($xNmPaket) <> '')
		{
			$xSQL = $xSQL.("
				AND (fs_kd_paket LIKE '%".trim($xKdPaket)."%'
				OR fs_nm_paket LIKE '%".trim($xNmPaket)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY fs_kd_paket, fs_nm_paket LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}

?>