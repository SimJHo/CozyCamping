axios.get("../products/footer.html")
.then(function(response){
    footer(response);
})
function footer(response){
    $('#footer').html(response.data);
}  