import osmtogeojson from 'osmtogeojson';
import Notify from 'util/ui/Notify';
import User from 'api/User';

/**
 * Ajax 接口封装
 */
class Ajax {
    options = {
        method: 'GET',
        headers: {}
    };

    /**
     * init
     * @param {String} url
     * @param {String:'get|post|put|delete|...'} method
     * @param {Object} data   {key1:value1, key2:value2}
     * @param {String} type 'json','form','urlencode'
     * @param {Object} options 'fetch options'
     */
    static request(url, method = 'get', data = null, options = {}) {
        let api = new Ajax();
        api.url = url;
        api.data = data;
        api.type = 'json';
        api.options = {
            ...api.options,
            ...options,
            method: method.toUpperCase(),
            credentials: 'include'
        };
        return api;
    }

    /**
     * Disable send cookie via inlude
     */
    disableCookie() {
        delete this.options['credentials'];
        return this;
    }

    /**
     * 准备参数
     */
    prepareReq() {
        if (!this.hasPrepared) {
            this.hasPrepared = true;
        } else {
            return this;
        }
        let options = this.options;
        if (this.data) {
            if (options.method === 'GET') {
                this.url = this.buildUri(this.url, this.buildQuery(this.data));
            } else {
                options['mode'] = 'cors';
                switch (this.type) {
                    case 'form':
                        options.body = this.buildBody(this.data);
                        break;
                    case 'urlencode':
                        this.addHeader({ 'Content-Type': 'application/x-www-form-urlencoded' });
                        options.body = this.buildQuery(this.data);
                        break;
                    case 'json':
                        this.addHeader({ 'Content-Type': 'application/json' });
                        options.body = JSON.stringify(this.data);
                        break;
                }
                this.options = options;
            }
        }
        return this;
    }

    /**
     * debug
     */
    debug() {
        this.prepareReq();
        console.debug('request params:', {
            url: this.url,
            data: this.data,
            options: this.options,
            type: this.type,
        });
        return this;
    }

    /**
     *
     * @param {*} options
     */
    setOption(options) {
        this.options = { ...this.options, ...options };
        return this;
    }

    /**
     *
     * @param {Function} successHandler
     * @returns Promise<any>
     */
    then(successHandler, errorHandler) {
        this.prepareReq();
        return new Promise((resolve, reject) => {
            fetch(this.url, this.options).then(async (response) => {
                var res;
                if (response.status === 401) {
                    User.login();
                }

                res = await this.parseResponse(response)
                if (!response.ok) {
                    throw (res && res.message) ? res : new Error(JSON.stringify(res))
                }
                resolve(successHandler ? successHandler(res) : res)
            }).catch(e => {
                this.error(e);
                if (errorHandler) {
                    return resolve(errorHandler(e))
                }
                reject(e)
            })
        })
    }
    catch(errorHandler) {
        return this.then(null, errorHandler)
    }
    /**
     * 
     */
    exec() {
        return this.then(d => d)
    }


    /**
     * 解析响应
     * @param {*} response
     * @param {*} resolve
     */
    async parseResponse(response) {
        var res;
        const contentType = response.headers.get('Content-Type');
        if (contentType != null) {
            if (this.parseType === 'geojson') {
                const text = await response.text();
                res = this.parseGeojson(text);
            } else if (contentType.indexOf('form') > -1) {
                res = await response.formData();
            } else if (contentType.indexOf('video') > -1) {
                res = await response.blob();
            } else if (contentType.indexOf('json') > -1) {
                res = await response.json();
            } else {
                let res_tmp = await response.text();
                try {
                    res = JSON.parse(res_tmp)
                } catch (e) {
                    res = res_tmp
                }
            }
        }
        return res;
    }

    /**
     * @abstract parse osm xml
     * @param {String} xml
     */
    parseGeojson(xml) {
        const parser = new DOMParser();
        window.xml = xml; //debug
        const geojson = osmtogeojson(parser.parseFromString(xml, 'text/xml'), {
            flatProperties: false
        });
        return geojson;
    }

    /**
     *
     * @param {String} type 'json|form|urlencode'
     */
    requestType(type = 'json') {
        this.type = type;
        return this;
    }

    /**
     * 添加header头
     * @param {Object} headers {'Content-Type':'application/text'}
     */
    addHeader(headers) {
        this.options.headers = { ...this.options.headers, ...headers };
    }

    /**
     * parseGeoJson
     */
    enableGeojson() {
        this.parseType = 'geojson';
        return this;
    }

    /**
     *
     * @param {String} type
     */
    setParseType(type = 'json') {
        this.parseType = type;
        return this;
    }

    /**
     * @abstract 禁止错误弹窗
     */
    disablePopupError() {
        this.noPopupError = true;
        return this;
    }

    /**
     * @abstract KeepPopupError
     */
    keepPopupError() {
        this.isKeepPopupError = true;
        return this;
    }

    /**
     * Build URLSearachParams
     * @param {Object} params
     */
    buildQuery(params) {
        if (typeof params === 'string') {
            return params;
        }
        return Object.entries(params)
            .map(([key, value]) => {
                if (value instanceof Date) {
                    return encodeURIComponent(key) + '=' + value.toISOString()
                }
                return encodeURIComponent(key) + '=' + encodeURIComponent(value);
            })
            .join('&');
    }

    /**
     *
     * @param {String} url
     * @param {String} query
     */
    buildUri(url, query) {
        url += url.indexOf('?') > 0 ? '' : '?';
        url += url.endsWith('&') || url.endsWith('?') ? query : '&' + query;
        if (this.options.cache === false) {
            url += `&_=${Date.now()}`;
        }
        return url;
    }

    /**
     * Build body
     * @param {Object|string} data
     */
    buildBody(data) {
        // this.addHeader({ 'Content-Type': 'application/octet-stream' });
        // options.body = options.file
        var fd;
        if (Object.prototype.toString.call(data) === '[object Object]') {
            fd = new FormData();
            for (var k in data) {
                if (data[k] instanceof FileList || data[k] instanceof Array) {
                    for (var v of data[k]) fd.append(k + '[]', v);
                } else {
                    fd.append(k, data[k]);
                }
            }
        } else {
            fd = data;
        }
        return fd;
    }

    /**
     * @abstract 弹出错误
     * @param {*} msg
     * @param {*} data
     */
    error(e) {
        console.debug({ error: e });
        if (this.noPopupError) {
            return;
        }
        if (e && e.message) {
            Notify.error(e.message);
        } else {
            Notify.error(e);
        }
    }
}
window.Ajax = Ajax
export default Ajax;

