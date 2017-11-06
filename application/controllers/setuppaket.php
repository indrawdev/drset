<?php

class SetupPaket extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	
	function index()
	{
		if (trim($this->session->userdata('gUserLevel')) <> '')
		{
			$this->load->view('vsetuppaket');
		}
		else
		{
			redirect('','refresh');
		}
	}
	
	function AmbilNodes()
	{
		if (trim($this->input->post('fs_kd_level')) <> '')
		{
			$xKdPaket = trim($this->input->post('fs_kd_level'));
		}
		else
		{
			$xKdPaket = trim($this->input->post('fs_kd_paket'));
		}
		
		$this->load->model('mSetupPaket');
		$sSQL = $this->mSetupPaket->LoadMenu($xKdPaket);
		
		$xArr0 = array();
		$xArr1 = array();
		$xArr2 = array();
		$xArr3 = array();
		$xArr4 = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow0)
			{
				if (trim($xRow0->fs_kd_induk) == '00')
				{
					
					$i = 0;
					foreach ($sSQL->result() as $xRow1)
					{
						if (strlen(trim($xRow1->fs_kd_induk)) == strlen(trim($xRow0->fs_kd_menu))
							and trim($xRow1->fs_kd_induk) == trim($xRow0->fs_kd_menu))
						{
							++$i;
						}
					}
					
					if ($i == 0)
					{
						$xArr0[] = array(
							'fs_kd_menu'	=> $xRow0->fs_kd_menu,
							'fs_nm_menu'	=> $xRow0->fs_nm_menu,
							'fb_tambah'		=> $xRow0->fb_tambah,
							'leaf'			=> true
						);
					}
					else
					{
						$xArr1 = array();
						foreach ($sSQL->result() as $xRow1)
						{
							if (strlen(trim($xRow1->fs_kd_induk)) == strlen(trim($xRow0->fs_kd_menu))
								and trim($xRow1->fs_kd_induk) == trim($xRow0->fs_kd_menu))
							{
								
								$i = 0;
								foreach ($sSQL->result() as $xRow2)
								{
									if (strlen(trim($xRow2->fs_kd_induk)) == strlen(trim($xRow1->fs_kd_menu))
										and trim($xRow2->fs_kd_induk) == trim($xRow1->fs_kd_menu))
									{
										++$i;
									}
								}
								
								if ($i == 0)
								{
									$xArr1[] = array(
										'fs_kd_menu'	=> $xRow1->fs_kd_menu,
										'fs_nm_menu'	=> $xRow1->fs_nm_menu,
										'fb_tambah'		=> $xRow1->fb_tambah,
										'leaf'			=> true
									);
								}
								else
								{
									$xArr2 = array();
									foreach ($sSQL->result() as $xRow2)
									{
										if (strlen(trim($xRow2->fs_kd_induk)) == strlen(trim($xRow1->fs_kd_menu))
											and trim($xRow2->fs_kd_induk) == trim($xRow1->fs_kd_menu))
										{
											
											$i = 0;
											foreach ($sSQL->result() as $xRow3)
											{
												if (strlen(trim($xRow3->fs_kd_induk)) == strlen(trim($xRow2->fs_kd_menu))
													and trim($xRow3->fs_kd_induk) == trim($xRow2->fs_kd_menu))
												{
													++$i;
												}
											}
											
											if ($i == 0)
											{
												$xArr2[] = array(
													'fs_kd_menu'	=> $xRow2->fs_kd_menu,
													'fs_nm_menu'	=> $xRow2->fs_nm_menu,
													'fb_tambah'		=> $xRow2->fb_tambah,
													'leaf'			=> true
												);
											}
											else
											{
												$xArr3 = array();
												foreach ($sSQL->result() as $xRow3)
												{
													if (strlen(trim($xRow3->fs_kd_induk)) == strlen(trim($xRow2->fs_kd_menu))
														and trim($xRow3->fs_kd_induk) == trim($xRow2->fs_kd_menu))
													{
														
														$i = 0;
														foreach ($sSQL->result() as $xRow4)
														{
															if (strlen(trim($xRow4->fs_kd_induk)) == strlen(trim($xRow3->fs_kd_menu))
																and trim($xRow4->fs_kd_induk) == trim($xRow3->fs_kd_menu))
															{
																++$i;
															}
														}
														
														if ($i == 0)
														{
															$xArr3[] = array(
																'fs_kd_menu'	=> $xRow3->fs_kd_menu,
																'fs_nm_menu'	=> $xRow3->fs_nm_menu,
																'fb_tambah'		=> $xRow3->fb_tambah,
																'leaf'			=> true
															);
														}
														else
														{
															$xArr4 = array();
															foreach ($sSQL->result() as $xRow4)
															{
																if (strlen(trim($xRow4->fs_kd_induk)) == strlen(trim($xRow3->fs_kd_menu))
																	and trim($xRow4->fs_kd_induk) == trim($xRow3->fs_kd_menu))
																{
																	$xArr4[] = array(
																		'fs_kd_menu'	=> $xRow4->fs_kd_menu,
																		'fs_nm_menu'	=> $xRow4->fs_nm_menu,
																		'fb_tambah'		=> $xRow4->fb_tambah,
																		'leaf'			=> true
																	);
																}
															}
															$xArr3[] = array(
																'fs_kd_menu'	=> $xRow3->fs_kd_menu,
																'fs_nm_menu'	=> $xRow3->fs_nm_menu,
																'fb_tambah'		=> $xRow3->fb_tambah,
																'expanded'		=> true,
																'leaf'			=> false,
																'children'		=> $xArr4
															);
														}
													}
												}
												$xArr2[] = array(
													'fs_kd_menu'	=> $xRow2->fs_kd_menu,
													'fs_nm_menu'	=> $xRow2->fs_nm_menu,
													'fb_tambah'		=> $xRow2->fb_tambah,
													'expanded'		=> true,
													'leaf'			=> false,
													'children'		=> $xArr3
												);
											}
										}
									}
									$xArr1[] = array(
										'fs_kd_menu'	=> $xRow1->fs_kd_menu,
										'fs_nm_menu'	=> $xRow1->fs_nm_menu,
										'fb_tambah'		=> $xRow1->fb_tambah,
										'expanded'		=> true,
										'leaf'			=> false,
										'children'		=> $xArr2
									);
								}
							}
						}
						$xArr0[] = array(
							'fs_kd_menu'	=> $xRow0->fs_kd_menu,
							'fs_nm_menu'	=> $xRow0->fs_nm_menu,
							'fb_tambah'		=> $xRow0->fb_tambah,
							'expanded'		=> true,
							'leaf'			=> false,
							'children'		=> $xArr1
						);
					}
				}
			}
		}
		echo json_encode($xArr0);
	}
	
	function KodePaket()
	{
		$xKdPaket = trim($this->input->post('fs_kd_paket'));
		$xNmPaket = trim($this->input->post('fs_nm_paket'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->KodePaketAll($xKdPaket,$xNmPaket);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->KodePaket($xKdPaket,$xNmPaket,$nStart,$nLimit);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kd_paket'	=> ascii_to_entities(trim($xRow->fs_kd_paket)),
					'fs_nm_paket'	=> ascii_to_entities(trim($xRow->fs_nm_paket))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function KodePaketAktif()
	{
		$xKdPaket = trim($this->input->post('fs_kd_paket'));
		$xNmPaket = trim($this->input->post('fs_nm_paket'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->KodePaketAktifAll($xKdPaket,$xNmPaket);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->KodePaketAktif($xKdPaket,$xNmPaket,$nStart,$nLimit);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kd_paket'	=> ascii_to_entities(trim($xRow->fs_kd_paket)),
					'fs_nm_paket'	=> ascii_to_entities(trim($xRow->fs_nm_paket))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function KodePaketAkses()
	{
		$xKdPaket = trim($this->input->post('fs_kd_paket'));
		$xNmPaket = trim($this->input->post('fs_nm_paket'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->load->model('mSearch');
		$sSQL = $this->mSearch->KodePaketAksesAll($xKdPaket,$xNmPaket);
		$xTotal = $sSQL->num_rows();
		
		$sSQL = $this->mSearch->KodePaketAkses($xKdPaket,$xNmPaket,$nStart,$nLimit);
		
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
					'fs_kd_paket'	=> ascii_to_entities(trim($xRow->fs_kd_paket)),
					'fs_nm_paket'	=> ascii_to_entities(trim($xRow->fs_nm_paket))
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
	
	function CekSimpan()
	{
		$xKdPaket = trim($this->input->post('fs_kd_paket'));
		
		if (trim($xKdPaket) == '')
		{
			$xHasil = array(
				'sukses'	=> false,
				'hasil'		=> 'Simpan Gagal, Paket ID tidak diketahui!!'
			);
			echo json_encode($xHasil);
		}
		else
		{
			$this->load->model('mSetupPaket');
			$sSQL = $this->mSetupPaket->CekKodePaket($xKdPaket);
			
			if ($sSQL->num_rows() > 0)
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'ID Paket sudah ada, Apakah Anda ingin meng-update?'
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
	}
	
	function Simpan()
	{
		$xKdPaket = trim($this->input->post('fs_kd_paket'));
		$xNmPaket = trim($this->input->post('fs_nm_paket'));
		$xTglSimpan = trim($this->input->post('fd_simpan'));
		
		$xUpdate = false;
		$this->load->model('mSetupPaket');
		$sSQL = $this->mSetupPaket->CekKodePaket($xKdPaket);
		
		if ($sSQL->num_rows() > 0)
		{
			$xUpdate = true;
		}
		
		$xDt = array(
			'fs_kd_paket'	=> trim($xKdPaket),
			'fs_nm_paket'	=> trim($xNmPaket)
		);
		
		if ($xUpdate == false)
		{
			if (trim($xKdPaket) <> '')
			{
				$xDt2 = array(
					'fs_usr'	=> trim($this->session->userdata('gUser')),
					'fd_usr'	=> trim($xTglSimpan),
					'fs_upd'	=> trim($this->session->userdata('gUser')),
					'fd_upd'	=> trim($xTglSimpan)
				);
				$xData = array_merge($xDt,$xDt2);
				
				$this->db->insert('tm_paket', $xData);
			}
			else
			{
				$xHasil = array(
					'sukses'	=> true,
					'hasil'		=> 'Simpan Gagal, ID Paket tidak diketahui!!<br>Silakan coba lagi kemudian...'
				);
				echo json_encode($xHasil);
			}
		}
		else
		{
			$xDt2 = array(
				'fs_upd'	=> trim($this->session->userdata('gUser')),
				'fd_upd'	=> trim($xTglSimpan)
			);
			$xData = array_merge($xDt,$xDt2);
			
			$xWhere = "fs_kd_paket = '".trim($xKdPaket)."'";
			
			$this->db->where($xWhere);
			$this->db->update('tm_paket', $xData);
		}
		
		
		//Hapus detail
		$xWhere = "fs_kd_level = '".trim($xKdPaket)."'";
		
		$this->db->where($xWhere);
		$this->db->delete('tm_paketlevel');
		//eof Hapus detail
		
		$kdmenu = explode('|', trim($this->input->post('fs_kd_menu')));
		
		$xJml = count($kdmenu) - 1;
		if ($xJml != 0)
		{
			for ($i=1; $i<=$xJml; $i++)
			{
				$xData = array(
					'fs_kd_level'	=> trim($xKdPaket),
					'fs_kd_menu'	=> trim($kdmenu[$i])
				);
				
				$this->db->insert('tm_paketlevel', $xData);
			}
		}
		
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
}
?>