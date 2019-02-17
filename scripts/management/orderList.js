$(function(){
    var shippingOrderNumber;
    getShippingList();
    function getShippingList(){
        myOrderAjax("api/backend/shipping",{
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
        myOrderAjax("/api/backend/order", {
            dataType: "json",
            type:"get",
            success:function(data){
                var templateData = $("#orderTemplate").html();
                var realData = Mustache.render(templateData,{"orderList":data});
                $(".orderSection").html(realData);
                $(".send").click(function(){
                    shippingOrderNumber = $(this).data('order-number');
                    $("#shippingModal").modal();
                });

                $(".check").click(function(){
                    $("#orderItemModal").modal();
                });
            }
        })
    }

     $("[name='delivery']").click(function(){
         var shippingId = $(".select").find("option:selected").data("id");
         var shippimgNumber = $(".shippingNumber").val();
         myOrderAjax("/api/backend/order/shipping",{
            dataType: "json",
            headers:{'Content-Type':'application/json'},
            type:"put", 
            data:JSON.stringify({
                "orderNumber":shippingOrderNumber,
                "shippingId":shippingId,
                "shippingNumber":shippimgNumber
            }),
            success:function(data){
                getOrderList();
            }
         })
         $("#shippingModal").modal('hide');
     });

     $(".cancel").click(function(){
        $(".itemCheck").empty();
     })

     $(".orderSection").on("click",".check",function(){
         var id = $(this).data("order-number");
         myOrderAjax("/api/backend/order/orderItem/"+id,{
         dataType: "json",
         type:"get",
         success:function(data){
            var detailtemplate = $("#itemTemplate").html();
            var realDetail = Mustache.render(detailtemplate,{"itemCheck":data});
            $(".itemCheck").html(realDetail);
            }
        })
     })
});