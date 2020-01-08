<?php session_start();

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
header("Access-Control-Allow-Origin: *");

mb_internal_encoding('utf-8'); 
date_default_timezone_set('Europe/Moscow');
require 'view.php';
require 'db_cordova.php';

const check_registration = 0;
cmd::start();
class cmd{
    public static function start() {
     
      // db::_connect(); 
      //  _var::$uid=$_SESSION['uid'];
      db_cordova::_connect(); 
        self::cmd_sheet();
        
    
    }
    public static function cmd_sheet() {
        switch ($_GET["cmd"])
        {
             case "do_login":
                 control_cordova::do_login();
                 break;
             case "chech_session":
                 control_cordova::chech_session();
                 break;
             case "get_orders";
                 control_cordova::get_orders();
                 break;
             case "check_login":
                 control_cordova::check_login();
                 break;
             case "do_registration":
                 control_cordova::do_registration();
                 break;
             case "create_order";
                 control_cordova::create_order();
                 break;
        }
    }
    
}

class control_cordova{
    public static function do_login(){
       $login = $_REQUEST['login'];
       $password = $_REQUEST['password'];
       $info = db_cordova::do_login($login, $password);
       $_SESSION['id'] = $info['id'];
       $resault = json_encode($info, true);
       print $resault;
    }
    public static function chech_session(){
        if(isset($_SESSION['id'])){
            $info = db_cordova::get_info($_SESSION['id']);
            $resault = json_encode($info, true);
            print $resault;
        } else {
            print 'no_session';
        }
    }
    public static function get_orders(){
        $orders = db_cordova::get_orders($_GET['id']);
        echo json_encode($orders, true);
    }
    
    public static function check_login(){
        $login = $_GET['login'];
        $login_status = db_cordova::check_login($login);
        echo json_encode($login_status, true); 
    }
    
    public static function do_registration(){
        $str_json = file_get_contents('php://input');
        $data_array = json_decode($str_json, true);
        $login = $data_array['login'];
        $password = $data_array['password'];
        $fio = $data_array['fio'];
        $telephone = $data_array['telephone'];
        $res = db_cordova::do_registration($login, $password, $fio, $telephone);
        echo json_encode($res, true); 
    }
    
    public static function create_order(){
        $str_json = file_get_contents('php://input');
        $data_array = json_decode($str_json, true);
        
        $date_start = $data_array['date_start'];
        $data_end = $data_array['date_end'];
        $id = $data_array['id'];
        $master_id = $data_array['master_id'];
        $res = db_cordova::create_order($date_start, $data_end, $id, $master_id);
        echo json_encode($res, true); 
    }
}