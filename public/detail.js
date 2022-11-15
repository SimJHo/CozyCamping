
//제품 불러오기
const newURL = window.location.href;
const searchParams = new URL(newURL).searchParams;
const id = searchParams.get('id');

function extractArray(response,id){
    console.log(response);
    for(let i=0;i<response.data.data.length;i++){
        if(response.data.data[i].imgenum == id) {
            return response.data.data[i]
        }
    }
}

axios({
    method: 'get',
    url: 'http://localhost:3000/productlist',
    responseType: 'json'
    })
    .then(function (response) { 
        let TITLEKO = extractArray(response,id);
            console.log(TITLEKO);
        $("#detail_container").append(`
        <div class="detail_main_img col-6">
            <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="3000">
                    <img src="${TITLEKO.imge}" id="ca_img" class="d-block" style="width: 500px; height: 500px" alt="...">
                    </div>
                    <div class="carousel-item " data-bs-interval="3000">
                    <img src="${TITLEKO.imge2}" class="d-block" style="width: 500px; height: 500px" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>

        <div class="detail_order_box col-6" id="detail_order_box">
            <div class="share_btn"><a href="#"><img src="../imge/공유.png" style="width: 30px; height: 30px"></a></div>
            <p class="korean" id="ca_title">${TITLEKO.title}</p>
            <p class="english" id="ca_titleen">&nbsp;&nbsp;${TITLEKO.titleen}</p><br>
            <p class="won"><span class="price" id="TITLEKO_price">${TITLEKO.price.toLocaleString()}</span> 원</p>
            <hr>
            <div class="count_btn">
                <div class="content_right">
                    <div class="qty">
                        <span class="count_text">수량&nbsp;</span>
                        <table style="height: 30px;">
                            <tr>
                                <td>
                                    <input type="text" name="ct_qty" id="ct_qty" value="1" readonly="readonly">
                                </td>
                                <td>
                                    <div class="minus"><a href="javascript:change_qty2('m')" onclick="price()"><img src="../imge/마이너스.png" alt="-"
                                                style="width: 30px; height: 30px;"></a>
                                    </div>
                                </td>
                                <td>
                                    <div class="plus"><a href="javascript:change_qty2('p')" onclick="price()"><img src="../imge/플러스.png" alt="+"
                                                style="width: 30px; height: 30px;"></a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <hr>
                    <dl>
                        <dt style="font-size : 20px; display: inline-block; color: #325341;">총 금액</dt>
                        <span id="total_amount">${TITLEKO.price.toLocaleString()}</span><span style ="font-weight: bolder; color: #325341; font-size: 15px"> 원</span>
                    </dl>
                </div>
            </div>

            <button type="button" class="go_cart" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="cart()">장바구니 담기</button>
            <a href="#"><button type="button" class="buy_btn">바로 구매</button></a><hr>
            <a href="#" class="expl_btn_a"><button type="button" class="expl_btn">사용 설명서</button></a>
        </div>

        <div class="detail_explain_box col-12" id="detail_explain_box">
            <img src="${TITLEKO.imge3}" class="d-block w-100" alt="...">
        </div>
        `) 
                                
    });
    
    
    Number.prototype.format = function () {
        if (this == 0) return 0;

        var reg = /(^[+-]?\d+)(\d{3})/;
        var n = (this + '');

        while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

        return n;
    };

    String.prototype.format = function () {
        var num = parseFloat(this);
        if (isNaN(num)) return "0";

        return num.format();
    };
    let basic_amount;
    let TITLEKO_price;
    function price(){
        TITLEKO_price = $('#TITLEKO_price').text();
        let ba = TITLEKO_price.replace(/,/g, "");
        basic_amount = ba;
    }
    
    // var basic_amount = TITLEKO_price;
    // console.log(numberStr);
    // console.log(basic_amount);

    function change_qty2(t) {
        //var min_qty = '수량버튼'*1;
        var min_qty = 1;
        var this_qty = $("#ct_qty").val() * 1;
        var max_qty = '200'; // 현재 재고
        if (t == "m") {
            this_qty -= 1;
            if (this_qty < min_qty) {
                //alert("최소구매수량 이상만 구매할 수 있습니다.");
                alert("수량은 1개 이상 입력해 주십시오.");
                return;
            }
        }
        else if (t == "p") {
            this_qty += 1;
            if (this_qty > max_qty) {
                alert("죄송합니다. 재고가 부족합니다.");
                return;
            }
        }

        var show_total_amount = basic_amount * this_qty;
        //$("#ct_qty_txt").text(this_qty); 
        $("#ct_qty").val(this_qty);
        $("#it_pay").val(show_total_amount);
        $("#total_amount").html(show_total_amount.format());
    }                    

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

    //장바구니 담기
    function cart(){
        if(sessionStorage.getItem("login") == "ok" || getCookie("login") == "ok"){

            if(sessionStorage.getItem("user_id") != null){
                $('#hidden').val(sessionStorage.getItem("user_id"));
            }else{
                $('#hidden').val(getCookie("user_id"));
            }

            axios.get('/cartlist', {
                params: {
                    user_id: $('#hidden').val(),
                    count: $('#ct_qty').val(),
                    total: $('#total_amount').text(),
                    imgenum: id
                }
            });
        }
        else{
            var cartobj = { 'imge': $('#ca_img').attr("src"), 'title': $('#ca_title').text(), 'titleen': $('#ca_titleen').text(),'price': $('#TITLEKO_price').text(),'count':$('#ct_qty').val(), 'total':$('#total_amount').text(), 'imgenum': id };

            localStorage.setItem($('#ca_title').text(), JSON.stringify(cartobj));
        }
    }