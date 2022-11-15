window.onload = function(){
    $('#m_id').val(getCookie("m_id"));
    console.log( $('#m_id').val());

    $("#pwcheckform").keyup(function(event) {
        if (event.which === 13) {
            $(".submit_btn").click();
        }
    });
}


function validate() {
    
    var objPwd1 = document.getElementById("m_pass");
    var regul1 = /^[a-zA-Z0-9]{4,12}$/;

    //비밀번호 입력 하지 않았을 경우
    if ((objPwd1.value) == ""){
        alert("비밀번호를 입력해 주세요");
        objPwd1.focus();
        return false;
    }

    //비밀번호 유효성 검사
    //만약 내가 비밀번호에 정규화 방식을 하나라도 지키지 않으면 if문 안으로 들어가서 alert message를 띄움
    if (!check(regul1,objPwd1,"비밀번호는 4~12자의 대소문자와 숫자로만 입력 가능합니다.")) {
        return false;
    }

    axios.get('/pwcheck', {
        params: {
            m_id: $('#m_id').val(),
            m_pass: pwcheckform.m_pass.value
        }
    })
    .then(function (response) {
        console.log(response.data.data);
        if(response.data.data.length == 1){
            location.href="/pw_change.html";
            alert("비밀번호 변경 화면으로 이동합니다.");
        }
        else if(response.data.data.length == 0 ){
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
    })

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

var getCookie = function(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    
	return value? value[2] : null;
};