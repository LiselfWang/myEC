$(function(){
    getShippingList();
    function getShippingList(){
        myAjax("api/backend/shipping",{
            dataType: "json",
            type:"get",
            success:function(data){
                var shippingTemplate = $("#shippingTemplate").html();
                var shipping = Mustache.render(shippingTemplate,{"shippingList":data});
                $(".select").html(shipping);
            } 
        })
    }



})