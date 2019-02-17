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
        myAjax("/api/backend/order", {
            dataType: "json",
            type:"get",
            success:function(data){
                var templateData = $("#orderTemplate").html();
                var realData = Mustache.render(templateData,{"orderList":data});
                $(".orderSection").html(realData);
                $(".send").click(function(){
                    $("#shippingModal").modal();
                });

                $(".check").click(function(){
                    $("#orderItemModal").modal();
                });
            }
        })
    }

     $("[name='delivery']").click(function(){
         // todo ajax
         $("#shippingModal").modal('hide');
     });

     $(".cancel").click(function(){
        $(".itemCheck").empty();
     })

     $(".orderSection").on("click",".check",function(){
         var id = $(this).data("id");
         myAjax("/api/backend/order/orderItem/"+id,{
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