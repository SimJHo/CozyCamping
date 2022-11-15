
//쿠키
var setCookie = function(name, value, exp) {
	var date = new Date();
	date.setTime(date.getTime() + exp*24*60*60*1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

var getCookie = function(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    
	return value? value[2] : null;
};

var deleteCookie = function(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

//로그인
function doSubmit(){

    axios.get('/login_com', {
        params: {
            m_id: loginform.m_id.value,
            m_pass: loginform.m_pass.value
        }
    })
    .then(function (response) {
        
        if($('#check_box').is(':checked') == true && response.data.data.length == 1){
            location.href="/";
            setCookie('login','ok',1);
            setCookie('m_id',response.data.data[0].m_id,1);
            setCookie('m_name',response.data.data[0].m_name,1);
            setCookie('user_id',response.data.data[0].user_id,1);
            setCookie('m_tel',response.data.data[0].m_tel,1);
            setCookie('m_email',response.data.data[0].m_email,1);
            setCookie('m_date',response.data.data[0].m_date,1);
            setCookie('m_id',loginform.m_id.value);
            alert("로그인 되었습니다.");
        }
        else if($('#check_box').is(':checked') == false && response.data.data.length == 1){
            location.href="/";
            sessionStorage.setItem('login','ok');
            sessionStorage.setItem('m_id',response.data.data[0].m_id);
            sessionStorage.setItem('m_name',response.data.data[0].m_name);
            sessionStorage.setItem('user_id',response.data.data[0].user_id);
            sessionStorage.setItem('m_tel',response.data.data[0].m_tel);
            sessionStorage.setItem('m_email',response.data.data[0].m_email);
            sessionStorage.setItem('m_date',response.data.data[0].m_date);
            setCookie('m_id',loginform.m_id.value);
            alert("로그인 되었습니다.");
            
        } else {
            alert("아이디 또는 비밀번호를 확인해주세요.");
            location.href="/login_page.html";
        }
    })
}

$(document).ready(function() {
    $(".form-control").keyup(function(event) {
        if (event.which === 13) {
            $(".login_text3").click();
        }
    });

    sessionStorage.clear();
    deleteCookie('m_id');
    deleteCookie('login');
    deleteCookie('m_name');
    deleteCookie('user_id');
    deleteCookie('m_tel');
    deleteCookie('m_date');
    deleteCookie('m_email');
});