$(document).ready(function(){
    $('#price').on('focus', function(){
        var val = $('#price').val();
        if(!isEmpty(val) && isNumberic(val)){
            val = currencyFormatter(val);
            $('#price').val(val);
        }
    })

    $('#price').on('blur', function(){
        var val = $('#price').val();
        if(!isEmpty(val)){
            val = val.replace(/,/g, '');
            $('#price').val(val);
        }
    })
});

function isEmpty(value){
    if(value.length == 0 || value == null){
        return true;
    }
    else{
        return false;
    }
}

function isNumberic(value){
    var regExp = /^[0-9]+$/g;
    return regExp.test(value);
}

function currencyFormatter(amount){
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
