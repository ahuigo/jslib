import osmtogeojson from 'osmtogeojson';

window.ahuiid = 0;
/**
 * Ajax 接口封装
 */
class Ajax {
  options = {
    method: 'GET',
    headers: {},
  }

  /**
   * init
   * @param {String} url 
   * @param {String:'get|post|put|delete|...'} method 
   * @param {Object} data   {key1:value1, key2:value2}
   * @param {String} type 'json','form','urlencode'
   * @param {Object} options 'fetch options'
   */
  static request(url, method = "get", data = null, options = {}) {
    let api = new Ajax()
    api.url = url
    api.data = data
    api.type = 'json'
    api.options = {
      ...api.options, ...options,
      method: method.toUpperCase(),
      credentials: 'include',
    }
    return api;
  }

  /**
   * Disable send cookie via inlude
   */
  disableCookie() {
    delete this.options['credentials']
    return this
  }

  /**
   * 准备参数
   */
  prepareReq() {
    if (!this.hasPrepared) {
      this.hasPrepared = true;
    } else {
      return this
    }
    let options = this.options
    if (this.data) {
      if (options.method === 'GET') {
        this.url = this.buildUri(this.url, this.buildQuery(this.data))
      } else {
        options['mode'] = 'cors';
        switch (this.type) {
          case 'form':
            options.body = this.buildBody(this.data)
            break;
          case 'urlencode':
            options.body = this.buildQuery(this.data)
            break;
          case 'json':
            options.body = JSON.stringify(this.data)
            break;
        }
        this.options = options
      }
    }
    return this
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
    })
    return this
  }

  /**
   * 
   * @param {*} options 
   */
  setOption(options) {
    this.options = { ...this.options, ...options }
    return this
  }

  /**
   * 开启error reject
   */
  enableReject() {
    this.hasRejected = true
  }

  /**
   * 
   * @param {Function} successHandler 
   * @returns Promise<any>
   */
  then(successHandler) {
    this.prepareReq()
    return new Promise((resolve, reject) => {
      window.ahuiid++
      console.debug('Debug request count:', window.ahuiid)
      fetch(this.url, this.options).then(async (response) => {
        if (response.status === 401) {
          this.login()
        }
        if (!response.ok) {
          throw Error(response.statusText);
        }
        let res = await this.parseResponse(response)

        resolve(successHandler ? successHandler(res) : res)
      }).catch(e => {
        this.error(e.message, e);
        if (this.hasRejected) {
          reject(e)
        }
      })
    })
  }

  login() {
    if (document.location.host.split(':')[0].endsWith('.baidu.com') || true) {
      var url = 'http://login.com/?url=' + encodeURIComponent(document.location.href)
      document.location.href = url
    } else {
    }
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
        res = await response.text()
      }
    }
    return res
  }

  /**
   * @abstract parse osm xml 
   * @param {String} xml 
   */
  parseGeojson(xml) {
    const parser = new DOMParser();
    window.xml = xml; //debug
    const geojson = osmtogeojson(
      parser.parseFromString(xml, 'text/xml'),
      { flatProperties: false }
    );
    return geojson;
  }


  /**
   * 
   * @param {String} type 'json|form|urlencode'
   */
  requestType(type = 'json') {
    this.type = type
    switch (type) {
      case 'urlencode':
        this.addHeader({ 'Content-Type': 'application/x-www-form-urlencoded' })
        break;
      case 'json':
        this.addHeader({ 'Content-Type': 'application/json' })
        break;
    }
    return this
  }

  /**
   * 添加header头
   * @param {Object} headers {'Content-Type':'application/text'}
   */
  addHeader(headers) {
    this.options.headers = { ...this.options.headers, ...headers }
  }

  /**
   * parseGeoJson
   */
  enableGeojson() {
    this.parseType = 'geojson'
    return this
  }

  /**
   * 
   * @param {String} type 
   */
  setParseType(type = 'json') {
    this.parseType = type
    return this
  }

  /**
   * @abstract 禁止错误弹窗
   */
  disablePopupError() {
    this.noPopupError = true
    return this
  }

  /**
   * @abstract KeepPopupError
   */
  keepPopupError() {
    this.isKeepPopupError = true
    return this
  }

  /**
   * Build URLSearachParams
   * @param {Object} params 
   */
  buildQuery(params) {
    if (typeof params === 'string') {
      return params
    }
    return Object.entries(params).map(([key, value]) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }).join('&');
  }

  /**
   * 
   * @param {String} url 
   * @param {String} query 
   */
  buildUri(url, query) {
    url += url.indexOf('?') > 0 ? '' : '?';
    url += (url.endsWith('&') || url.endsWith('?')) ? query : '&' + query;
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
    if (
      Object.prototype.toString.call(data) ===
      '[object Object]'
    ) {
      fd = new FormData();
      for (var k in data) {
        if (
          data[k] instanceof FileList ||
          data[k] instanceof Array
        ) {
          for (var v of data[k]) fd.append(k + '[]', v);
        } else {
          fd.append(k, data[k]);
        }
      }
    } else {
      fd = data;
    }
    return fd
  }

  /**
   * @abstract 弹出错误
   * @param {*} msg 
   * @param {*} data 
   */
  error(msg, data) {
    console.error(data)
    if (this.noPopupError) {
      return
    }
    //NotificationActionCreators.error(new FriendlyError(msg))
    var div = document.createElement('div')
    div.id = 'fetch-error'
    div.style = `position: fixed;text-align: center;padding-top: 0px;left: 50%;border-radius: 10px;font-weight: bold;color: #a94442;
    background-color: #f2dede;top: 68px;margin: 0px;width: 100px;opacity: 0.8;z-index: 99999;`
    div.innerHTML = `
    <div style=" padding: 1em; ">${msg}</div>
  `
    document.body.appendChild(div)
    if (!this.isKeepPopupError) {
      var i = 0;
      var timer = setInterval(() => { i = i < 0 ? 100 : i - 1; div.style.top = i + 'px' }, 100)
      setTimeout(() => { clearInterval(timer); div.remove() }, 10000)

    }

  }
}
export default Ajax;