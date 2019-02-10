$(function(){
    getProduct();
    
    function getProduct(){
        $.ajax(window.apiBase + "/api/front/item", {
            headers: {
                token:"LISELF"
            },
            dataType: "json",
            type:"get",
            success:function(data){
                var templateData = $("#template").html();
                var realData = Mustache.render(templateData,{"productList":data});
                $(".prodictSection").html(realData);
            }
        })
    }
})