
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

// 마이페이지 로그인 체크크
function loginCheck(){
    if(getCookie('login') == 'ok'){
        location.href="/my_page.html";
    }
    else if(sessionStorage.getItem('login') == 'ok'){
        location.href="/my_page.html";
    }
    else {
        location.href="/login_page.html";
    }
}

function MyPage(){
    if(getCookie('login') == 'ok'){
        location.href="/my_page.html";

        sessionStorage.setItem("mypage", 1);
    }
    else if(sessionStorage.getItem('login') == 'ok'){
        location.href="/my_page.html";

        sessionStorage.setItem("mypage", 1);
    }
    else{
        alert("로그인이 필요한 서비스입니다.")
        location.href="/login_page.html";
    }
}

function MyPage2(){
    if(getCookie('login') == 'ok'){
        location.href="/my_page.html";

        sessionStorage.setItem("mypage", 2);
    }
    else if(sessionStorage.getItem('login') == 'ok'){
        location.href="/my_page.html";

        sessionStorage.setItem("mypage", 2);
    }
    else{
        alert("로그인이 필요한 서비스입니다.")
        location.href="/login_page.html";
    }
}

function MyPage3(){
    if(getCookie('login') == 'ok'){
        location.href="/my_page.html";

        sessionStorage.setItem("mypage", 3);
    }
    else if(sessionStorage.getItem('login') == 'ok'){
        location.href="/my_page.html";

        sessionStorage.setItem("mypage", 3);
    }
    else{
        alert("로그인이 필요한 서비스입니다.")
        location.href="/login_page.html";
    }
}

//로그아웃
function LogOut(){
    let logout = confirm("로그아웃 하시겠습니까?")
    if(logout == true){
        sessionStorage.clear();
        deleteCookie('login');
        deleteCookie('m_name');
        deleteCookie('user_id');
        location.href="/";
    }
}

function search(){
    sessionStorage.setItem("search", $(".search_input").val());
}

$(document).ready(function() {
    $(".search_input").keyup(function(event) {
        if (event.which === 13) {
            $(".search_icon").click();
            location.href="/search.html";
        }
    });
});