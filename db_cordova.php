<?php class db_cordova{
    public static $db_username = 'root';
    public static $db_password = 'Operations2';
    public static $db_host = 'localhost'; 
    public static $db = 'boombik_client';
    
    public static $link="";
    
    public static function _connect() {
    self::$link = mysqli_connect(self::$db_host, self::$db_username, self::$db_password);
    if (!self::$link) {
        die('Connection: '.self::$db_host.','.self::$db_username.', '.self::$db_password.' -! ' . mysql_error());
    }

    mysqli_select_db(self::$link,self::$db);
    mysqli_query(self::$link ,"SET CHARACTER SET 'utf8'");
    mysqli_query(self::$link, "SET NAMES 'utf8'");
    mysqli_query(self::$link, "SET SESSION collation_connection = 'utf8_general_ci'");

    }
    
    public static function _disconnect() {
    mysqli_close(self::$link);
    }   
    
    public static function do_login($login, $password){
        $sql = "SELECT fio, telephone, id FROM ".db_cordova::$db.".cordova_registration where login = '$login' and password = '$password';";
        $result = mysqli_query(db_cordova::$link, $sql);
        $row = mysqli_fetch_assoc($result);
        return $row;
        
    }
    
    public static function get_info($id){
        $sql = "SELECT fio, telephone FROM ".db_cordova::$db.".cordova_registration where id = $id;";
        $result = mysqli_query(db_cordova::$link, $sql);
        $row = mysqli_fetch_assoc($result);
        return $row;
    }
    
    public static function get_orders($id){
        $sql = "SELECT * FROM ".db_cordova::$db.".orders where client_id = $id order by date_start";
        $result = mysqli_query(db_cordova::$link, $sql);
        $return_arr = array();
        while ($row = mysqli_fetch_assoc($result)){
            $return_arr[] = $row;
        }
        return $return_arr;
    }
    
    public static function check_login($login){
        $sql = "SELECT id FROM ".db_cordova::$db.".cordova_registration where login = '$login';";
        $result = mysqli_query(db_cordova::$link, $sql);
        $row = mysqli_fetch_assoc($result);
        return count($row)>0 ? true : false ;
    }
    
    public static function do_registration($login, $password, $fio, $telephone){
        $sql = "INSERT INTO ".db_cordova::$db.".`cordova_registration` (`login`, `password`, `fio`, `telephone`) VALUES ('$login', '$password', '$fio', '$telephone');";
        $result = mysqli_query(db_cordova::$link, $sql);
        $latest_id = mysqli_insert_id(db_cordova::$link); 
        return $latest_id;
    }
    
    public static function create_order($date_start, $data_end, $id, $master_id){
        $sql = "INSERT INTO `".db_cordova::$db."`.`orders` (`client_id`, `date_start`, `date_end`, `master_id`) VALUES ('$id', '$date_start', '$data_end', '$master_id');";
        return $result = mysqli_query(db_cordova::$link, $sql);

    }
}