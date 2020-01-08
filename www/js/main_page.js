/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
    document.getElementById('fio').innerHTML = localStorage.getItem('fio');
    document.getElementById('telephone').innerHTML = localStorage.getItem('telephone');
    var id = localStorage.getItem('id');
    var url = "http://mmm.rayl.ru/control_cordova.php?cmd=get_orders&id="+id;
    $.get(
            url, function(succes){
                document.getElementById('my_orders').innerHTML = drow_order(JSON.parse(succes));
            }
            );
});

$("#do_logout").click(function() {
    localStorage.removeItem("fio");
    localStorage.removeItem("telephone");
    localStorage.removeItem("id");
    window.location.href="index.html";
});

function drow_order(order){
    var html = '';
    html += '<span id = "header_span">Мои записи</span></br>';
    for(var i=0; i<order.length; i++){
        html += '<span>'+order[i]['date_start']+'</span></br>';
    }
    return html;
}

$('#go_writing').click(function(){
    window.location.href="create_order.html";
});