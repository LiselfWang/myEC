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

                for(var i=0;i<data.length;i++){
                    $(".check").eq(i).change(function(){
                        sumUp();
                    })
                    $(".quantity").eq(i).change(function(){
                        sumUp();
                    })
                }
 
                function sumUp(){
                    var money = 0;
                    for(var i=0;i<data.length;i++){
                        var number = parseInt($(".quantity").eq(i).val());
                      if($(".check").eq(i).prop("checked")&&(number>=1)) {
                        money += (data[i].itemPrice)*number;
                        $("#money").html(money);
                      }
                    }
                }
            }
        })
    }
       
       
})