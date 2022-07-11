// cookie proxy hook
function proxyCookie() {
    const cookieDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
        Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
    if (cookieDesc && cookieDesc.configurable) {
        Object.defineProperty(document, 'cookie', {
            get: function () {
                return cookieDesc.get.call(document);
            },
            set: function (val) {
                console.log(val);
                cookieDesc.set.call(document, val);
            }
        });
    }
}

export { proxyCookie, initCookie }

/**
 *
 * Example: 
 * 	Cookie.set('key', 'value');//setCookie
 */
function initCookie() {
    if (Cookie._inited === undefined) {
        Cookie._inited = 1;
        //var self = Cookie.prototype;
        const self = Cookie;
        self.set = function (k, v, time) {
            if (time === undefined) {
                document.cookie = k + "= " + v + "; path=/";
            } else {
                const d = new Date();
                d.setSeconds(d.getSeconds() + time);
                document.cookie = k + "= " + v + "; path=/; expires=" + d.toString();
            }
        };
        self.get = function (k) {
            const value = "; " + document.cookie;
            const parts = value.split("; " + k + "=");
            if (parts.length == 2)
                return parts.pop().split(";")[0];
        };
    }
}
