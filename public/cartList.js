if(sessionStorage.getItem("login") == "ok" || getCookie("login") == "ok"){

    if(sessionStorage.getItem("user_id") != null){
        $('#hidden').val(sessionStorage.getItem("user_id"));
    }else{
        $('#hidden').val(getCookie("user_id"));
    }

    axios.get('/cart', {
        params: {
            user_id: $("#hidden").val(),
        }
    })
    .then(function (response) {
        let value = [] = response.data.data;
        console.log(value);

        for(let i = 0; i< value.length; i++){
            // console.log(value[i].imgenum);
            $("#left_block").append(`
                <div class="d-flex justify-content-between align-items-center data flex-wrap">
                    <div class="subdiv d-flex flex-wrap">
                        <div class="checks etrans check">
                            <input type="checkbox" id="check_box${i+1}" class="all_check" name="buy" value="${value[i].imgenum}" checked="" onclick="javascript:basket.checkItem();">
                            <label for="check_box${i+1}" class="check_box"></label>
                        </div>
                        <div><a href="/product_detail.html/123?id=${value[i].imgenum}"><img src="${value[i].imge}" class="img" width="100px" height="100px"></a></div>
                        <div class="pname" style="width: 250px;">
                            <span id="local_title">${value[i].title}</span><br>${value[i].titleen}<br><br>
                        </div>
                    </div>
                    <div class="subdiv d-flex price_area">
                        <div class="basketprice"><input type="hidden" name="p_price${i+1}" id="p_price${i+1}" class="p_price"
                                value="${value[i].price}">${value[i].price.toLocaleString()}<span>원</span></div>
                        <div class="num">
                            <div class="updown d-flex">
                                <input type="text" name="p_num${i+1}" id="p_num${i+1}" size="2" maxlength="4" class="p_num" value="${value[i].count}"
                                    onkeyup="javascript:basket.changePNum(${i+1});">

                                <div class="up" onclick="javascript:basket.changePNum(${i+1});">+</div>                            
                    
                                <div class="down" onclick="javascript:basket.changePNum(${i+1});">-</div>
                                
                            </div>
                        </div>
                        <div class="sum" id="sumPrice">${value[i].total}</div><span class="sum">원</span>
                    </div>
                </div>
                <input type="hidden" class="sumPriceHidden" value="${value[i].total.replace(/,/g, "")}">
                <input type="hidden" class="sumCountHidden" value="${value[i].count}">
            `)
        }
        let sumAll = 0;

        $('.sumCountHidden').each(function(){
            if(!isNaN($(this).val())){
                sumAll += parseInt($(this).val());
            }
        });
        
        $('.sumCountText').text(sumAll);

        let sumAll2 = 0;

        $('.sumPriceHidden').each(function(){
            if(!isNaN($(this).val())){
                sumAll2 += parseInt($(this).val());
            }
        });
        
        $('.sumPriceText').text(sumAll2.toLocaleString());
    })
}
else{
    for(let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        
        console.log(key+value);

        $("#left_block").append(`
            <div class="d-flex justify-content-between align-items-center data flex-wrap">
                <div class="subdiv d-flex flex-wrap">
                    <div class="checks etrans check">
                        <input type="checkbox" id="check_box${i+1}" class="all_check" name="buy" value="${value.title}" checked="" onclick="javascript:basket.checkItem();">
                        <label for="check_box${i+1}" class="check_box"></label>
                    </div>
                    <div><a href="/product_detail.html/123?id=${value.imgenum}"><img src="${value.imge}" class="img" width="100px" height="100px"></a></div>
                    <div class="pname" style="width: 250px;">
                        <span id="local_title">${value.title}</span><br>${value.titleen}<br><br>
                    </div>
                </div>
                <div class="subdiv d-flex price_area">
                    <div class="basketprice"><input type="hidden" name="p_price${i+1}" id="p_price${i+1}" class="p_price"
                            value="${value.price.replace(/,/g, "")}">${value.price.toLocaleString()}<span>원</span></div>
                    <div class="num">
                        <div class="updown d-flex">
                            <input type="text" name="p_num${i+1}" id="p_num${i+1}" size="2" maxlength="4" class="p_num" value="${value.count}"
                                onkeyup="javascript:basket.changePNum(${i+1});">
                            
                            <div class="up" onclick="javascript:basket.changePNum(${i+1});">+</div>                            
                    
                            <div class="down" onclick="javascript:basket.changePNum(${i+1});">-</div>
                            
                        </div>
                    </div>
                    <div class="sum" id="sumPrice">${value.total}</div><span class="sum">원</span>
                </div>
            </div>
            <input type="hidden" class="sumPriceHidden" value="${value.total.replace(/,/g, "")}">
            <input type="hidden" class="sumCountHidden" value="${value.count}">
        `)
    }
}