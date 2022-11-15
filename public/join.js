function validate() {
    //event.preventDefault();
    var objID = document.getElementById("m_id");
    var objPwd1 = document.getElementById("m_pass");
    var objPwd2 = document.getElementById("m_pass2");
    var objEmail = document.getElementById("m_email");
    var objName = document.getElementById("m_name");
    var objPnum = document.getElementById("m_tel");
    var objDate = document.getElementById("m_date");

    //아이디와 패스워드 값 데이터 정규화 공식
    var regul1 = /^[a-zA-Z0-9]{4,12}$/;
    //이메일 값 데이터 유효성 체크
    //[]안에 있는 값만 쓰겠다

    //이메일 정규화 공식
    var regul2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    //이름 정규화 공식
    var regul3 = /^[가-힝a-zA-Z]{2,}$/;
    //var email = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);
    var regul4 = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;

    //아이디 입력 하지 않았을 경우
    if ((objID.value) == ""){
        alert("아이디를 입력하지 않았습니다.");
        objID.focus();
        return false;
    }
    //아이디 유효성 검사
    //내가 입력한 데이터를 검사하는 check()
    //만약 내가 아이디에 정규화 방식을 하나라도 지키지 않으면 if문 안으로 들어가서 alert message를 띄움
    if (!check(regul1,objID,"아이디는 4~12자의 대소문자와 숫자로만 입력 가능합니다.")) {
        return false;//반환 할 곳 없이 if문 탈출
    }
    //아이디 입력 하지 않았을 경우
    if ((objID.value) == ""){
        alert("아이디를 입력하지 않았습니다.");
        objID.focus();
        return false;
    }
    //휴대번호를 입력 하지 않았을 경우
     if ((objPnum.value) == ""){
        alert("휴대번호를 입력하지 않았습니다.");
        objID.focus();
        return false;
    }
    //비밀번호 입력 하지 않았을 경우
    if ((objPwd1.value) == ""){
        alert("비밀번호를 입력해 주세요");
        objPwd1.focus();
        return false;
    }
    if ((objPwd2.value=="")){
        alert("비밀번호를 입력해 주세요");
        objPwd2.focus();
        return false;
    }

    //비밀번호 유효성 검사
    //만약 내가 비밀번호에 정규화 방식을 하나라도 지키지 않으면 if문 안으로 들어가서 alert message를 띄움
    if (!check(regul1,objPwd1,"비밀번호는 4~12자의 대소문자와 숫자로만 입력 가능합니다.")) {
        return false;
    }
    
    //비밀번호와 비밀번호 확인이 일치 하지 않을 경우
    if ((objPwd1.value)!=(objPwd2.value)) {
        alert("비밀번호가 일치 하지 않습니다.");
        objPwd1.focus();
        objPwd2.focus();
        return false;
    }
    //이메일 입력 안했을 경우
    if ((objEmail.value)=="") {
        alert("이메일을 입력해 주세요");
        objEmail.focus();
        return false;
    }
    //이메일이 잘못된 경우
    if (!check(regul2,objEmail,"이메일을 잘못 입력 했습니다.")) {
        return false;
    }
    //이름 입력 안 한 경우
    if ((objName.value)=="") {
        alert("이름을 입력해 주세요");
        objName.focus();
        return false;
    }
    //이름에 특수 문자가 들어간 경우
    if (!check(regul3,objName,"이름이 잘못 되었습니다.")) {
        return false;
    }
    if ((objDate.value)=="") {
        alert("생년월일을 입력해 주세요");
        objDate.focus();
        return false;
    }
    if (!check(regul4,objDate,"생년월일이 잘못 되었습니다.")) {
        return false;
    }
    if($('#hidden').val() == 1){
        alert("아이디 중복 확인을 해주세요");
        objID.focus();
        return false;
    }
    if($('#hidden2').val() == 1){
        alert("휴대번호 중복 확인을 해주세요");
        objPnum.focus();
        return false;
    }
    if($('#hidden3').val() == 1){
        alert("이메일 중복 확인을 해주세요");
        objEmail.focus();
        return false;
    }

    alert("회원가입이 완료되었습니다.");
}

function check(re,what,message){//정규화데이터,아이템 id,메세지
    if (re.test(what.value)) {//what의 문자열에 re의 패턴이 있는지 나타내는 함수 test
    //만약 내가 입력한 곳의 값이 정규화 데이터를 썼다면 true를 반환해서 호출 된 곳으로 리턴됨
        return true;
    }
    alert(message);
    what.value = "";
    what.focus();
}

//휴대번호
function inputPhoneNumber(obj) {

    var number = obj.value.replace(/[^0-9]/g, "");
    var phone = "";

    if (number.length < 4) {
        return number;
    } else if (number.length < 7) {
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3);
    } else if (number.length < 11) {
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3, 3);
        phone += "-";
        phone += number.substr(6);
    } else {
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3, 4);
        phone += "-";
        phone += number.substr(7);
    }
    obj.value = phone;
}

$(document).ready(function() {
    $(".form-control").keyup(function(event) {
        if (event.which === 13) {
            $(".submit_btn2").click();
        }
    });
});

function idCheck(){
    $('#hidden').val(1);
    if($('#m_id').val() == ""){
        alert("아이디를 입력해주세요.");
    }
    else{
        axios.get('/idcheck', {
            params: {
                m_id: joinform.m_id.value
            }
        })
        .then(function (response) {
            console.log(response.data.data[0].cnt);
            if(response.data.data[0].cnt == 0){
                alert('사용 가능한 아이디 입니다.');
                $('#hidden').val(0);
            }
            else{
                alert('이미 존재하는 아이디 입니다.');
                $('#hidden').val(1);
            }
        })
    }
}

function telCheck(){
    $('#hidden2').val(1);
    if($('#m_tel').val() == ""){
        alert("휴대전화 번호를 입력해주세요.");
    }
    else{
        axios.get('/telcheck', {
            params: {
                m_tel: joinform.m_tel.value
            }
        })
        .then(function (response) {
            console.log(joinform.m_tel.value.length);
            console.log(response.data.data[0].cnt);
            if(response.data.data[0].cnt == 0 && joinform.m_tel.value.length >= 12){
                alert('사용 가능한 휴대번호 입니다.');
                $('#hidden2').val(0);
            }
            else if(response.data.data[0].cnt == 0 && joinform.m_tel.value.length < 12){
                alert('형식에 맞지 않는 번호입니다.');
                $('#hidden2').val(1);
            }
            else{
                alert('이미 가입된 번호 입니다.');
                $('#hidden2').val(1);
            }
        })
    }
}

function emailCheck(){
    $('#hidden3').val(1);
    if($('#m_email').val() == ""){
        alert("이메일을 입력해주세요.");
    }
    else{
        axios.get('/emailcheck', {
            params: {
                m_email: joinform.m_email.value
            }
        })
        .then(function (response) {
            console.log(joinform.m_email.value.length);
            console.log(response.data.data[0].cnt);
            if(response.data.data[0].cnt == 0){
                alert('사용 가능한 이메일 입니다.');
                $('#hidden3').val(0);
            }
            else{
                alert('이미 가입된 이메일 입니다.');
                $('#hidden3').val(1);
            }
        })
    }
}

function focusOut(){
    $('#hidden').val(1);
}

function focusOut2(){
    $('#hidden2').val(1);
}

function focusOut3(){
    $('#hidden3').val(1);
}