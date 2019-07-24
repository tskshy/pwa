function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        console.error("浏览器不支持PWA，建议切换浏览器");
        return;
    }

    // 注册service worker
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        return registration;
    }).catch((err) => {
        console.error('ServiceWorker registration failed: ', err);
    });
}

window.onload = function () {
    //registerServiceWorker();
    appendIndexInfo(1);
}

function appendIndexInfo(i) {
    fetch(location.origin + "/assets/json/" + i + ".json").then((response) => {
        if (response.status === 200) {
            response.json().then((jn) => {
                jn.forEach(element => {
                    //var id = element.id;
                    var desc = element.desc;
                    var date = element.date;
                    // 如果url为空，则表明是本站点的地址，以时间为维度生产url地址
                    var url = element.url;
                    if (url == "") {
                        url = location.origin + "/assets/md/" + date + ".html";
                    }

                    var d = document.createElement("div");
                    d.setAttribute("class", "item");
                    //d.setAttribute("id", id + "");

                    var innerHtml = '<div class="desc">' + desc + '</div>';
                    innerHtml += '<div class="date">' + date + '</div>';
                    innerHtml += '<div class="website"><a href="' + url + '" target="_blank">' + url + '</a></div>';

                    d.innerHTML = innerHtml;
                    document.getElementById("list").appendChild(d);
                });
            }).catch((err) => {
                alert(err);
            });
            return;
        }
        alert(response.status + ":" + response.statusText);
    }).catch((err) => {
        alert(err);
    });
}
