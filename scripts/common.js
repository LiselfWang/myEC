window.apiBase = "http://www.siteo.com.cn:8888";


function appendApiUrl(url){
    if(url.indexOf('/') === 0){
        return window.apiBase + url;
    }else{
        return window.apiBase + '/' + url;
    }
}

function aapendApiUrlForArray(array, attrName){
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        element[attrName] = appendApiUrl(element[attrName]);
    }
}

function myAjax(url, settings){
    if(settings) {
        if(settings.headers){
            settings.headers.token = "LISELF";
        }else{
            settings.headers = {
                token: "LISELF"
            };
        }
    }

    $.ajax(appendApiUrl(url),settings);
}