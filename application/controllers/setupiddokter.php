<?php

class SetupIdDokter extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		if (trim($this->session->userdata('gUserLevel')) <> '')
		{
			$this->load->view('vsetupiddokter');
		}
		else
		{
			redirect('','refresh');
		}
	}
	
	function KodeDokter()
	{
		$this->load->database();
		
		$xKdDokter = trim($this->input->post('fs_kd_dokter'));
		$xNmDokter = trim($this->input->post('fs_nm_dokter'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->KodeDokter_all($xKdDokter,$xNmDokter);
		$xTotal = $sSQL->num_rows();
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->KodeDokter($xKdDokter,$xNmDokter,$nStart,$nLimit);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			$xKey = 'dr';
			foreach ($sSQL->result() as $xRow)
			{
				if (trim($xRow->fs_password) == '')
				{
					$xKdPass = '';
				}
				else
				{
					if (trim($xRow->fs_password) == trim($xRow->fs_kd_user))
					{
						$xKdPass = trim($xRow->fs_password);
					}
					else
					{
						$xKdPass = $this->encrypt->decode(trim($xRow->fs_password),$xKey);
					}
				}
				
				$xArr[] = array(
					'fs_kd_dokter'	=> ascii_to_entities(trim($xRow->fs_kd_dokter)),
					'fs_nm_dokter'	=> ascii_to_entities(trim($xRow->fs_nm_dokter)),
					'fs_kd_user'	=> ascii_to_entities(trim($xRow->fs_kd_user)),
					'fs_password'	=> ascii_to_entities(trim($xKdPass)),
					'fs_alamat'		=> ascii_to_entities(trim($xRow->fs_alamat)),
					
					'fs_kota'		=> ascii_to_entities(trim($xRow->fs_kota)),
					'fs_tlp'		=> ascii_to_entities(trim($xRow->fs_tlp)),
					'fs_email'		=> ascii_to_entities(trim($xRow->fs_email)),
					'fs_kd_paket'	=> ascii_to_entities(trim($xRow->fs_kd_paket)),
					'fs_nm_paket'	=> ascii_to_entities(trim($xRow->fs_nm_paket)),
					
					'fs_kd_akses'	=> ascii_to_entities(trim($xRow->fs_kd_akses)),
					'fs_nm_akses'	=> ascii_to_entities(trim($xRow->fs_nm_akses)),
					'fs_nm_db'		=> ascii_to_entities(trim($xRow->fs_nm_db))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function KodeDokterAktif()
	{
		$this->load->database();
		
		$xKdDokter = trim($this->input->post('fs_kd_dokter'));
		$xNmDokter = trim($this->input->post('fs_nm_dokter'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->KodeDokterAktifAll($xKdDokter,$xNmDokter);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->KodeDokterAktif($xKdDokter,$xNmDokter,$nStart,$nLimit);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kd_dokter'	=> ascii_to_entities(trim($xRow->fs_kd_dokter)),
					'fs_nm_dokter'	=> ascii_to_entities(trim($xRow->fs_nm_dokter)),
					'fs_email'		=> ascii_to_entities(trim($xRow->fs_email)),
					'fs_nm_db'		=> ascii_to_entities(trim($xRow->fs_nm_db))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function ListDB()
	{
		$this->load->database();
		
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		$this->load->model('mSetupIdDokter');
		$sSQL = $this->mSetupIdDokter->ListDB();
		
		$xTotal = 0;
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				// echo trim($xRow->Database)."</br>";
				// echo strpos(trim($xRow->Database), 'drpraktek');
				// if (strpos(strtolower(trim($xRow->Database)), 'drpraktek') == '')
				// {
					if ($xTotal >= $nStart and $xTotal <= $nLimit)
					{
						$xArr[] = array(
							'fs_nm_db'	=> ascii_to_entities(trim(strtoupper($xRow->Database)))
						);
					}
					$xTotal++;
				// }
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function GridBayar()
	{
		$this->load->database();
		
		$xCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSetupIdDokter');
		$sSQL = $this->mSetupIdDokter->ListDokterAll($xCari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSetupIdDokter->ListDokter($xCari,$nStart,$nLimit);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kd_dokter'	=> ascii_to_entities(trim($xRow->fs_kd_dokter)),
					'fs_nm_dokter'	=> ascii_to_entities(trim($xRow->fs_nm_dokter)),
					'fs_email'		=> ascii_to_entities(trim($xRow->fs_email)),
					'fs_kd_bln'		=> ascii_to_entities(trim($xRow->fs_kd_bln))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function GridDetil()
	{
		$this->load->database();
		
		$xCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSetupIdDokter');
		$sSQL = $this->mSetupIdDokter->ListDokterAll($xCari);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSetupIdDokter->ListDokter($xCari,$nStart,$nLimit);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			$xKey = 'dr';
			foreach ($sSQL->result() as $xRow)
			{
				if (trim($xRow->fs_password) == '')
				{
					$xKdPass = '';
				}
				else
				{
					if (trim($xRow->fs_password) == trim($xRow->fs_kd_user))
					{
						$xKdPass = trim($xRow->fs_password);
					}
					else
					{
						$xKdPass = $this->encrypt->decode(trim($xRow->fs_password),$xKey);
					}
				}
				
				$xArr[] = array(
					'fs_kd_dokter'		=> ascii_to_entities(trim($xRow->fs_kd_dokter)),
					'fs_nm_dokter'		=> ascii_to_entities(trim($xRow->fs_nm_dokter)),
					'fs_kd_user'		=> ascii_to_entities(trim($xRow->fs_kd_user)),
					'fs_password'		=> ascii_to_entities(trim($xKdPass)),
					'fs_alamat'			=> ascii_to_entities(trim($xRow->fs_alamat)),
					
					'fs_kota'			=> ascii_to_entities(trim($xRow->fs_kota)),
					'fs_tlp'			=> ascii_to_entities(trim($xRow->fs_tlp)),
					'fs_email'			=> ascii_to_entities(trim($xRow->fs_email)),
					'fd_jatuh_tempo'	=> ascii_to_entities(trim($xRow->fd_jatuh_tempo)),
					'fs_kd_paket'		=> ascii_to_entities(trim($xRow->fs_kd_paket)),
					
					'fs_nm_paket'		=> ascii_to_entities(trim($xRow->fs_nm_paket)),
					'fs_kd_akses'		=> ascii_to_entities(trim($xRow->fs_kd_akses)),
					'fs_nm_akses'		=> ascii_to_entities(trim($xRow->fs_nm_akses)),
					'fs_nm_db'			=> ascii_to_entities(trim($xRow->fs_nm_db)),
					'fs_status'			=> ascii_to_entities(trim($xRow->fs_status))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function CekSimpan()
	{
		$this->load->database();
		
		$xKdDokter = trim($this->input->post('fs_kd_dokter'));
		$xKdPetugas = trim($this->input->post('fs_kd_user'));
		$xEmail = trim($this->input->post('fs_email'));
		
		if (trim($xKdDokter) == '' or trim($xKdDokter) == 'OTOMATIS')
		{
			$this->load->model('mSetupIdDokter');
			$sSQL = $this->mSetupIdDokter->CekEmail($xEmail,$xKdPetugas);
			
			if ($sSQL->num_rows() > 0)
			{
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Simpan Gagal, Email & User sudah pernah ada!!'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'lanjut'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$this->load->model('mSetupIdDokter');
			$sSQL = $this->mSetupIdDokter->CekKodeDokter($xKdDokter);
			
			if ($sSQL->num_rows() > 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'ID Dokter sudah ada, Apakah Anda ingin meng-update?'
				);
				echo json_encode($xHasil);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> false,
					'hasil'		=> 'Simpan Gagal, ID Dokter tidak diketahui!!'
				);
				echo json_encode($xHasil);
			}
		}
	}
	
	function Simpan()
	{
		$this->load->database();
		
		$xKdDokter = trim($this->input->post('fs_kd_dokter'));
		$xNmDokter = trim($this->input->post('fs_nm_dokter'));
		$xAlamat = trim($this->input->post('fs_alamat'));
		$xKota = trim($this->input->post('fs_kota'));
		$xTelp = trim($this->input->post('fs_tlp'));
		
		$xEmail = trim($this->input->post('fs_email'));
		$xKdPaket = trim($this->input->post('fs_kd_paket'));
		$xKdAkses = trim($this->input->post('fs_kd_akses'));
		$xNmDB = trim($this->input->post('fs_nm_db'));
		$xKdPetugas = trim($this->input->post('fs_kd_user'));
		
		$xKdPass = trim($this->input->post('fs_password'));
		$xTglSimpan = trim($this->input->post('fd_simpan'));
		$xTglReg = substr(trim($xTglSimpan), 0, 10);
		$xTglTempo = substr(trim($xTglSimpan), 0, 10);
		
		$xUpdate = false;
		$this->load->model('mSetupIdDokter');
		$sSQL = $this->mSetupIdDokter->CekKodeDokter($xKdDokter);
		
		if ($sSQL->num_rows() > 0)
		{
			$xUpdate = true;
		}
		else
		{
			$this->db->trans_begin();
			$xPrefix = date('ym');
			
			$this->load->model('mMainModul');
			$sSQL = $this->mMainModul->AmbilKodeDokter($xPrefix);
			
			if ($sSQL->num_rows() > 0)
			{
				$sSQL = $sSQL->row();
				$xKdDokter = $sSQL->fn_dokter;
				$xData = array(
					'fn_dokter' => $xKdDokter
				);
				
				$this->db->update('tm_parameter', $xData);
			}
			else
			{
				$xKdDokter = $xPrefix.'00001';
				$xData = array(
					'fn_dokter' => $xKdDokter
				);
				
				$this->db->update('tm_parameter', $xData);
			}
			
			$xUpdate = false;
			$xKdDokter = '88'.$xKdDokter;
			$this->db->trans_commit();
		}
		
		$this->load->model('mSetupIdDokter');
		$sSQL = $this->mSetupIdDokter->TempoSet($xTglTempo,'1');
		
		if ($sSQL->num_rows() > 0)
		{
			$sSQL = $sSQL->row();
			$xTglTempo = $sSQL->fd_jatuh_tempo;
		}
		
		$xUpdate2 = false;
		if ($xUpdate == true)
		{
			$this->load->model('mSetupIdDokter');
			$sSQL = $this->mSetupIdDokter->CekKodePetugas($xKdDokter,$xKdPetugas);
			
			if ($sSQL->num_rows() > 0)
			{
				$xUpdate2 = true;
			}
			else
			{
				$xUpdate2 = false;
			}
		}
		else
		{
			$xUpdate2 = false;
		}
		
		
		$xKey = 'dr';
		$xKdPass = $this->encrypt->encode($xKdPass,$xKey);
		
		if (($xUpdate == false and $xUpdate2 == false) or	// kddokter tdk ada, user tdk ada
			($xUpdate == false and $xUpdate2 == true) or	// kddokter tdk ada, user ada
			($xUpdate == true and $xUpdate2 == false))		// kddokter ada, user tidak ada
		{
			$xDt = array(
				'fs_kd_dokter'		=> trim($xKdDokter),
				'fs_nm_dokter'		=> trim($xNmDokter),
				'fs_kd_user'		=> trim($xKdPetugas),
				'fs_password'		=> trim($xKdPass),
				'fs_alamat'			=> trim($xAlamat),
				
				'fs_kota'			=> trim($xKota),
				'fs_tlp'			=> trim($xTelp),
				'fs_email'			=> trim($xEmail),
				'fs_kd_paket'		=> trim($xKdPaket),
				'fs_kd_akses'		=> trim($xKdAkses),
				
				'fd_reg'			=> trim($xTglReg),
				'fd_jatuh_tempo'	=> trim($xTglTempo),
				'fs_nm_db'			=> trim($xNmDB)
			);
			
			if (trim($xKdDokter) <> '')
			{
				$xDt2 = array(
					'fs_usr'	=> trim($this->session->userdata('gUser')),
					'fd_usr'	=> trim($xTglSimpan),
					'fs_upd'	=> trim($this->session->userdata('gUser')),
					'fd_upd'	=> trim($xTglSimpan)
				);
				$xData = array_merge($xDt,$xDt2);
				
				$this->db->insert('tm_dokter', $xData);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Simpan Gagal, ID Dokter tidak diketahui!!<br>Silakan coba lagi kemudian...'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$this->load->model('mSetupIdDokter');
			$sSQL = $this->mSetupIdDokter->KodeDokter($xKdDokter);
			
			if ($sSQL->num_rows() > 0)
			{
				$sSQL = $sSQL->row();
				$TglReg = $sSQL->fd_reg;
				$TglJatuhTempo = $sSQL->fd_jatuh_tempo;
			}
			
			$xDt = array(
				'fs_kd_dokter'		=> trim($xKdDokter),
				'fs_nm_dokter'		=> trim($xNmDokter),
				'fs_kd_user'		=> trim($xKdPetugas),
				'fs_password'		=> trim($xKdPass),
				'fs_alamat'			=> trim($xAlamat),
				
				'fs_kota'			=> trim($xKota),
				'fs_tlp'			=> trim($xTelp),
				'fs_email'			=> trim($xEmail),
				'fs_kd_paket'		=> trim($xKdPaket),
				'fs_kd_akses'		=> trim($xKdAkses),
				
				'fd_reg'			=> trim($TglReg),
				'fd_jatuh_tempo'	=> trim($TglJatuhTempo),
				'fs_nm_db'			=> trim($xNmDB)
			);
			
			$xDt2 = array(
				'fs_upd'	=> trim($this->session->userdata('gUser')),
				'fd_upd'	=> trim($xTglSimpan)
			);
			$xData = array_merge($xDt,$xDt2);
			
			$xWhere = "fs_kd_dokter = '".trim($xKdDokter)."'
					AND fs_kd_user = '".trim($xKdPetugas)."'";
			
			$this->db->where($xWhere);
			$this->db->update('tm_dokter', $xData);
		}
		
		$xHasil = array(
			'sukses'	=> true,
			'hasil'		=> 'Simpan Sukses',
			'iddokter'	=> $xKdDokter
		);
		echo json_encode($xHasil);
	}
	
	function SimpanUser()
	{
		$xKdDokter = trim($this->input->post('fs_kd_dokter'));
		$xNmDokter = trim($this->input->post('fs_nm_dokter'));
		$xAlamat = trim($this->input->post('fs_alamat'));
		$xKota = trim($this->input->post('fs_kota'));
		$xTelp = trim($this->input->post('fs_tlp'));
		
		$xEmail = trim($this->input->post('fs_email'));
		$xKdAkses = trim($this->input->post('fs_kd_akses'));
		$xNmAkses = trim($this->input->post('fs_nm_akses'));
		$xNmDB = strtolower(trim($this->input->post('fs_nm_db')));
		$xKdPetugas = trim($this->input->post('fs_kd_user'));
		
		$xKdPass = trim($this->input->post('fs_password'));
		$xTglSimpan = trim($this->input->post('fd_simpan'));
		
		//change db
		$this->load->model('mMainModul');
		$this->mMainModul->ChangeDB($xNmDB);
		//eof change db
		
		$xUpdate = false;
		$this->load->model('mSetupIdDokter');
		$sSQL = $this->mSetupIdDokter->CekKodeDokter2($xKdDokter);
		
		if ($sSQL->num_rows() > 0)
		{
			$xUpdate = true;
		}
		
		//Hapus user
		$xWhere = "fs_kd_dokter = '".trim($xKdDokter)."'
				AND fs_kd_user = '".trim($xKdPetugas)."'";
		
		$this->db->where($xWhere);
		$this->db->delete('tm_user');
		//eof Hapus user
		
		$xKey = 'dr';
		$xKdPass = $this->encrypt->encode($xKdPass,$xKey);
		
		$xData = array(
			'fs_kd_dokter'	=> trim($xKdDokter),
			'fs_kd_user' 	=> trim($xKdPetugas),
			'fs_nm_user' 	=> trim($xKdPetugas),
			'fs_password' 	=> trim($xKdPass),
			'fs_kd_akses'	=> trim($xKdAkses),
			
			'fs_nm_akses'	=> trim($xNmAkses),
			'fs_usr' 		=> trim($this->session->userdata('gUser')),
			'fd_usr' 		=> trim($xTglSimpan),
			'fs_upd' 		=> trim($this->session->userdata('gUser')),
			'fd_upd' 		=> trim($xTglSimpan)
		);
		$this->db->insert('tm_user', $xData);
		
		
		$xData = array(
			'fs_kd_dokter'	=> trim($xKdDokter),
			'fs_nm_dokter' 	=> trim($xNmDokter),
			'fs_alamat' 	=> trim($xAlamat),
			'fs_kota' 		=> trim($xKota),
			'fs_tlp' 		=> trim($xTelp),
			'fs_email' 		=> trim($xEmail)
		);
		
		if ($xUpdate == false)
		{
			$this->db->insert('tm_dokter', $xData);
		}
		else
		{
			$xWhere = "fs_kd_dokter = '".trim($xKdDokter)."'";
			
			$this->db->where($xWhere);
			$this->db->update('tm_dokter', $xData);
		}
		
		$xUpdate2 = false;
		$this->load->model('mSetupIdDokter');
		$sSQL = $this->mSetupIdDokter->CekKonter($xKdDokter);
		
		if ($sSQL->num_rows() > 0)
		{
			$xUpdate2 = true;
		}
		
		if ($xUpdate2 == false)
		{
			$xData2 = array(
				'fs_kd_dokter' => trim($xKdDokter)
			);
			$this->db->insert('tm_parameter', $xData2);
		}
		
		$xUpdate = false;
		if ($xUpdate == false)
		{
			$xHasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Simpan Sukses'
			);
			echo json_encode($xHasil);
		}
		else
		{
			$xHasil = array(
				'sukses'	=> true,
				'hasil'		=> 'Simpan Update Sukses'
			);
			echo json_encode($xHasil);
		}
	}
	
	function SimpanGrid()
	{
		$this->load->database();
		
		$xKdDokter = explode('|', trim($this->input->post('fs_kd_dokter')));
		$xBln = explode('|', trim($this->input->post('fs_kd_bln')));
		$xTglSimpan = trim($this->input->post('fd_simpan'));
		
		$xJml = count($xKdDokter) - 1;
		if ($xJml != 0)
		{
			for ($i=1; $i<=$xJml; $i++)
			{
				$xTglTempo = substr(trim($xTglSimpan), 0, 10);
				$xTglJatuhTempo = $xTglTempo;
				
				$this->load->model('mSetupIdDokter');
				$sSQL = $this->mSetupIdDokter->CekTempo($xKdDokter[$i]);
				
				if ($sSQL->num_rows() > 0)
				{
					$sSQL = $sSQL->row();
					$xTglJatuhTempo = $sSQL->fd_jatuh_tempo;
				}
				
				$xStatus = 0;
				if (trim($xTglJatuhTempo) >= trim($xTglTempo))
				{
					$xStatus = 1;
				}
				
				$this->load->model('mSetupIdDokter');
				$sSQL = $this->mSetupIdDokter->Tempo($xKdDokter[$i],$xBln[$i],$xTglTempo,$xStatus);
				
				if ($sSQL->num_rows() > 0)
				{
					$sSQL = $sSQL->row();
					$xTglTempo = $sSQL->fd_jatuh_tempo;
				}
				
				$xData = array(
					'fd_jatuh_tempo'	=> trim($xTglTempo),
					'fs_upd'			=> trim($this->session->userdata('gUser')),
					'fd_upd'			=> trim($xTglSimpan)
				);
				
				$xWhere = "fs_kd_dokter = '".trim($xKdDokter[$i])."'";
				
				$this->db->where($xWhere);
				$this->db->update('tm_dokter', $xData);
			}
		}
		
		$xHasil = array(
			'sukses'	=> true,
			'hasil'		=> 'Simpan Update Sukses'
		);
		echo json_encode($xHasil);
	}
}
?>