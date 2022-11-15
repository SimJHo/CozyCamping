const newURL = window.location.href;
const searchParams = new URL(newURL).searchParams;
const id = searchParams.get('id');

$(document).ready(function() {
    $('#summernote').summernote({
        height: 500
    });
    
    if(id == null){

    }
    else{
        axios.get('/noticetext', {
            params: {
                id : id
            }
        })
        .then(function (response) {
            console.log(response.data.data)
            let NOTICE_TEXT = response.data.data;
        
            $("#title").val(NOTICE_TEXT[0].title);
            $('#summernote').summernote('code', NOTICE_TEXT[0].text);
        })
    }
});

function submit(){
    if(id==null){
        if(confirm("공지사항을 등록하시겠습니까?")){
            axios.get('/noticewrite', {
                params: {
                    title: $("#title").val(),
                    text: $('#summernote').summernote('code')
                }
            })
            .then(function(){
                location.href="/notice.html";
                alert("공지사항 등록 완료");
            })
        }   
    }
    else{
        if(confirm("공지사항을 수정하시겠습니까?")){
            axios.get('/noticerewrite', {
                params: {
                    title: $("#title").val(),
                    text: $('#summernote').summernote('code'),
                    id: id
                }
            })
            .then(function(){
                location.href="/notice.html";
                alert("공지사항 수정 완료");
            })
        }
    }
}