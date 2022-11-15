$(document).ready(async function(){
    let cart_count = 0;

    if(sessionStorage.getItem("login") == "ok" || getCookie("login") == "ok"){
        
        if(sessionStorage.getItem("user_id") != null){
                    $('#hidden4').val(sessionStorage.getItem("user_id"));
                }else{
                    $('#hidden4').val(getCookie("user_id"));
                }

        axios.get('/cart', {
                    params: {
                        user_id: $("#hidden4").val(),
                    }
                })
                .then(function (response) {
                    let value = [] = response.data.data;

                    for(let i = 0; i< value.length; i++){
                        cart_count += Number(value[i].count);
                    }
                    $('#cart_count').text(cart_count);
                });
    }
    else{
        for (var i = 0; i < localStorage.length; i++){
        const key = window.localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));

        cart_count += Number(value.count);
        }
        $('#cart_count').text(cart_count);
    }
    
    if(getCookie('login') == 'ok' || sessionStorage.getItem('login') == 'ok'){
        $('.go_logout').css('display','block');
    }
    else{
        $('.go_logout').css('display','none');
    }

    if(getCookie('user_id') == '3'){
        $('.go_reg').css('display','block');
    }
    else if(sessionStorage.getItem('user_id') == '3'){
        $('.go_reg').css('display','block');
    }
    else{
        $('.go_reg').css('display','none');
    }

    if(getCookie('login') == 'ok'){
        $('#user_name').text(getCookie('m_name')+'님 반갑습니다.');

        for(let i = 0; i < window.localStorage.length; i++) {

            const key = window.localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));

            await axios.get('/cartlist', {
                params: {
                    user_id: getCookie("user_id"),
                    count: value.count,
                    total: value.total,
                    imgenum: value.imgenum
                }
            });
        };

        localStorage.clear();

    }
    else if(sessionStorage.getItem('login') == 'ok'){
        $('#user_name').text(sessionStorage.getItem('m_name')+'님 반갑습니다.');
        
        for(let i = 0; i < window.localStorage.length; i++) {

            const key = window.localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));

            await axios.get('/cartlist', {
                params: {
                    user_id: sessionStorage.getItem("user_id"),
                    count: value.count,
                    total: value.total,
                    imgenum: value.imgenum
                }
            });
        };

        localStorage.clear();
    }
    else{
        $('#user_name').text('');
    }
});  