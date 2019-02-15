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

    getOrderList();
    function getOrderList(){
        
    }

    $("[name='delivery']").click(function(){
        $(".modal-content,.modal-backdrop").hide();
        if($(".shippingNumber").change()){
            if($(".shippingNumber").val()!=""){
                $("td.status").text("已发货");
            }else if($(".shippingNumber").val()==""){
                $("td.status").text("未发货");
            }
        }
    })

    $(".send").click(function(){
        $(".modal-content,.modal-backdrop").show();
    })

    $(".check").click(function(){
        $(".modal-content,.modal-backdrop").show();
    })

})