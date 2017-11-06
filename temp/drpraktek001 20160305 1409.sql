-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.5.28


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema drpraktek001
--

CREATE DATABASE IF NOT EXISTS drpraktek001;
USE drpraktek001;

--
-- Definition of table `tm_agama`
--

DROP TABLE IF EXISTS `tm_agama`;
CREATE TABLE `tm_agama` (
  `fs_kd_agama` int(1) unsigned NOT NULL DEFAULT '0',
  `fs_nm_agama` varchar(25) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`fs_kd_agama`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_agama`
--

/*!40000 ALTER TABLE `tm_agama` DISABLE KEYS */;
INSERT INTO `tm_agama` (`fs_kd_agama`,`fs_nm_agama`) VALUES 
 (0,'ISLAM'),
 (1,'KRISTEN'),
 (2,'KATHOLIK'),
 (3,'HINDU'),
 (4,'BUDHA'),
 (5,'LAIN - LAIN');
/*!40000 ALTER TABLE `tm_agama` ENABLE KEYS */;


--
-- Definition of table `tm_barang`
--

DROP TABLE IF EXISTS `tm_barang`;
CREATE TABLE `tm_barang` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_barang` varchar(25) NOT NULL DEFAULT ' ',
  `fb_aktif` tinyint(1) NOT NULL DEFAULT '0',
  `fs_nm_barang` varchar(50) NOT NULL DEFAULT ' ',
  `fs_kd_satuan` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_dist` varchar(25) NOT NULL DEFAULT ' ',
  `fs_ket` varchar(100) NOT NULL DEFAULT ' ',
  `fs_usr` varchar(25) NOT NULL DEFAULT ' ',
  `fd_usr` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  `fs_upd` varchar(25) NOT NULL DEFAULT ' ',
  `fd_upd` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  PRIMARY KEY (`fs_kd_dokter`,`fs_kd_barang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_barang`
--

/*!40000 ALTER TABLE `tm_barang` DISABLE KEYS */;
INSERT INTO `tm_barang` (`fs_kd_dokter`,`fs_kd_barang`,`fb_aktif`,`fs_nm_barang`,`fs_kd_satuan`,`fs_kd_dist`,`fs_ket`,`fs_usr`,`fd_usr`,`fs_upd`,`fd_upd`) VALUES 
 ('88130800001','ANTA1',1,'ANTALGIN 30 MG','BTL','SANBE','','KLINIK','2013-08-17 23:59:27','KLINIK','2015-02-22 21:38:25'),
 ('88130800001','BIO',1,'BIOGESIC','TB','KALBE','BIOGESIC','KLINIK','2015-04-18 23:27:34','KLINIK','2015-04-18 23:27:49'),
 ('88130800001','DECO1',1,'DECOLGIN 25 MG','MG','KMF','','KLINIK','2013-08-18 00:00:07','KLINIK','2014-04-13 13:53:56'),
 ('88130800001','KONI1',1,'KONIMEX 25 MG','KL','SANBE','','KLINIK','2013-08-18 00:01:54','KLINIK','2013-08-18 01:00:12'),
 ('88130800001','PONS1',1,'PONSTAN 250 MG','TB','SANBE','','KLINIK','2013-08-18 00:07:36','KLINIK','2013-08-18 00:07:36');
/*!40000 ALTER TABLE `tm_barang` ENABLE KEYS */;


--
-- Definition of table `tm_distributor`
--

DROP TABLE IF EXISTS `tm_distributor`;
CREATE TABLE `tm_distributor` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_dist` varchar(25) NOT NULL DEFAULT ' ',
  `fb_aktif` tinyint(1) NOT NULL DEFAULT '0',
  `fs_nm_dist` varchar(50) NOT NULL DEFAULT ' ',
  `fs_alamat` varchar(200) NOT NULL DEFAULT ' ',
  `fs_kota` varchar(50) NOT NULL DEFAULT ' ',
  `fs_tlp` varchar(50) NOT NULL DEFAULT ' ',
  `fs_kontak` varchar(50) NOT NULL DEFAULT ' ',
  `fs_usr` varchar(50) NOT NULL DEFAULT ' ',
  `fd_usr` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  `fs_upd` varchar(50) NOT NULL DEFAULT ' ',
  `fd_upd` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  PRIMARY KEY (`fs_kd_dokter`,`fs_kd_dist`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_distributor`
--

/*!40000 ALTER TABLE `tm_distributor` DISABLE KEYS */;
INSERT INTO `tm_distributor` (`fs_kd_dokter`,`fs_kd_dist`,`fb_aktif`,`fs_nm_dist`,`fs_alamat`,`fs_kota`,`fs_tlp`,`fs_kontak`,`fs_usr`,`fd_usr`,`fs_upd`,`fd_upd`) VALUES 
 ('88130800001','KALBE',1,'KALBE FARMA','ALAMAT KALBE FARMA','KOTA KALBE FARMA','TELP KALBE FARMA','KONTAK PERSON KALBE FARMA','KLINIK','2015-04-18 23:14:19','KLINIK','2015-04-18 23:14:19'),
 ('88130800001','KMF',1,'KIMIA FARMA','','','','','KLINIK','2013-08-18 01:12:07','KLINIK','2014-04-13 14:03:02'),
 ('88130800001','SANBE',1,'SANBE FARMA','JL.KALIGAWE 115\nSEMARANG TENGAH','SEMARANG','024-5655871','BP.SURYA KANTA','KLINIK','2013-08-17 13:31:42','KLINIK','2013-08-17 13:43:53');
/*!40000 ALTER TABLE `tm_distributor` ENABLE KEYS */;


--
-- Definition of table `tm_dokter`
--

DROP TABLE IF EXISTS `tm_dokter`;
CREATE TABLE `tm_dokter` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fs_nm_dokter` varchar(50) NOT NULL DEFAULT ' ',
  `fs_alamat` varchar(200) NOT NULL DEFAULT ' ',
  `fs_kota` varchar(50) NOT NULL DEFAULT ' ',
  `fs_tlp` varchar(50) NOT NULL DEFAULT ' ',
  `fs_email` varchar(50) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`fs_kd_dokter`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_dokter`
--

/*!40000 ALTER TABLE `tm_dokter` DISABLE KEYS */;
INSERT INTO `tm_dokter` (`fs_kd_dokter`,`fs_nm_dokter`,`fs_alamat`,`fs_kota`,`fs_tlp`,`fs_email`) VALUES 
 ('88130700001','DR. AA','ALAMAT AA','JAKARTA','0274-789','BB@YMAIL.COM'),
 ('88130800001','DR. AA','ALAMAT DR. AA','YOGYAKARTA','0274-789','AA@YMAIL.COM'),
 ('88131000002','DR. BB','ALAMAT DR. BB','YOGYAKARTA','0274-789','BB@YMAIL.COM'),
 ('88131100002','DRPRAKTEK','JOGJA','YOGYAKARTA','08123456789','DR@DRPRAKTEK.NET'),
 ('88131100003','DRPRAKTEKNET','JOGJA','YOGYAKARTA','08123456789','DOKTER@DRPRAKTEK.NET'),
 ('88131100006','DRPRAKTEKNET03','JOGJA','YOGYAKARTA','08123456789','DOKTER03@DRPRAKTEK.NET'),
 ('88131100009','DRPRAKTEKNET07','JOGJA','YOGYAKARTA','08123456789','DOKTER07@DRPRAKTEK.NET'),
 ('88131100010','DRPRAKTEKNET08','JOGJA','YOGYAKARTA','08123456789','DOKTER08@DRPRAKTEK.NET'),
 ('88140300001','DRPRAKTEKNET09','JOGJA','YOGYAKARTA','08123456789','DOKTER09@DRPRAKTEK.NET'),
 ('88140400001','DRPRAKTEKNET10','JOGJA','YOGYAKARTA','08123456789','DOKTER10@DRPRAKTEK.NET'),
 ('88140400002','DRPRAKTEKNET11','JOGJA','YOGYAKARTA','08123456789','DOKTER11@DRPRAKTEK.NET'),
 ('88150400001','DR. ZZ','ALAMAT DR. ZZ','YOGYAKARTA','0274 5789','ZZ@YMAIL.COM');
/*!40000 ALTER TABLE `tm_dokter` ENABLE KEYS */;


--
-- Definition of table `tm_gol_darah`
--

DROP TABLE IF EXISTS `tm_gol_darah`;
CREATE TABLE `tm_gol_darah` (
  `fs_gol_darah` varchar(2) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`fs_gol_darah`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_gol_darah`
--

/*!40000 ALTER TABLE `tm_gol_darah` DISABLE KEYS */;
INSERT INTO `tm_gol_darah` (`fs_gol_darah`) VALUES 
 ('A'),
 ('AB'),
 ('B'),
 ('O');
/*!40000 ALTER TABLE `tm_gol_darah` ENABLE KEYS */;


--
-- Definition of table `tm_menu`
--

DROP TABLE IF EXISTS `tm_menu`;
CREATE TABLE `tm_menu` (
  `fs_kd_menu` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_induk` varchar(25) NOT NULL DEFAULT ' ',
  `fs_nm_menu` varchar(100) NOT NULL DEFAULT ' ',
  `fs_nm_form` varchar(50) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`fs_kd_menu`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_menu`
--

/*!40000 ALTER TABLE `tm_menu` DISABLE KEYS */;
INSERT INTO `tm_menu` (`fs_kd_menu`,`fs_kd_induk`,`fs_nm_menu`,`fs_nm_form`) VALUES 
 ('01','00','Data',' '),
 ('0101','01','Identitas','iddokter'),
 ('0102','01','Petugas','petugas'),
 ('0103','01','Password','gantipass'),
 ('0104','01','Satuan','satuan'),
 ('0105','01','Distributor','distributor'),
 ('0106','01','Barang','barang'),
 ('02','00','Transaksi',' '),
 ('0201','02','Pendaftaran','pesan'),
 ('0202','02','Daftar Ulang / Registrasi','reg'),
 ('0203','02','Kartu Pasien','kartu'),
 ('03','00','Informasi',' '),
 ('0301','03','Pendapatan','infopendapatan'),
 ('0302','03','Kunjungan','infokunjungan'),
 ('0303','03','Antrian','infoantrian');
/*!40000 ALTER TABLE `tm_menu` ENABLE KEYS */;


--
-- Definition of table `tm_mr`
--

DROP TABLE IF EXISTS `tm_mr`;
CREATE TABLE `tm_mr` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_mr` varchar(25) NOT NULL DEFAULT ' ',
  `fs_nm_pasien` varchar(100) NOT NULL DEFAULT ' ',
  `fs_alamat` varchar(200) NOT NULL DEFAULT ' ',
  `fs_tlp` varchar(50) NOT NULL DEFAULT ' ',
  `fb_sex` tinyint(1) NOT NULL DEFAULT '0',
  `fs_gol_darah` varchar(5) NOT NULL DEFAULT ' ',
  `fd_tgl_lahir` varchar(10) NOT NULL DEFAULT '3000-01-01',
  `fn_tinggi` int(5) unsigned NOT NULL DEFAULT '0',
  `fn_berat` int(5) unsigned NOT NULL DEFAULT '0',
  `fs_kd_agama` varchar(5) NOT NULL DEFAULT ' ',
  `fs_kd_pendidikan` varchar(5) NOT NULL DEFAULT ' ',
  `fs_kd_pekerjaan` varchar(5) NOT NULL DEFAULT ' ',
  `fs_nm_kerabat` varchar(100) NOT NULL DEFAULT ' ',
  `fs_alm_kerabat` varchar(200) NOT NULL DEFAULT ' ',
  `fs_hubungan` varchar(50) NOT NULL DEFAULT ' ',
  `fs_tlp_kerabat` varchar(50) NOT NULL DEFAULT ' ',
  `fs_usr` varchar(50) NOT NULL DEFAULT ' ',
  `fd_usr` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  `fs_upd` varchar(50) NOT NULL DEFAULT ' ',
  `fd_upd` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  PRIMARY KEY (`fs_kd_dokter`,`fs_kd_mr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_mr`
--

/*!40000 ALTER TABLE `tm_mr` DISABLE KEYS */;
INSERT INTO `tm_mr` (`fs_kd_dokter`,`fs_kd_mr`,`fs_nm_pasien`,`fs_alamat`,`fs_tlp`,`fb_sex`,`fs_gol_darah`,`fd_tgl_lahir`,`fn_tinggi`,`fn_berat`,`fs_kd_agama`,`fs_kd_pendidikan`,`fs_kd_pekerjaan`,`fs_nm_kerabat`,`fs_alm_kerabat`,`fs_hubungan`,`fs_tlp_kerabat`,`fs_usr`,`fd_usr`,`fs_upd`,`fd_upd`) VALUES 
 ('88130800001','MR000000001','AA','AA','AA',0,'A','1990-08-26',165,55,'3','06','01','AA','AA','AA','AA','KLINIK','2013-08-26 23:42:44','KLINIK','2015-04-19 01:08:53'),
 ('88130800001','MR000000002','CC','CC','CC',0,'A','1988-08-27',156,55,'2','06','01','CC','CC','CC','CC','KLINIK','2013-08-27 23:19:53','KLINIK','2013-10-06 13:56:49'),
 ('88130800001','MR000000003','BB','BB','BB',0,'A','1990-08-27',157,56,'2','06','04','BB','BB','BB','BB','KLINIK','2013-08-27 23:21:08','KLINIK','2013-10-06 13:57:15'),
 ('88130800001','MR000000004','DD','ALAMAT DD','TELP DD',0,'A','2000-03-18',0,0,'0','03','13',' ',' ',' ',' ','KLINIK','2015-04-18 23:36:26','KLINIK','2015-04-18 23:36:26');
/*!40000 ALTER TABLE `tm_mr` ENABLE KEYS */;


--
-- Definition of table `tm_parameter`
--

DROP TABLE IF EXISTS `tm_parameter`;
CREATE TABLE `tm_parameter` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fn_pesan` int(20) unsigned NOT NULL DEFAULT '0',
  `fn_mr` int(20) unsigned NOT NULL DEFAULT '0',
  `fn_reg` int(20) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_parameter`
--

/*!40000 ALTER TABLE `tm_parameter` DISABLE KEYS */;
INSERT INTO `tm_parameter` (`fs_kd_dokter`,`fn_pesan`,`fn_mr`,`fn_reg`) VALUES 
 ('88130700001',0,0,0),
 ('88130800001',150418002,4,150418001),
 ('88131000002',0,0,0),
 ('88131100002',0,0,0),
 ('88131100003',0,0,0),
 ('88131100006',0,0,0),
 ('88131100009',0,0,0),
 ('88131100010',0,0,0),
 ('88140300001',0,0,0),
 ('88140400001',0,0,0),
 ('88140400002',0,0,0),
 ('88150400001',0,0,0);
/*!40000 ALTER TABLE `tm_parameter` ENABLE KEYS */;


--
-- Definition of table `tm_pekerjaan`
--

DROP TABLE IF EXISTS `tm_pekerjaan`;
CREATE TABLE `tm_pekerjaan` (
  `fs_kd_pekerjaan` varchar(2) NOT NULL DEFAULT ' ',
  `fs_nm_pekerjaan` varchar(50) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`fs_kd_pekerjaan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_pekerjaan`
--

/*!40000 ALTER TABLE `tm_pekerjaan` DISABLE KEYS */;
INSERT INTO `tm_pekerjaan` (`fs_kd_pekerjaan`,`fs_nm_pekerjaan`) VALUES 
 ('01','PEGAWAI NEGERI'),
 ('02','POLISI / TNI'),
 ('03','PENSIUNAN'),
 ('04','PEGAWAI SWASTA'),
 ('05','PEDAGANG'),
 ('06','NELAYAN'),
 ('07','PETANI'),
 ('08','PEKERJA LEPAS'),
 ('09','IBU RUMAH TANGGA'),
 ('10','PELAJAR'),
 ('11','MAHASISWA'),
 ('12','DI BAWAH UMUR'),
 ('13','TIDAK BEKERJA'),
 ('14','TIDAK TAHU'),
 ('XX','PEKERJAAN');
/*!40000 ALTER TABLE `tm_pekerjaan` ENABLE KEYS */;


--
-- Definition of table `tm_pendidikan`
--

DROP TABLE IF EXISTS `tm_pendidikan`;
CREATE TABLE `tm_pendidikan` (
  `fs_kd_pendidikan` varchar(2) NOT NULL DEFAULT ' ',
  `fs_nm_pendidikan` varchar(50) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`fs_kd_pendidikan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_pendidikan`
--

/*!40000 ALTER TABLE `tm_pendidikan` DISABLE KEYS */;
INSERT INTO `tm_pendidikan` (`fs_kd_pendidikan`,`fs_nm_pendidikan`) VALUES 
 ('01','TIDAK SEKOLAH'),
 ('02','BELUM / TIDAK TAMAT SD'),
 ('03','TAMAT SD'),
 ('04','TAMAT SLTP'),
 ('05','TAMAT SLTA'),
 ('06','TAMAT PERGURUAN TINGGI'),
 ('XX','PENDIDIKAN');
/*!40000 ALTER TABLE `tm_pendidikan` ENABLE KEYS */;


--
-- Definition of table `tm_satuan`
--

DROP TABLE IF EXISTS `tm_satuan`;
CREATE TABLE `tm_satuan` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_satuan` varchar(25) NOT NULL DEFAULT ' ',
  `fb_aktif` tinyint(1) NOT NULL DEFAULT '0',
  `fs_nm_satuan` varchar(50) NOT NULL DEFAULT ' ',
  `fs_usr` varchar(50) NOT NULL DEFAULT ' ',
  `fd_usr` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  `fs_upd` varchar(50) NOT NULL DEFAULT ' ',
  `fd_upd` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  PRIMARY KEY (`fs_kd_dokter`,`fs_kd_satuan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_satuan`
--

/*!40000 ALTER TABLE `tm_satuan` DISABLE KEYS */;
INSERT INTO `tm_satuan` (`fs_kd_dokter`,`fs_kd_satuan`,`fb_aktif`,`fs_nm_satuan`,`fs_usr`,`fd_usr`,`fs_upd`,`fd_upd`) VALUES 
 ('88130800001','BTL',1,'BOTOL','KLINIK','2013-08-17 02:59:31','KLINIK','2014-04-13 15:21:37'),
 ('88130800001','KL',1,'KALENG','KLINIK','2013-08-18 00:59:57','KLINIK','2013-08-18 01:12:39'),
 ('88130800001','KP',1,'KAPSUL','KLINIK','2015-04-18 23:06:19','KLINIK','2015-04-18 23:06:19'),
 ('88130800001','MG',1,'MILIGRAM','KLINIK','2013-08-17 02:39:13','KLINIK','2013-08-17 02:55:29'),
 ('88130800001','TB',1,'TABLET','KLINIK','2013-08-17 23:55:01','KLINIK','2013-08-17 23:55:01');
/*!40000 ALTER TABLE `tm_satuan` ENABLE KEYS */;


--
-- Definition of table `tm_sex`
--

DROP TABLE IF EXISTS `tm_sex`;
CREATE TABLE `tm_sex` (
  `fs_kd_sex` int(1) unsigned NOT NULL DEFAULT '0',
  `fs_nm_sex` varchar(25) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`fs_kd_sex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_sex`
--

/*!40000 ALTER TABLE `tm_sex` DISABLE KEYS */;
INSERT INTO `tm_sex` (`fs_kd_sex`,`fs_nm_sex`) VALUES 
 (0,'LAKI - LAKI'),
 (1,'PEREMPUAN');
/*!40000 ALTER TABLE `tm_sex` ENABLE KEYS */;


--
-- Definition of table `tm_user`
--

DROP TABLE IF EXISTS `tm_user`;
CREATE TABLE `tm_user` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_user` varchar(50) NOT NULL DEFAULT ' ',
  `fs_nm_user` varchar(50) NOT NULL DEFAULT ' ',
  `fs_password` varchar(500) NOT NULL DEFAULT ' ',
  `fs_kd_akses` varchar(50) NOT NULL DEFAULT ' ',
  `fs_nm_akses` varchar(50) NOT NULL DEFAULT ' ',
  `fs_usr` varchar(50) NOT NULL DEFAULT ' ',
  `fd_usr` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  `fs_upd` varchar(50) NOT NULL DEFAULT ' ',
  `fd_upd` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  PRIMARY KEY (`fs_kd_dokter`,`fs_kd_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 PACK_KEYS=0;

--
-- Dumping data for table `tm_user`
--

/*!40000 ALTER TABLE `tm_user` DISABLE KEYS */;
INSERT INTO `tm_user` (`fs_kd_dokter`,`fs_kd_user`,`fs_nm_user`,`fs_password`,`fs_kd_akses`,`fs_nm_akses`,`fs_usr`,`fd_usr`,`fs_upd`,`fd_upd`) VALUES 
 ('88130700001','KLINIK','KLINIK','0eLOQzNd/YyWujuzYuTOy+FxAmnaEyLG9WZrpqkjL95BCDgL0lzlknEdp5CyknFt6/7pNJIbOXdmqn1EAoB8Tg==','AKSES FULL','TRANSAKSI FULL','AA','2015-04-18 21:45:44','AA','2015-04-18 21:45:44'),
 ('88130800001','KLINIK','KLINIK','E3BDqEEhLHH1k7xHOc/VXPaMZmWSnVm8WLuKQlrC7fDuPkj6zFfulfU7kGb8W86B6DpIhWMF7IwtkIg58OSpeQ==','AKSES FULL','TRANSAKSI FULL','AA','2014-04-13 15:31:55','KLINIK','2014-05-21 22:01:08'),
 ('88130800001','KLINIK1','KLINIK1','uhjyD22JygQQiyEHDwo9LK+bage48/PT1KsUT3l9IlSsMgUUCv23Q6nHAvlDcKbhq3d/UFvlhznN9FyaVncyfQ==','AKSES FULL','TRANSAKSI FULL','AA','2014-04-13 15:30:23','AA','2014-04-13 15:30:23'),
 ('88130800001','KLINIK2','KLINIK2','JSJfBqUHQoEH98V0l0ANUnrTShBYx6ZJuxQ7HPjXQMOnaDysmz90qajMqC0+ymbhHp7uB905hmytfkNjBhBaoA==','AKSES DAFTAR','PENDAFTARAN','KLINIK','2014-04-01 00:00:19','KLINIK','2014-04-01 00:12:47'),
 ('88130800001','KLINIK3','KLINIK3','IoKEdOOY4gDrLKVbRE2ytNWt98AEIl7bHmXD5jVQGthf4Lfk1pOuKFoI3sUBGSUXbzCnM7eGjrNX+A5SkjHzmQ==','AKSES DAFTAR','PENDAFTARAN','AA','2013-10-19 19:41:41','KLINIK','2014-05-21 22:01:29'),
 ('88130800001','KLINIK5','KLINIK5','Xtltws4YyaTNduFBARw56/PhXneruNtgEXstptwk51+ki8WPtXBHBPkIDNXNkXT83Y6N7Otbp83YJvYyhaIktg==','AKSES FULL','TRANSAKSI FULL','KLINIK','2014-03-31 22:26:10','KLINIK','2015-03-21 21:43:41'),
 ('88130800001','KLINIK7','KLINIK7','J7IwPH3l0fMe9u0jtxEIIs0JssJp1XN/dEvJWKJpSGcqk1ZJE3zDyK7uyM5LVesCgA6rqyxFhG7pyiHzz140/w==','AKSES FULL','TRANSAKSI FULL','AA','2014-03-31 09:31:21','KLINIK','2015-03-21 21:43:57'),
 ('88130800001','KLINIK8','KLINIK8','+yvspyqA/hE94LL0fJgqww6cmHGdACKasL7oXZ7wHPSfzpZZTonM8gVcddg2oqCqVhNz/qpOmNtWYMrMy0gYsw==','AKSES DAFTAR','PENDAFTARAN','KLINIK','2014-04-01 22:37:40','KLINIK','2014-04-01 22:37:40'),
 ('88131000002','KLINIK2','KLINIK2','x5kW4GB60bKC5OPKF0QQvOWtKJs1VvQiMVUwlMvosUVKrxS5MPcV4xmiYcRmvDZDPxtDlCM49Iu5sOKpyYz5dQ==',' ',' ','AA','2013-11-17 20:22:12','AA','2013-11-17 20:22:12'),
 ('88131100002','DEMO','DEMO','EL0154KI9P/0NcP10q/l3mGMqkxpf1p6lSAyKVguhzG2n+exW2OB/hYLvO8DAQ9rI6rVkYlpBFMQatN4xYGC7g==',' ',' ','AA','2013-11-27 22:36:20','AA','2013-11-27 22:36:20'),
 ('88131100003','DEMO','DEMO','JMezxNlnFpBRqEj68naPFgRnN3hRLYtbgWTIfgjFQbpfdpbje0SjTGHBVU8O5rhuyVtR9/yvFczT9OoCHRg8yw==',' ',' ','AA','2013-11-27 22:41:55','AA','2013-11-27 22:41:55'),
 ('88131100006','DEMO','DEMO','GDIRABGmF4GMe65f8Z0Yr4ihpQUYPZ2bTQY9Mpi82qOXaUq5z0MbJMUUjuq/bLSpJj6AisV4it6H9uWgcW23og==',' ',' ','AA','2013-11-27 22:47:05','AA','2013-11-27 22:47:05'),
 ('88131100009','DEMO','DEMO','7P1OnSlF+dGorfQj0SOCqOw78/HAq488+AmTRwcSVexmk6W4BZBPAhXyJ1JJVfAjiS4IV/Fdt4dC/SdsKOnh1g==',' ',' ','AA','2013-11-27 22:52:47','AA','2013-11-27 22:52:47'),
 ('88131100010','DEMO','DEMO','oCdtmiBEu4KkQBpJkQrMAC82ID9IemE9hGzJvFfJrpVYUo+rfifDErxOmY//P+VeQyEPI5X0WtvfC9VgzDCWkA==',' ',' ','AA','2013-11-27 23:10:59','AA','2013-11-27 23:10:59'),
 ('88140300001','DEMO','DEMO','dqa49/d81kXA0Fhf2bEleCjRKkUYBlIf8gh36sm0jpwklGOpOS/2756JEl+P63ijXyVoalkb/LtxQ3evSIYC1w==',' ',' ','KLINIK','2014-03-31 22:49:11','KLINIK','2014-03-31 22:49:11'),
 ('88140400001','DEMO','DEMO','5ZhYo/rR6rQWSqJSQw5jr2jTG4DrbbYfGZMPbwQhGmTfv5m7RPaVs+5QzSjJZkjn61EKuRxcOB2hE2vHjoIC2w==',' ',' ','KLINIK','2014-03-31 23:00:50','KLINIK','2014-03-31 23:00:50'),
 ('88140400002','DEMO','DEMO','IRJ/fM0Ne1jh8q/ZRyzelcjP2Z6qEmawFwxECwT4RwZYz9w4QCwrvI6Qylj10K3LAGAvySE1YTdd0FhZM1KB0g==','AKSES DAFTAR','PENDAFTARAN','KLINIK','2014-04-01 21:17:42','KLINIK','2014-04-01 21:17:42'),
 ('88140400002','KLINIK','KLINIK','vmck6Hc0EovAtSBdBNKRcIohtVkZWNNSXQwrHMf9D5CkDcdllz8GAkSVO2yJwES9OidAuc1kGW/r1sClihVl6A==','AKSES DAFTAR','PENDAFTARAN','DEMO','2014-04-01 21:27:57','DEMO','2014-04-01 21:28:52'),
 ('88150400001','KLINIK','KLINIK','TO67IziP0Nx9yI5sBQa2ZZZfGdp5B4CJ1xWnsaXHYqrC/uDNNHI03Fjid6OJDKX8T9d1dziCPm/oIcdHOrHH4g==','AKSES FULL','TRANSAKSI FULL','AA','2015-04-18 22:08:40','AA','2015-04-18 22:08:40'),
 ('88150400001','KLINIK1','KLINIK1','TMcNTiltp6e2zx1amRzyulkmtpz+5PF7cywhVmz72Ub4htxNKLQOK5KHVu6SuxKH70QY5hyUOdEdCtFb3UNKJw==','AKSES FULL','TRANSAKSI FULL','KLINIK','2015-04-18 22:45:32','KLINIK','2015-04-18 22:58:44');
/*!40000 ALTER TABLE `tm_user` ENABLE KEYS */;


--
-- Definition of table `tx_kartu`
--

DROP TABLE IF EXISTS `tx_kartu`;
CREATE TABLE `tx_kartu` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_reg` varchar(25) NOT NULL DEFAULT ' ',
  `fd_tgl_periksa` varchar(10) NOT NULL DEFAULT '3000-01-01',
  `fs_jam_periksa` varchar(8) NOT NULL DEFAULT '00:00:00',
  `fs_anamnesa` varchar(200) NOT NULL DEFAULT ' ',
  `fs_diagnosa` varchar(200) NOT NULL DEFAULT ' ',
  `fs_tindakan` varchar(200) NOT NULL DEFAULT ' ',
  `fs_kd_icd` varchar(25) NOT NULL DEFAULT ' ',
  `fs_nm_icd` varchar(500) NOT NULL DEFAULT ' ',
  `fn_biaya` double NOT NULL DEFAULT '0',
  `fn_obat` double NOT NULL DEFAULT '0',
  `fn_total` double NOT NULL DEFAULT '0',
  `fs_usr` varchar(25) NOT NULL DEFAULT ' ',
  `fd_usr` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  `fs_upd` varchar(25) NOT NULL DEFAULT ' ',
  `fd_upd` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  PRIMARY KEY (`fs_kd_dokter`,`fs_kd_reg`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tx_kartu`
--

/*!40000 ALTER TABLE `tx_kartu` DISABLE KEYS */;
INSERT INTO `tx_kartu` (`fs_kd_dokter`,`fs_kd_reg`,`fd_tgl_periksa`,`fs_jam_periksa`,`fs_anamnesa`,`fs_diagnosa`,`fs_tindakan`,`fs_kd_icd`,`fs_nm_icd`,`fn_biaya`,`fn_obat`,`fn_total`,`fs_usr`,`fd_usr`,`fs_upd`,`fd_upd`) VALUES 
 ('88130800001','RG130826001','2013-08-26','20:39:00','QWERTY','QWERTY','QWERTY','V30.24','OCCUPANT OF THREE-WHEELED MOTOR VEHICLE INJURED IN COLLISION WITH PEDESTRIAN OR ANIMAL, PERSON ON OUTSIDE OF VEHICLE, NONTRAFFIC ACCIDENT, WHILE RESTING, SLEEPING, EATING OR ENGAGING IN OTHER VITAL ACTIVITIES',50000,25000,75000,'KLINIK','2013-09-22 22:09:27','KLINIK','2013-10-06 20:39:00'),
 ('88130800001','RG130923001','2013-09-23','20:51:19','ZXCVBNM','ZXCVBNM','ZXCVBNM','','',50000,50000,100000,'KLINIK','2013-09-23 23:32:04','KLINIK','2013-10-06 20:51:19'),
 ('88130800001','RG140413001','2014-04-13','22:38:46','ASDFGH','ASDFGH','ASDFG','V30.28','OCCUPANT OF THREE-WHEELED MOTOR VEHICLE INJURED IN COLLISION WITH PEDESTRIAN OR ANIMAL, PERSON ON OUTSIDE OF VEHICLE, NONTRAFFIC ACCIDENT, WHILE ENGAGED IN OTHER SPECIFIED ACTIVITIES',75000,25000,100000,'KLINIK','2014-04-13 21:16:44','KLINIK','2014-04-13 22:38:46'),
 ('88130800001','RG150418001','2015-04-19','20:37:04','QWERTY','ASDFG','ZXCVB','A90','DENGUE FEVER [CLASSICAL DENGUE]',20000,5000,25000,'KLINIK','2015-04-19 01:24:45','KLINIK','2015-04-19 20:37:04');
/*!40000 ALTER TABLE `tx_kartu` ENABLE KEYS */;


--
-- Definition of table `tx_pesan`
--

DROP TABLE IF EXISTS `tx_pesan`;
CREATE TABLE `tx_pesan` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_pesan` varchar(25) NOT NULL DEFAULT ' ',
  `fd_periksa` varchar(10) NOT NULL DEFAULT '3000-01-01',
  `fd_pesan` varchar(10) NOT NULL DEFAULT '3000-01-01',
  `fs_kd_mr` varchar(25) NOT NULL DEFAULT ' ',
  `fb_reg` tinyint(1) NOT NULL DEFAULT '0',
  `fs_usr` varchar(50) NOT NULL DEFAULT ' ',
  `fd_usr` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  `fs_upd` varchar(50) NOT NULL DEFAULT ' ',
  `fd_upd` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  PRIMARY KEY (`fs_kd_dokter`,`fs_kd_pesan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tx_pesan`
--

/*!40000 ALTER TABLE `tx_pesan` DISABLE KEYS */;
INSERT INTO `tx_pesan` (`fs_kd_dokter`,`fs_kd_pesan`,`fd_periksa`,`fd_pesan`,`fs_kd_mr`,`fb_reg`,`fs_usr`,`fd_usr`,`fs_upd`,`fd_upd`) VALUES 
 ('88130800001','DF130800001','2013-08-20','2013-08-20',' ',0,'KLINIK','2013-08-20 23:28:08','KLINIK','2013-08-20 23:28:08'),
 ('88130800001','DF130825001','2013-08-25','2013-08-25','MR000000001',0,'KLINIK','2013-08-25 15:11:08','KLINIK','2014-04-13 15:01:14'),
 ('88130800001','DF130923001','2013-09-23','2013-09-23','MR000000003',0,'KLINIK','2013-09-23 22:46:03','KLINIK','2013-09-23 22:46:03'),
 ('88130800001','DF131006001','2013-10-06','2013-10-06','MR000000001',1,'KLINIK','2013-10-06 20:30:44','KLINIK','2013-10-06 20:30:44'),
 ('88130800001','DF150418001','2015-04-18','2015-04-18','MR000000001',1,'KLINIK','2015-04-18 23:34:31','KLINIK','2015-04-18 23:34:31'),
 ('88130800001','DF150418002','2015-04-18','2015-04-18','MR000000004',0,'KLINIK','2015-04-18 23:36:26','KLINIK','2015-04-18 23:36:26');
/*!40000 ALTER TABLE `tx_pesan` ENABLE KEYS */;


--
-- Definition of table `tx_reg`
--

DROP TABLE IF EXISTS `tx_reg`;
CREATE TABLE `tx_reg` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_reg` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_pesan` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_mr` varchar(25) NOT NULL DEFAULT ' ',
  `fd_tgl_masuk` varchar(10) NOT NULL DEFAULT '3000-01-01',
  `fs_jam_masuk` varchar(8) NOT NULL DEFAULT '00:00:00',
  `fb_periksa` tinyint(1) NOT NULL DEFAULT '0',
  `fs_ket_umur` varchar(50) NOT NULL DEFAULT ' ',
  `fs_usr` varchar(25) NOT NULL DEFAULT ' ',
  `fd_usr` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  `fs_upd` varchar(25) NOT NULL DEFAULT ' ',
  `fd_upd` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  PRIMARY KEY (`fs_kd_dokter`,`fs_kd_reg`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tx_reg`
--

/*!40000 ALTER TABLE `tx_reg` DISABLE KEYS */;
INSERT INTO `tx_reg` (`fs_kd_dokter`,`fs_kd_reg`,`fs_kd_pesan`,`fs_kd_mr`,`fd_tgl_masuk`,`fs_jam_masuk`,`fb_periksa`,`fs_ket_umur`,`fs_usr`,`fd_usr`,`fs_upd`,`fd_upd`) VALUES 
 ('88130800001','RG130826001','','MR000000001','2013-08-26','15:18:51',1,'23 th 7 bl 18 hr','KLINIK','2013-08-26 23:42:44','KLINIK','2014-04-13 15:18:51'),
 ('88130800001','RG130827001',' ','MR000000002','2013-08-27','13:56:48',0,'25 th 1 bl 10 hr','KLINIK','2013-08-27 23:19:53','KLINIK','2013-10-06 13:56:49'),
 ('88130800001','RG130828002',' ','MR000000003','2013-08-28','13:57:15',0,'23 th 1 bl 10 hr','KLINIK','2013-08-28 22:26:21','KLINIK','2013-10-06 13:57:15'),
 ('88130800001','RG130923001',' ','MR000000001','2013-09-23','13:57:41',1,'23 th 1 bl 11 hr','KLINIK','2013-09-23 22:30:51','KLINIK','2013-10-06 13:57:42'),
 ('88130800001','RG131006001','DF131006001','MR000000001','2013-10-06','22:35:54',0,'23 th 1 bl 11 hr','KLINIK','2013-10-06 20:31:45','KLINIK','2013-10-06 22:35:54'),
 ('88130800001','RG140413001','','MR000000001','2014-04-13','21:08:57',1,'23 th 7 bl 18 hr','KLINIK','2014-04-13 21:08:57','KLINIK','2014-04-13 21:08:57'),
 ('88130800001','RG150418001','DF150418001','MR000000001','2015-04-19','01:08:53',1,'24 th 7 bl 24 hr','KLINIK','2015-04-18 23:50:03','KLINIK','2015-04-19 01:08:53');
/*!40000 ALTER TABLE `tx_reg` ENABLE KEYS */;


--
-- Definition of table `tx_resep_detail`
--

DROP TABLE IF EXISTS `tx_resep_detail`;
CREATE TABLE `tx_resep_detail` (
  `fs_kd_dokter` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_reg` varchar(25) NOT NULL DEFAULT ' ',
  `fs_kd_barang` varchar(25) NOT NULL DEFAULT ' ',
  `fs_ket` varchar(200) NOT NULL DEFAULT ' '
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tx_resep_detail`
--

/*!40000 ALTER TABLE `tx_resep_detail` DISABLE KEYS */;
INSERT INTO `tx_resep_detail` (`fs_kd_dokter`,`fs_kd_reg`,`fs_kd_barang`,`fs_ket`) VALUES 
 ('88130800001','RG130826001','ANTA1','3X SEHARI'),
 ('88130800001','RG130826001','DECO1','2X SEHARI'),
 ('88130800001','RG130923001','KONI1','2X SEHARI'),
 ('88130800001','RG130923001','PONS1','3X SEHARI'),
 ('88130800001','RG140413001','DECO1','2X SEHARI'),
 ('88130800001','RG140413001','PONS1','1X SEHARI'),
 ('88130800001','RG150418001','BIO','3 X 1 TABLET');
/*!40000 ALTER TABLE `tx_resep_detail` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
