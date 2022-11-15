axios.get("../products/nav.html")
.then(function(response){
    nav(response);
})
function nav(response){
    $('#nav').html(response.data);
}  