// 카운트다운
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        if (timer === 0) {
            clearInterval(interval);
            display.textContent = "세션 만료!";
        }
    }, 1000);
}

function timer() {
    var minutes = 3;

    var fiveMinutes = (60 * minutes) - 1,
        display = document.querySelector('#MyTimer');
    startTimer(fiveMinutes, display);
};


// 난수
var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
}
const number = generateRandom(111111, 999999);

//인증메일 보내기
function sendeMail() {
    if(confirm('인증메일을 발송합니다.')){
        $("#hidden2").val(number);
        console.log("hidden2의 value : " + $("#hidden2").val());
        $("#MyTimer").css("display", "block");

        timer();

        axios.get('/sendemail', {
            params: {
                useremail: pwveriform.m_email.value,
                number: number
            }
        });

        setTimeout(numberReset, 3 * 1000 * 60);
    }else{
        return;
    }
}

function numberReset(){
    $("#hidden2").val("");
    $("#MyTimer").css("display", "none");
    alert("인증 시간이 만료되었습니다.");
    console.log("3분 후 hidden2의 value : " + $("#hidden2").val());
}

//인증
function verieMail(){
    if($("#hidden2").val() == pwveriform.m_email_veri.value){
        $("#hidden").val(0);
        alert("인증되었습니다.");
    }
    else{
        alert("인증번호를 확인해주세요.");
    }
}

//비밀번호 변경페이지로
function validate(){
    var objID = document.getElementById("m_id");
    var objEmail = document.getElementById("m_email");
    var objEmailVeri = document.getElementById("m_email_veri");

    if ((objID.value) == ""){
        alert("아이디를 입력하지 않았습니다.");
        objID.focus();
        return false;
    }
    if ((objEmail.value) == ""){
        alert("이메일을 입력하지 않았습니다.");
        objEmail.focus();
        return false;
    }
    if ((objEmailVeri.value) == ""){
        alert("이메일 인증을 해주세요.");
        objEmailVeri.focus();
        return false;
    }
    if($('#hidden').val() == 1){
        alert("이메일 인증을 해주세요.");
        objID.focus();
        return false;
    }

    setCookie("m_id",pwveriform.m_id.value,1 );
    
    location.href="/pw_change.html";
}

//쿠키
var setCookie = function(name, value, exp) {
	var date = new Date();
	date.setTime(date.getTime() + exp*24*60*60*1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

$(document).ready(function(){
    $("#pwveriform").keyup(function(event) {
        if (event.which === 13) {
            $(".submit_btn").click();
        }
    });
})