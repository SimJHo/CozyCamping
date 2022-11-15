if(sessionStorage.getItem("login") != "ok" && getCookie("login") != "ok"){
    let sumAll2 = 0;

    $('.sumPriceHidden').each(function(){
        if(!isNaN($(this).val())){
            sumAll2 += parseInt($(this).val());
        }
    });

    document.write(sumAll2.toLocaleString());
}