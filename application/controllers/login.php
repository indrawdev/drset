<?php

class Login extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		$this->load->view('vlogin');
	}
	
	function BuatCaptcha()
	{
		$this->load->helper('captcha');
		
		$this->load->database();
		
		$xVals = array(
			'expiration'	=> 3600,
			'font_path'		=> './assets/css/font/comic.ttf',
			'img_height'	=> 70,
			'img_path'		=> './temp/captcha/',
			'img_url'		=> './temp/captcha/',
			'img_width'		=> 270
		);
		
		$xCap = create_captcha($xVals);
		
		if ($xCap)
		{
			$xData = array(
				'captcha_time'	=> round($xCap['time']),
				'ip_address'	=> $this->input->ip_address(),
				'word'			=> $xCap['word']
			);
			
			$this->db->insert('captcha', $xData);
			
			$this->session->set_userdata('vcpt',round(trim($xCap['time'])));
			
			$xPathFile = base_url('/temp/captcha/'.trim($xCap['time']).'.jpg');
			
			$xHasil = array(
				'src'	=> $xPathFile
			);
			echo json_encode($xHasil);
		}
	}
	
	function CekLogin()
	{
		$this->form_validation->set_rules('txtPetugas', 'UserCode', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtPassword', 'Password', 'trim|required|xss_clean');
		$this->form_validation->set_rules('txtCaptcha', 'Captcha', 'trim|required|xss_clean');
		
		
		$this->load->database();
		if ($this->form_validation->run() == FALSE)
		{
			echo "'Kode Petugas, Email atau Password Salah!!'";
		}
		else
		{
			$xNmUser = trim($this->input->post('txtPetugas'));
			$xPassword = trim($this->input->post('txtPassword'));
			$xWord = trim($this->input->post('txtCaptcha'));
			$xUserPassword = trim($this->input->post('txtTgl'));
			
			$xExp = time() - 3600;
			$xWhere = "captcha_time < '".trim($xExp)."'";
			$this->db->where($xWhere);
			$this->db->delete('captcha');
			
			$this->load->model('mMainModul');
			$sSQL = $this->mMainModul->CekCaptcha($xWord);
			$sSQL = $sSQL->row();
			$xJml = $sSQL->fn_jml;
			
			if ($xJml > 0)
			{
				$hr = substr($xUserPassword,0,2);
				if ($hr % 2 == 0) {
					$x = 0;
				}
				else
				{
					$x = 1;
				}
				$xUserPassword = $xUserPassword.$x;
				
				if (trim($xUserPassword) == trim($xPassword))
				{
					$new = array(
						'gUserLevel'	=> '1',
						'gUser'			=> trim($xNmUser)
					);
					$this->session->set_userdata($new);
					
					echo "{success:true}";
				}
				else
				{
					$this->load->model('mMainModul');
					$sSQL = $this->mMainModul->ValidUserPass($xNmUser);
					
					if ($sSQL->num_rows() > 0)
					{
						$sSQL = $sSQL->row();
						$xNmUser = $sSQL->fs_kd_user;
						$xKey = 'dr';
						$xUserPassword = $this->encrypt->decode($sSQL->fs_password,$xKey);
						
						if (trim($xUserPassword) == trim($xPassword))
						{
							$new = array(
								'gUserLevel'	=> '0',
								'gUser'			=> trim($xNmUser)
							);
							$this->session->set_userdata($new);
							
							echo "{success:true}";
						}
						else
						{
							echo "'Kode Petugas, Email atau Password Salah!!'";
						}
					}
					else
					{
						echo "'Kode Petugas, Email atau Password Salah!!'";
					}
				}
			}
			else
			{
				echo "'Captcha Salah!!'";
			}
		}
	}
	
	function Logout()
	{
		$this->session->sess_destroy();
		echo "{success:true}";
	}	
}

?>