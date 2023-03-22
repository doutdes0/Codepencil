import React, { useRef, useEffect } from 'react';
import './iframe.css';

interface IframeProps {
  code: string;
  bundlerErr: string;
}

const html = ` <html>
<head></head>
<body>
  <div id="root"></div>
  <script>
  const root = document.getElementById('root');
  const handleError = (err) => {
    root.innerHTML = '<div style="color:red;font-family: Consolas, Courier New, monospace;background-color:white;">' + err + '</div>';
    console.error(err);
  };
    window.addEventListener('error', (e) => {
      e.preventDefault();
      handleError(e.error)
    });
    window.addEventListener('message', (e) => {
      try {
        root.innerHTML = '';
        eval(e.data);
      } catch (err) {
        handleError(err);
      }
    }, false);
  </script>
</body>
</html>`;

const Iframe: React.FC<IframeProps> = ({ code, bundlerErr }) => {
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
      {bundlerErr && <div className="bundler-error">{bundlerErr}</div>}
    </div>
  );
};
export default Iframe;
