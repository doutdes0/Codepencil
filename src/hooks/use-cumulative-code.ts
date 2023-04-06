import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (threadID: string, cellID: string) => {
  return useTypedSelector((state) => {
    const cells = state.cells.data[threadID];
    const order = state.cells.order[threadID];

    const orderedList = order.map((id) => cells[id]);
    const cumulativeCode = [
      `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        const _root = _ReactDOM.createRoot(root);
        const show = (val) => {
          if(typeof val === 'object') {
            if(val.$$typeof && val.props) {
              _root.render(val);
            } else {
            root.innerHTML = JSON.stringify(val);
            }
          } else {
            root.innerHTML = val;
          }
        }
        `,
    ];

    for (let c of orderedList) {
      if (c.type === 'code') {
        if (c.id === cellID) {
          cumulativeCode.push(c.content);
          break;
        } else {
          const regex = /show(.*)/g;
          cumulativeCode.push(c.content.replace(regex, ''));
        }
      }
    }
    return cumulativeCode.join('\n');
  });
};
