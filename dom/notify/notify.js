export default class Notify {

  /**
   * 显示错误信息
   * @param {string} msg 
   */
  static error(msg) {
    this.notify(msg, 'error')
  }
  static info(msg) {
    this.notify(msg, 'info')
  }
  static success(msg) {
    this.notify(msg, 'success')
  }
  static notify(msg, status = 'success', timeout = 4) {
    //NotificationActionCreators.error(new FriendlyError(msg))
    let cssColor = {
      success: 'color: #468847; background-color: #DFF0D8',
      error: 'color: #a94442; background-color: #f2dede;',
      info: `color: #3A87AD; background-color: #D9EDF7;`
    }[status]
    var div = document.createElement('div')
    div.id = 'global-notice-container'
    div.style = `border-radius: 10px;font-weight: bold; padding:1em;width: 100px;margin:5px;${cssColor};`
    div.innerText = msg;
    this.getNoticeContainer().appendChild(div)
    // var i = div.style.top.match(/\d{1,}/)[0];
    // console.log(i)
    // var timer = setInterval(() => { i = i <= 0 ? 0 : i - 1; div.style.top = i + '%' }, 100)
    setTimeout(() => {
      // clearInterval(timer);
      // div.remove()
      div.style.display = 'none'
    }, timeout * 1000)
  }
  static getNoticeContainer() {
    if (!this._container) {
      let id = 'global-notice-container'
      this._container = document.querySelector('#' + id)
      if (!this._container) {
        let div = document.createElement('div')
        div.id = 'global-notice-container'
        div.style = `position: fixed; text-align: center; top: 80px; right: 0; font-weight: bold; color: #a94442;
    background:rgb(0,0,0,0); z-index: 10002; `
        document.body.appendChild(div)
        this._container = div
      }
    }
    return this._container
  }

  /**
   * 
   * @param {*} msg 
   * @param {*} e 
   */
  static hover(e, msg) {
    console.log(e, window.event)
    console.log(e.clientX, e.MouseEvent)
    e = window.event
    let box = this.getContainer('hover')
    box.style = `display:block;position: fixed; z-index:10001;left:${e.x - 10}px; top:${e.y + 20}px; 
    border: 1px solid;
    padding: 8px;
    border-radius: 8px;
    background: rgb(251, 238, 213);`;
    box.innerText = msg;
    e.target.onmouseout = () => {
      box.style.display = 'none';
    }
    // document.body.appendChild(box)
  }
  static getContainer(id) {
    id = 'global-notify-container-' + id
    if (!this._containers[id]) {
      this._containers[id] = document.querySelector('#' + id)
      if (!this._containers[id]) {
          const div = document.createElement('div')
        div.id = id
        document.body.appendChild(div)
        this._containers[id] = div
      }
    }
    return this._containers[id]
  }

  /**
   * 
   * @param {*} e 
   * @param {*} callback 
   */
  static fullScreen(target, callback) {
      const oldCssText = target.style.cssText;
    target.style.cssText += 'position: fixed; left: 0; top: 0; right: 0; z-index: 10000; bottom: 0';
    // let btn = document.createElement('botton');
      const keyEvent = document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        target.style.cssText = oldCssText
        target.onkeydown = undefined
        if (callback) callback()
        document.removeEventListener('keydown', keyEvent)
      }
    })
    this.success('按ESC 返回')
    //btn.style.cssText = ''
  }
}
Notify._containers = []
