/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$('#back').click(function(){
    window.location.href="create_order.html";
});

$('#check_date').change(function(){
    var date = $(this).val(); 
    $('#date').html(date);
    $('#time').html(create_html_time());
    localStorage.setItem('date', date) ;
    $('.time_div').click(function(){
        var time = $(this).html();
        $('.time_div').css({'border': 'none'});
        $(this).css({'border': '1px solid red'});
        var time_start = time.substr(0, 5);
        var time_finish = time.substr(8, 5);
        time_start = date + ' ' + time_start+ ':00';
        time_finish = date + ' ' + time_finish+ ':00';
        $('#ready').click(function(){
            var data_array = {
                'date_start' : time_start,
                'date_end' : time_finish,
                'id' : localStorage.getItem('id'),
                'procedure_id' : localStorage.getItem('div_id'),
                'master_id' : '1'
            }
            data_array = JSON.stringify(data_array);

            var url = "http://mmm.rayl.ru/control_cordova.php?cmd=create_order";
             $.ajax({ 
                type: "POST", 
                url: url, 
                data: data_array, 
                crossDomain: true,
                dataType:"json",
                success: function (success) { 
                    if(success){
                        alert('Ваш заказ успешно создан!');
                        window.location.href="main_page.html";
                    }
                }
                });
        });
    });
});

function create_html_time(){
    var html = '';
    html += '<div class = "time_div">10:00 - 14:00</div>'+
            '<div class = "time_div">14:00 - 18:00</div>'+
            '<div class = "time_div">18:00 - 20:00</div>';
    return html;
}