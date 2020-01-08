/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var my_js_control = {
    fio: '',
    telephone: '',
    do_login:function(){
        var login = $('#login').val();
        var password = $('#password').val();
        if ($.trim(login).length > 0 & $.trim(password).length > 0) {
            my_js_db.do_login(login, password);
        } else {
            alert('Password_login');
        }
    },
    
    do_registration:function(){
        console.log('do_reg_2');
        document.getElementById('app_id').innerHTML = my_js_view.show_registration();
        //document.addEventListener("backbutton", my_js_control.show_return() , false);
        $("#go_back").click(function(){
           location.reload();
        });
        $(document).ready(function(){
            $("#go_registration").click(function(){
                  my_js_control.go_registration();
            });
        });
        
    },
    
    show_return:function(){
         document.getElementById('app_id').innerHTML = my_js_view.show_return();
    },
    
    go_registration:function(){
        var password_1 = $('#password_1').val();
        var password_2 = $('#password_2').val();
        if(password_1 !== password_2){
            alert('Пароль не совпадают!');
        } else {
            var login = $('#login').val();
            var url = "http://mmm.rayl.ru/control_cordova.php?cmd=check_login&login="+login;
            $.get( url, function(succes){
                var res = JSON.parse(succes);
                if(res){
                    alert('Такой логин уже существует!');
                } else {
                    var fio = $('#fio').val();
                    var telephone = $('#telephone').val();
                    var data_array = {
                        'login': login,
                        'password': password_1,
                        'telephone': telephone,
                        'fio': fio
                    }
                    data_array = JSON.stringify(data_array);
                    my_js_db.do_registration(data_array);
                }
            });
        }
    }
}
var my_js_view = {
    show_registration:function(){
        console.log('do_reg_3');
        var html = '';
        html += '<div class ="app_top" style = "">'+
                '<input type ="text" name = "login" id = "login" placeholder = "Логин">'+
                '<input type ="text" name = "fio" id = "fio" placeholder = "ФИО">'+
                '<input type ="text" name = "telephone" id = "telephone" placeholder = "Телефон">'+
                '<input type ="password" name = "password_1" id = "password_1" placeholder = "Пароль">'+
                '<input type ="password" name = "password_2" id = "password_2" placeholder = "Повторите пароль">'+
                '<a class = "enter" id = "go_registration">Регистрация</a>'+
                '<a class = "enter" id = "go_back" >Назад</a>'+
                '</duv>' ;
        return html ;
    },
    show_return:function(){
       var html = '';
       
       html += '<div class ="app_top" style = "">'+
               '<input type ="text" name = "login" id = "login" placeholder = "Логин">'+
               '<input type ="text" name ="password" id ="password" placeholder = "Пароль">'+
               '</div>'+
               '<a class = "enter" id = "do_login">Войти</a>'+
               '<div class ="app_bottom" style = "">'+
               '<a>Войти с помощью ВК</a>'+
               '<a>Войти с помощью ФБ</a>'+
               '</div>'+
               '<a class = "enter" id = "do_registration" >Регистрация</a>';
       
       return html;
    }
}
var my_js_db = {
    do_login:function(login, password){
        var data_string = 'login='+login+'&password='+password;
        var url = "http://mmm.rayl.ru/control_cordova.php?cmd=do_login";
        $.ajax({ 
            type: "POST", 
            url: url, 
            data: data_string, 
            crossDomain: true,
            dataType:"json",
            success: function (success) { 
                if(success){
                    //var result = JSON.parse(success);
                    my_js_control.fio = success['fio'];
                    my_js_control.telephone = success['telephone'];
                    localStorage.setItem('id', success['id']);
                    localStorage.setItem('fio', success['fio']);
                    localStorage.setItem('telephone', success['telephone']);
                    window.location.href="main_page.html";
                } else {
                    alert('ne_vernui_login_possword');
                }
            }
        });
    },
    
    do_registration:function(data_array){
        var url = "http://mmm.rayl.ru/control_cordova.php?cmd=do_registration";
        $.ajax({ 
            type: "POST", 
            url: url, 
            data: data_array, 
            crossDomain: true,
            dataType:"json",
            success: function (success) { 
                console.log(success);
                var id = success;
                localStorage.setItem('id', id);
                var array = JSON.parse(data_array);
                localStorage.setItem('fio', array['fio']);
                localStorage.setItem('telephone', array['telephone']);
                window.location.href="main_page.html";
            }
            });
    }
       
}
$(document).ready(function(){
    var check = false ;
    if(!(check)){
    var url = "http://mmm.rayl.ru/control_cordova.php?cmd=chech_session";
    var id = localStorage.getItem('id');
    console.log(id);
    if(id !== null){
       window.location.href="main_page.html";
       check = true;
    }
    }
});

$(document).ready(function(){
    $("#do_login").click(function() {
    my_js_control.do_login();
});

$("#do_registration").click(function(){
    console.log('do_registration');
    my_js_control.do_registration();
});
});


