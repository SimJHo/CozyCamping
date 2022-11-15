
window.onload = function () {
    axios.get('/search/newest', {
        params: {
            title: sessionStorage.getItem("search"),
            titleen: sessionStorage.getItem("search"),
            category: sessionStorage.getItem("search")
        }
    })
    .then(function (response){
        listLength(response);
    })

    function listLength(response){
        $('.list_length').val(response.data.data.length);
        console.log(response.data.data.length);
        $(".recommend").append(`<hr>검색결과 : ` + response.data.data.length + ` 건<hr>`);

        if(response.data.data.length == 0){
            $("#item").append(`<h1 style="color: #325341; margin-top: 100px">해당되는 상품이 없습니다.</h1>`);
        }

        tableInsert();
    }    
};

const pageList = 12; // 한개의 페이지에 보여질 목록 개수
const pageMax = 5; // 최대 생성될 페이지 개수 (페이지를 더보려면 이전, 다음 버튼 클릭해야함)    	
var idx = 0; //idx 값 확인 후 동적 페이지 전환 및 데이터 표시
var page = 1; //생성 시작할 페이지 번호

/* [tbody tr 동적 삽입 이벤트 수행 함수] */
function tableInsert() {
    

    pageInsert(page);
};

/* [페이징 처리 이벤트 수행 함수] */
function pageInsert(value) {
    // [페이징 목록 초기화 실시]
    $("#dyn_ul").empty();
    // [생성된 테이블 tr 개수 확인 >> 페이징 처리 5개씩 목록 자름]    		
    var startIndex = value; // 생성 시작 페이지    		
    //var endIndex = $("#dyn_tbody tr").length; // tbody에 동적으로 추가된 tr 개수 확인
    var endIndex = $('.list_length').val(); // 배열에 있는 길이 확인

    console.log(endIndex);
    // [tr 개수에 따라 페이징 해야할 개수 확인]
    var pageCount = 0;
    var pagePlus = 0;
    if (endIndex > pageList) { // tr 행 개수가 5 이상인 경우 (임의로 설정)
        pageCount = Math.floor(endIndex / pageList); //생성될 페이지 수 (소수점 버림)
        pagePlus = endIndex % pageList; //추가 나머지 자식 수
        if (pagePlus > 0) { //추가 자식수가 있는경우 >> 페이지 추가
            pageCount = pageCount + 1;
        }
    }
    // [생성될 페이지 번호가 전체 생성되야하는 길이보다 크거나 작은지 확인]
    if (startIndex > pageCount) { //길이 초과 시 기존꺼로 다시 저장
        startIndex = page;
    }
    else if (startIndex < 0) { //길이 미만 시 기존꺼로 다시 저장
        startIndex = page;
    }
    else {
        page = startIndex;
    }
    // [동적 ul 페이징 처리 실시]
    if (pageCount == 1) { //생성해야할 페이지가 1페이지인 경우
        var insertUl = "<li class='page-item'>"; // 변수 선언
        insertUl += insertUl + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage(1);'>";
        insertUl += insertUl + i;
        insertUl += insertUl + "</a></li>";
        $("#dyn_ul").append(insertUl); //jquery append 사용해 동적으로 추가 실시      			
    }
    else if (pageCount >= 2) { //생성해야할 페이지가 2페이지 이상인 경우
        // 이전 페이지 추가 실시 
        var insertSTR = "<li class='page-item'>"; // 변수 선언
        insertSTR = insertSTR + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage(" + "-1" + ");'>";
        insertSTR = insertSTR + "이전";
        insertSTR = insertSTR + "</a></li>";
        $("#dyn_ul").append(insertSTR); //jquery append 사용해 동적으로 추가 실시      			

        // 특정 1, 2, 3 .. 페이지 추가 실시
        var count = 1;
        for (var i = startIndex; i <= pageCount; i++) {
            if (count > pageMax) { //최대로 생성될 페이지 개수가 된 경우 
                page = i - pageMax; //생성된 페이지 초기값 저장 (초기 i값 4 탈출 인경우 >> 1값 저장)
                break; //for 반복문 탈출
            }
            var insertUl = "<li class='page-item'>"; // 변수 선언
            insertUl = insertUl + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage(" + i + ");'>";
            insertUl = insertUl + String(i);
            insertUl = insertUl + "</a></li>";
            $("#dyn_ul").append(insertUl); //jquery append 사용해 동적으로 추가 실시  
            count++;
        }
        // 다음 페이지 추가 실시
        var insertEND = "<li class='page-item'>"; // 변수 선언
        insertEND = insertEND + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage(" + "0" + ");'>";
        insertEND = insertEND + "다음";
        insertEND = insertEND + "</a></li>";
        $("#dyn_ul").append(insertEND); //jquery append 사용해 동적으로 추가 실시
    }
    // [페이징 완료 후 >> tr 개수 전체 삭제 >> 페이징 개수에 맞게 다시 표시 실시]
    $(".card").remove(); //tbody tr 전체 삭제 실시
    // [새롭게 페이지 목록 리스트 처리 실시]
    newPage(startIndex);
};
/* [tbody tr 동적 삽입 이벤트 수행 함수] */
function newPage(pageCurrent) {
    // [pageCurrent [-1] >> 이전 / pageCurrent [1 이상] >> 일반 / pageCurrent [0] >> 다음]
    // [새롭게 테이블 tbody tr 데이터 생성 실시]
    if (pageCurrent == -1) { // 이전 페이지
        $(".card").remove(); //tbody tr 전체 삭제 실시
        // [새롭게 페이징 처리 실시]
        var newIdx = page - pageMax;
        // [테이블 데이터에 따라 페이징 처리 실시]
        pageInsert(newIdx); //표시될 페이지 번호 전송
    }
    else if (pageCurrent == 0) { // 다음 페이지
        $(".card").remove(); //tbody tr 전체 삭제 실시
        // [새롭게 페이징 처리 실시]
        var newIdx = page + pageMax;
        // [테이블 데이터에 따라 페이징 처리 실시]
        pageInsert(newIdx); //표시될 페이지 번호 전송
    }
    else { // 일반 테이블 목록 리스트 갱신
        $(".card").remove(); //tbody tr 전체 삭제 실시
        // 저장된 idx 에서 페이지 수를 곱해서 새로운 idx 지정
        // [1페이지 클릭 >> (1*5) -5 = 0 시작]
        // [2페이지 클릭 >> (2*5) -5 = 5 시작]
        idx = (pageCurrent * pageList) - pageList;

        var checkCount = 1;
        
        let TITLEKO = [];
        let sort;
        if($('.radio1').is(":checked") == true){
            sort = "http://localhost:3000/search/newest";
        }
        else if($('.radio2').is(":checked") == true){
            sort = "http://localhost:3000/search/popularity";
        }
        else if($('.radio3').is(":checked") == true){
            sort = "http://localhost:3000/search/lowprice";
        }
        else{
            sort = "http://localhost:3000/search/highprice";
            
        }
        axios.get(sort, {
            params: {
                title: sessionStorage.getItem("search"),
                titleen: sessionStorage.getItem("search"),
                category: sessionStorage.getItem("search")
            }
        })
        .then(function (response) {
            TITLEKO = response.data.data;
            // console.log(TITLEKO);
            for (var i = idx; i < TITLEKO.length; i++) { //반복문을 수행하면서 tbody에 tr데이터 삽입 실시
                if (checkCount > pageList) { //한페이지에 표시될 목록을 초과한 경우
                    break;
                }
                $("#item").append(`
                    <div class="card col-lg-3 col-md-4 col-sm-6 text-center">
                        <div class="card_img">
                            <a href="/product_detail.html/detail?id=${TITLEKO[i].imgenum}" id="link_${TITLEKO[i].imgenum}">
                                <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner"style="height: 330px; width: 330px; margin: auto;">
                                        <div class="carousel-item carousel1${TITLEKO[i].imgenum} active">
                                            <img src="${TITLEKO[i].imge}" class="d-block rounded" alt="..." style="height: 330px; width: 330px; margin: auto; margin-top: 5px;">
                                        </div>
                                        <div class="carousel-item carousel2${TITLEKO[i].imgenum}">
                                            <img src="${TITLEKO[i].imge2}" class="d-block rounded" alt="..." style="height: 330px; width: 330px; margin: auto; margin-top: 5px;">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="card_text"><a href="/product_detail.html/123?id=${TITLEKO[i].imgenum}" id="link_${TITLEKO[i].imgenum}"><br><br>
                                <h2 class="name_kr">${TITLEKO[i].title}</h2>
                                <h3 class="name_en">${TITLEKO[i].titleen}</h3><br>
                                <div class="price">${TITLEKO[i].price.toLocaleString()}<span class="won">원</span></div>
                            </a>
                        </div>
                    </div>
                    <script>
                        $("#link_${TITLEKO[i].imgenum}").mouseover(function(){
                            $(".carousel1${TITLEKO[i].imgenum}").removeClass("active");
                            $(".carousel2${TITLEKO[i].imgenum}").addClass("active");
                        })
                        $("#link_${TITLEKO[i].imgenum}").mouseout(function(){
                            $(".carousel2${TITLEKO[i].imgenum}").removeClass("active");
                            $(".carousel1${TITLEKO[i].imgenum}").addClass("active");
                        })
                    </script>
                    `);
                checkCount++;
            };
        });
    };
};

