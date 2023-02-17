import React, { useRef, useEffect } from 'react';

interface IframeProps {
  code: string;
}

const html = ` <html>
<head></head>
<body>
  <div id="root"></div>
  <script>
    window.addEventListener('message', (e) => {
      try {
        eval(e.data);
      } catch(err) {
        const root = document.getElementById('root');
        root.innerHTML = '<div>' + err + '</div>';
        console.error(err);
      }
      
    }, false);
  </script>
</body>
</html>`;

const Iframe: React.FC<IframeProps> = ({ code }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    //Reset iframe before each bundling/whenever code changes
    iframe.current.srcDoc = html;
    //Post a message from parent window to iframe, containing bundled code
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <iframe
      title="preview"
      ref={iframe}
      srcDoc={html}
      sandbox="allow-scripts"
    ></iframe>
  );
};
export default Iframe;
