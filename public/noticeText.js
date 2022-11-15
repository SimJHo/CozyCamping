
const newURL = window.location.href;
const searchParams = new URL(newURL).searchParams;
const id = searchParams.get('id');

axios.get('/noticetext', {
    params: {
        id : id
    }
})
.then(function (response) {
    console.log(response.data.data)
    let NOTICE_TEXT = response.data.data;

    $("#item").append(`
        <tr>
            <th scope="row">${NOTICE_TEXT[0].num}</th>
            <td>${NOTICE_TEXT[0].title}</td>
            <td>${NOTICE_TEXT[0].date.substring(0,10)}</td>
        </tr>
        <tr>
            <td colspan="3">${NOTICE_TEXT[0].text}</td>
        </tr>
    `);
})

var getCookie = function(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    
	return value? value[2] : null;
};

window.onload = function () {
    if(getCookie('user_id') == '3'){
        $('.write_notice').css('display','block');
        $('.write_notice2').css('display','block');
    }
    else if(sessionStorage.getItem('user_id') == '3'){
        $('.write_notice').css('display','block');
        $('.write_notice2').css('display','block');
    }
    else{
        $('.write_notice').css('display','none');
        $('.write_notice2').css('display','none');
    }
}

function rewrite(){
    if(confirm("공지사항을 수정하시겠습니까?")){
        location.href="/notice_rewrite.html/rewrite?id="+id;
    }
}

function delNotice(){
    if(confirm("공지사항을 삭제하시겠습니까?")){
        axios.get('/noticedelete', {
            params: {
                id : id
            }
        })
    }
}