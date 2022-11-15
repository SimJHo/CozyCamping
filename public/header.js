axios.get("../products/header.html")
.then(function(response){
    header(response);
})
function header(response){
    $('#header').html(response.data);
}  