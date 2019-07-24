// indexeddb 入门:  http://www.ruanyifeng.com/blog/2018/07/indexeddb.html
// pwa教程
//    https://blog.csdn.net/margin_0px/article/details/83000235
//    https://www.zhangxinxu.com/wordpress/2017/07/service-worker-cachestorage-offline-develop/

const uiShell = [
    "/index.html"
];

const uiVersion = "v2";

self.addEventListener("install", (event) => {
    console.log("sw: skip install");
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
    console.log("sw: activate");
});

self.addEventListener("fetch", (event) => {
    console.log(event.request);

    event.respondWith(
        caches.match(event.request).then((res) => {
            if (res) {
                return res;
            }

            let req = event.request.clone();
            return fetch(req).then(httpRes => {
                if (!httpRes || httpRes.status != 200) {
                    return httpRes;
                }

                let httpResClone = httpRes.clone();
                caches.open(uiVersion).then(cache => {
                    cache.put(event.request, httpResClone);
                });

                return httpRes;
            });
        })
    );

    // event.respondWith(caches.match(event.request).then((response) => {
    //     if (response) {
    //         console.log("response with cache");
    //         return response;
    //     }

    //     var request = event.request.clone();

    //     return fetch(request).then((httpRes) => {
    //         if (!httpRes || httpRes.status !== 200) {
    //             return httpRes;
    //         }

    //         var resClone = httpRes.clone();
    //         cache.open("abc-key-v1");
    //     });
    // }));
});

self.addEventListener("redundant", (event) => {
    console.log("sw: redundant .");
});