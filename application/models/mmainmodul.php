<?php

class MMainModul extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	function AmbilKodeDokter($sPrefix)
	{
		$sSQL = $this->db->query("
			SELECT	IFNULL(CONCAT('".trim($sPrefix)."',LPAD(RIGHT(fn_dokter,5) + 1, 5, '0')), '".trim($sPrefix)."00001') fn_dokter
			FROM 	tm_parameter
			WHERE 	fn_dokter LIKE '".trim($sPrefix)."%'
			");
		return $sSQL;
	}
	
	function CekCaptcha($sCaptcha)
	{
		$xSQL = ("
			SELECT 	COUNT(*) AS fn_jml
			FROM 	captcha
			WHERE 	word = '".trim($sCaptcha)."'
				AND ip_address = '".trim($this->input->ip_address())."'
				AND captcha_time >= '".trim($this->session->userdata('vcpt'))."'
			");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	function ChangeDB($xNamaDB)
	{
		$config['hostname'] = 'localhost';
		$config['username'] = 'root';
		$config['password'] = 'root';
		$config['database'] = $xNamaDB;
		$config['dbdriver'] = 'mysql';
		$config['dbprefix'] = '';
		$config['pconnect'] = FALSE;
		$config['db_debug'] = TRUE;
		
		$this->load->database($config);
	}
	
	function Coding($xString)
	{
		$xLenStr = strlen(trim($xString));
		$xText = array();
		$xHasil = '';
		$xSisa = 0;
		for($i = 0; $i < $xLenStr; $i++)
		{
			$xHasil = $xHasil.chr((255 - ord(substr(trim($xString),$i,1))) + $xSisa);
			if ($i <> $xLenStr)
			{
				$xSisa = ord(substr(trim($xString),$i,1)) % 30;
			}
		}
		return $xHasil;
	}
	
	function Coding2($xString)
	{
		$xLenStr = strlen(trim($xString));
		$xText = array();
		$xHasil = '';
		for($i = 0; $i < $xLenStr; $i++)
		{
			$xText[$i] = chr(ord(substr(trim($xString),$i,1)) + 111);
			$xHasil = $xHasil.$xText[$i];
		}
		return $xHasil;
	}
	
	function CounterFieldCek($xField)
	{
		$sSQL = $this->db->query("
			SELECT	a.COLUMN_NAME
			FROM 	`information_schema`.`COLUMNS` a
			WHERE 	table_name = 'tm_parameter'
				AND a.COLUMN_NAME = '".trim($xField)."'
		");
		return $sSQL;
	}
	
	function CounterFieldLast()
	{
		$sSQL = $this->db->query("
			SELECT a.COLUMN_NAME fs_kolom
			FROM `information_schema`.`COLUMNS` a
			WHERE table_name = 'tm_parameter'
			ORDER BY a.ORDINAL_POSITION DESC LIMIT 1
		");
		return $sSQL;
	}
	
	function CounterAdd($xField,$xField1)
	{
		$sSQL = $this->db->query("
			ALTER TABLE tm_parameter
			ADD COLUMN ".trim($xField)." INTEGER UNSIGNED NOT NULL DEFAULT 0 AFTER ".trim($xField1)."
		");
		return $sSQL;
	}
	
	function CounterDel($xField)
	{
		$sSQL = $this->db->query("
			ALTER TABLE tm_parameter
			DROP COLUMN ".trim($xField)."
		");
		return $sSQL;
	}
	
	function Decoding($xString)
	{
		$xLenStr = strlen(trim($xString));
		$xText = array();
		$xHasil = '';
		$xSisa = 0;
		for($i = 0; $i < $xLenStr; $i++)
		{
			$xHasil = $xHasil.chr((255 - ord(substr(trim($xString),$i,1))) - $xSisa);
			if ($i <> $xLenStr)
			{
				$xSisa = ord(substr(trim($xString),$i,1)) % 30;
			}
		}
		return $xHasil;
	}
	
	function Decoding2($xString)
	{
		$xLenStr = strlen(trim($xString))-1;
		$xText = array();
		$xHasil = '';
		for($i = 0; $i <= $xLenStr; $i++)
		{
			$xText[$i] = chr(ord(substr(trim($xString),$i,1)) - 111);
			$xHasil = $xHasil.$xText[$i];
		}
		return $xHasil;
	}
	
	function MicrotimeFloat()
	{
		 list($usec, $sec) = explode(" ", microtime());
		 return round(((float)$usec + (float)$sec));
	}
	
	function BuatPDF($xNmFile)
	{
		error_reporting(E_ALL);
		ini_set('display_errors', TRUE);
		ini_set('display_startup_errors', TRUE);

		define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');
		
		$xlibPath = APPPATH.'../application/libraries/';
		$xPath = APPPATH.'../temp/';
		
		require_once $xlibPath.'PHPExcel/PHPExcel.php';
		
		$rendererName = PHPExcel_Settings::PDF_RENDERER_MPDF;
		$rendererLibraryPath = $xlibPath.'MPDF57/';
		
		$xoReader = PHPExcel_IOFactory::createReader('Excel5');
		$xoExcel = $xoReader->load($xPath.trim($xNmFile).'.xls');
		
		try {
			if (!PHPExcel_Settings::setPdfRenderer(
				$rendererName,
				$rendererLibraryPath
			)) {
				echo (
					'NOTICE: Please set the $rendererName and $rendererLibraryPath values' .
					EOL .
					'at the top of this script as appropriate for your directory structure' .
					EOL
				);
			} else {
				$xoWriter = PHPExcel_IOFactory::createWriter($xoExcel, 'PDF');
				$xoWriter->save(str_replace('.php', '.pdf', $xPath.trim($xNmFile).'.pdf'));
			}
		} catch (Exception $e) {
		}
	}
	
	function TabelSesi()
	{
		$sSQL = $this->db->query("
			IF NOT EXISTS (	SELECT	name 
							FROM   	sysobjects (NOLOCK)
							WHERE  	name = 'CI_Sessions' 
								AND	type = 'U')
			BEGIN
				CREATE TABLE CI_Sessions (
					session_id VARCHAR(40) DEFAULT '0' NOT NULL,
					ip_address VARCHAR(16) DEFAULT '0' NOT NULL,
					user_agent VARCHAR(120) NOT NULL,
					last_activity INT DEFAULT 0 NOT NULL,
					user_data VARCHAR(8000) NOT NULL,
					CONSTRAINT  PK_CI_Session PRIMARY KEY (session_id ASC)
				)
			
				CREATE NONCLUSTERED INDEX NCI_Session_Activity
				ON CI_Sessions(last_activity DESC)
			END 
		");
		return $sSQL;
	}
	
	function TabelCaptcha()
	{
		$sSQL = $this->db->query("
			IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[captcha]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
			DROP TABLE [dbo].[captcha]
			
			CREATE TABLE [dbo].[captcha] (
				[captcha_id]	[BIGINT] IDENTITY (1, 1) NOT NULL,
				[captcha_time] 	[VARCHAR] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL DEFAULT ('0'),
				[ip_address] 	[VARCHAR] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL DEFAULT ('0'),
				[word] 			[VARCHAR] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL DEFAULT (' ')
			) ON [PRIMARY]
		");
		return $sSQL;
	}
	
	function TglDMY($sStr)
	{
		// 3000-01-01
		$xHasil = substr(trim($sStr),8,2).'-'.substr(trim($sStr),5,2).'-'.substr(trim($sStr),0,4);
		return $xHasil;
	}
	
	function TglYmd($sStr)
	{
		// 01-01-3000
		$xHasil = substr(trim($sStr),6,4).'-'.substr(trim($sStr),3,2).'-'.substr(trim($sStr),0,2);
		return $xHasil;
	}
	
	function ValidUserPass($xKdUser)
	{
		$xSQL = ("
			SELECT	IFNULL(fs_kd_user, '') fs_kd_user, IFNULL(fs_nm_user, '') fs_nm_user, IFNULL(fs_password, '') fs_password
			FROM	tm_user
			WHERE	fs_kd_user = '".trim($xKdUser)."'
			");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}
?>