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

                $(".check,.quantity").change(sumUp);
 
                function sumUp(){
                    var money = 0;
                    for(var i=0;i<data.length;i++){
                        var number = parseInt($(".quantity").eq(i).val());
                      if($(".check").eq(i).prop("checked")&&(number>=1)) {
                        money += (data[i].itemPrice)*number;
                      }
                    }
                    $("#money").html(money);  
                }
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
    
    $("#button").click(function(){
        
    })
})