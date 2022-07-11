document　到底部检测:

    window.scrollY+document.body.clientHeight >= document.documentElement.scrollHeight

    //或（等价）
    window.scrollY + window.innerHeight
    >= document.documentElement.scrollHeight

div(overflow:scroll, height:100px) 底部检测

    div.scrollTop + div.clientHeight >=div.scrollHeight 
