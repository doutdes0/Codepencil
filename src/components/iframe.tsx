import React, { useRef, useEffect } from 'react';
import './iframe.css';

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
        root.innerHTML = '<div style="color:red;font-family: Consolas, Courier New, monospace;">' + err + '</div>';
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
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="iframe-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      ></iframe>
    </div>
  );
};
export default Iframe;
