if(sessionStorage.getItem("login") != "ok" && getCookie("login") != "ok"){
    let sumAll = 0;

    $('.sumCountHidden').each(function(){
        if(!isNaN($(this).val())){
            sumAll += parseInt($(this).val());
        }
    });
    
    document.write(sumAll);
}