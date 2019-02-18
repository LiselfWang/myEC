$(function(){
    getProduct();
    
    function getProduct(){
        myAjax("/api/front/item", {
            dataType: "json",
            type:"get",
            success:function(data){
                var templateData = $("#template").html();

                aapendApiUrlForArray(data,'itemPic');

                var realData = Mustache.render(templateData,{"productList":data});
                $(".prodictSection").html(realData);
            }
        })
    }

    getAddress();
    function getAddress(){
        myAjax("/api/front/address", {
            dataType: "json",
            type:"get",
            success:function(data){
                var templateAddress = $("#addressTemplate").html();
                var realAddress = Mustache.render(templateAddress,{"adderssList":data});
                $(".userborder").html(realAddress);
            }
        })
    }

    function getBoughtItems(callback){
        $(".item-line").each(function(i){
            var check = $(this).find(".check");
            var number = parseInt($(this).find(".quantity").val());
            if(check.prop("checked")&&number>=1){
                callback&&callback(i,check.val(),number);
            }
        })
    }

    $(".prodictSection").on("change",".check,.quantity",function(){
        var money = 0;
        getBoughtItems(function(i,itemNumber,number){
            money += ($(".price").eq(i).html())*number;
        })

        $("#money").html("￥"+money);
    })

    $("#button").click(function(){
        items=[];
        getBoughtItems(function(i,itemNumber,number){
            items.push({
                itemNumber:itemNumber,
                quantity:number
            })
        })
        var message = $("textarea").val();
        var addressId = $("[name='address']:checked").val();
        console.log({
            items:items,
            message:message,
            addressId:addressId
        })
        
        myAjax("api/front/order",
        {
            dataType: "json",
            type:"post",
            headers:{'Content-Type':'application/json'},
            data:JSON.stringify({
                "addressId":addressId,
                "message":message,
                "items":items
            }),
            success:function(data){
                alert("您的订单号已生成："+data.orderNumber);
                window.location.href="./submitOrder.html"
            }
        }
        )


    })

})