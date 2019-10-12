/**
 * 鼠标拖放
 *  <div style={{ cursor: 'col-resize'}} onMouseDown={e => Resize.dragResize(e, this.resize)} ></div>
 */
export default class MouseDrag {
    static test(el) {
        debugger
        console.log(el)
    }
    static dragResize(e, callback) {
        /**
         * 开启
         */
        let dragBar = e.target;
        e.preventDefault();
        let dragBarOffset = dragBar.offsetLeft;
        let oldClientX = e.clientX
        let oldClientWidth = dragBar.parentElement.clientWidth
        let dragging = true
        /**
         * 移动
         */
        document.onmousemove = (e) => {
            let offset = e.clientX - oldClientX
            dragBar.style.position = 'relative';
            dragBar.style.left = offset + 'px';
        }
        /**
         * 放
         */
        document.onmouseup = (e) => {
            let offset = e.clientX - oldClientX
            dragBar.style.left = '0';
            console.log(dragBar)
            console.log(dragBar, offset, oldClientWidth)
            dragBar.parentElement.style.width = (offset + oldClientWidth) + 'px'
            document.onmousemove = null;
            document.onmouseup = null;
            if (callback) {
                callback()
            }
        }
    }
}
