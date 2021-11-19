      function loadJs(src){
          if(!src) return
          console.log(src)
          var script = document.createElement('script')
          script.src=src;
          document.body.appendChild(script)
      }

      function loadCss(src){
          if(!src) return
          console.log(src)
          var script = document.createElement('link')
          script.href=src;
          script.rel='stylesheet';
          document.head.appendChild(script)
      }

      function loadStyle(src){
          var script = document.createElement('style')
          script.innerHTML=src;
          document.head.appendChild(script)
      }

