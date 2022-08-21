

// if (window.location.protocol.indexOf('https') == 0) {
//   var el = document.createElement('meta');
//   el.setAttribute('http-equiv', 'Content-Security-Policy');
//   el.setAttribute('content', 'upgrade-insecure-requests');
//   document.head.append(el);
// }

function postMessage(type: string, data?: any) {
  if (!window.parent || window.parent.window === window) return;
  window.parent.postMessage({ data, type }, '*');
}

// @ts-ignore
window.postMessageToParent = postMessage;

export function updateParentURL() {
  postMessage('redirect', { url: window.location.href });
}

/* These are the modifications: */
history.pushState = ((f: Function) =>
  function pushState() {
    var ret = f.apply(history, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.pushState);

history.replaceState = ((f: Function) =>
  function replaceState() {
    var ret = f.apply(history, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.replaceState);

window.addEventListener('popstate', () => {
  console.log('popstate');
  window.dispatchEvent(new Event('locationchange'));
});

// if (window.parent == window) {
window.addEventListener('locationchange', function () {
  updateParentURL();
});

window.addEventListener('message', function (e) {
  if (!e.data) return;
  const data = e.data.data;
  switch (e.data.type) {
    case 'setIframeMapView':
      break;
  }
});

if (parent.window != window) {
  updateParentURL();
  postMessage('getParentMapView'); // 初始化后从主页面获取当前地图视角，并更新localstorage
}
