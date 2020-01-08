/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function click_div(){
    var div = $('.drower').find('div');
    for(var i=0; i<div.length; i++){
        $(div[i]).click(
                    function(){
                        var div_id = $(this).attr('id');
                        $(this).css({'border' : '1px solid red'});
                        var span_id = "span_"+div_id;
                        console.log(span_id);
                        var value = document.getElementById(span_id).innerHTML;
                        document.getElementById('cost').innerHTML = value;
                        document.getElementById('next').innerHTML = 'Далее';
                        $('#next').click(function(){
                            localStorage.setItem('div_id', div_id) ;
                            window.location.href="craete_date.html";
                        });
                    }
                );
    }
}
click_div();

$('#back').click(function(){
    window.location.href="main_page.html";
});