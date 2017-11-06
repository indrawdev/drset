<?php

class MSetupIdDokter extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	function CekKodeDokter($xKdDokter)
	{
		$xSQL = ("
			SELECT	fs_kd_dokter, fd_reg
			FROM	tm_dokter
			WHERE	fs_kd_dokter = '".trim($xKdDokter)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekKodeDokter2($xKdDokter)
	{
		$xSQL = ("
			SELECT	fs_kd_dokter
			FROM	tm_dokter
			WHERE	fs_kd_dokter = '".trim($xKdDokter)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekKodePetugas($xKdDokter,$xKdUser)
	{
		$xSQL = ("
			SELECT	fs_kd_dokter
			FROM	tm_dokter
			WHERE	fs_kd_dokter = '".trim($xKdDokter)."'
				AND	fs_kd_user = '".trim($xKdUser)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekEmail($sEmail,$xKdUser)
	{
		$xSQL = ("
			SELECT	fs_email, fs_kd_user
			FROM	tm_dokter
			WHERE	fs_email = '".trim($sEmail)."'
			ORDER BY fs_email, fs_kd_user, fs_nm_db LIMIT 1
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekKonter($xKdDokter)
	{
		$xSQL = ("
			SELECT	fs_kd_dokter
			FROM	tm_parameter
			WHERE	fs_kd_dokter = '".trim($xKdDokter)."'
			ORDER BY fs_kd_dokter LIMIT 1
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function KodeDokter($xKdDokter)
	{
		$xSQL = ("
			SELECT	fs_kd_dokter, fs_nm_dokter, fs_alamat,
					fs_tlp, fs_email, fs_nm_db,
					fs_kd_user, fs_password, fs_kota,
					fs_kd_paket, fs_kd_akses,
					fd_reg, fd_jatuh_tempo
			FROM 	tm_dokter
			WHERE 	fs_kd_dokter = '".trim($xKdDokter)."' LIMIT 1
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ListDB()
	{
		$xSQL = ("
			SHOW DATABASES
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ListDokterAll($xCari)
	{
		$xSQL = ("
			SELECT	a.fs_kd_dokter, a.fs_nm_dokter,
					a.fs_kd_user, a.fs_password, a.fs_alamat,
					a.fs_kota, a.fs_tlp, a.fs_email,
					a.fs_kd_paket, IFNULL(b.fs_nm_paket, '') fs_nm_paket,
					a.fs_kd_akses, IFNULL(c.fs_nm_paket, '') fs_nm_akses,
					DATE_FORMAT(a.fd_jatuh_tempo,'%d-%m-%Y') fd_jatuh_tempo, a.fs_nm_db,
					CASE
						WHEN CURDATE() >= a.fd_jatuh_tempo THEN 'EXPIRED'
						WHEN DATE_ADD(CURDATE(), INTERVAL 1 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 2 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 3 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 4 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 5 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 6 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 7 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						ELSE 'GO'
					END fs_status
			FROM 	tm_dokter a
			LEFT JOIN tm_paket b ON a.fs_kd_paket = b.fs_kd_paket
			LEFT JOIN tm_paket c ON a.fs_kd_akses = c.fs_kd_paket
		");
		
		if (trim($xCari) <> '')
		{
			$xSQL = $xSQL.("
				WHERE (a.fs_kd_dokter LIKE '%".trim($xCari)."%'
					OR a.fs_nm_dokter LIKE '%".trim($xCari)."%'
					OR a.fs_alamat LIKE '%".trim($xCari)."%'
					OR a.fs_tlp LIKE '%".trim($xCari)."%'
					OR a.fs_email LIKE '%".trim($xCari)."%'
					OR a.fs_nm_db LIKE '%".trim($xCari)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY a.fs_kd_dokter, a.fs_nm_dokter
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ListDokter($xCari,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT	a.fs_kd_dokter, a.fs_nm_dokter,
					a.fs_kd_user, a.fs_password, a.fs_alamat,
					a.fs_kota, a.fs_tlp, a.fs_email,
					a.fs_kd_paket, IFNULL(b.fs_nm_paket, '') fs_nm_paket,
					a.fs_kd_akses, IFNULL(c.fs_nm_paket, '') fs_nm_akses,
					DATE_FORMAT(a.fd_jatuh_tempo,'%d-%m-%Y') fd_jatuh_tempo, a.fs_nm_db,
					CASE
						WHEN CURDATE() >= a.fd_jatuh_tempo THEN 'EXPIRED'
						WHEN DATE_ADD(CURDATE(), INTERVAL 1 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 2 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 3 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 4 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 5 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 6 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						WHEN DATE_ADD(CURDATE(), INTERVAL 7 DAY) = a.fd_jatuh_tempo THEN 'KUNING'
						ELSE 'GO'
					END fs_status
			FROM 	tm_dokter a
			LEFT JOIN tm_paket b ON a.fs_kd_paket = b.fs_kd_paket
			LEFT JOIN tm_paket c ON a.fs_kd_akses = c.fs_kd_paket
		");
		
		if (trim($xCari) <> '')
		{
			$xSQL = $xSQL.("
				WHERE (a.fs_kd_dokter LIKE '%".trim($xCari)."%'
					OR a.fs_nm_dokter LIKE '%".trim($xCari)."%'
					OR a.fs_alamat LIKE '%".trim($xCari)."%'
					OR a.fs_tlp LIKE '%".trim($xCari)."%'
					OR a.fs_email LIKE '%".trim($xCari)."%'
					OR a.fs_nm_db LIKE '%".trim($xCari)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY a.fs_kd_dokter, a.fs_nm_dokter LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function CekTempo($xKdDokter)
	{
		$xSQL = ("
			SELECT	fd_jatuh_tempo
			FROM	tm_dokter
			WHERE	fs_kd_dokter = '".trim($xKdDokter)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function Tempo($xKdDokter,$sBln,$xTgl,$xStatus)
	{
		if ($xStatus == 0)
		{
			$xSQL = ("
				SELECT	DATE_ADD('".$xTgl."', INTERVAL ".trim($sBln)." MONTH) fd_jatuh_tempo
				FROM	tm_dokter
				WHERE	fs_kd_dokter = '".trim($xKdDokter)."'
			");
		}
		else
		{
			$xSQL = ("
				SELECT	DATE_ADD(fd_jatuh_tempo, INTERVAL ".trim($sBln)." MONTH) fd_jatuh_tempo
				FROM	tm_dokter
				WHERE	fs_kd_dokter = '".trim($xKdDokter)."'
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function TempoSet($xTgl,$sBln)
	{
		$xSQL = ("
			SELECT	DATE_ADD('".trim($xTgl)."', INTERVAL ".trim($sBln)." MONTH) fd_jatuh_tempo
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}
?>