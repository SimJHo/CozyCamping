function doSubmit(){
    axios.get('/idVerification', {
        params: {
            m_name: idveriform.m_name.value,
            m_tel: idveriform.m_tel.value
        }
    })
    .then(function (response) {
        console.log(response.data.data);
        if(idveriform.m_name.value == "" || idveriform.m_tel.value ==""){
            $(".modal-body").text("이름과 휴대전화 번호를 입력해주세요.");
        }
        else if(idveriform.m_tel.value.length < 12){
            $(".modal-body").text("형식에 맞지 않는 휴대전화 번호 입니다.");
        }
        else if(response.data.data.length == 0){
            $(".modal-body").text("가입되지 않은 이름 또는 휴대전화 번호입니다.");
        }
        else{
            $(".modal-body").text(idveriform.m_name.value + "님의 아이디는 " + JSON.stringify(response.data.data[0].m_id) + "입니다.");
        }
    })
}


$(document).ready(function(){
    $("#idveriform").keyup(function(event) {
        if (event.which === 13) {
            $(".submit_btn").click();
        }
    });
})