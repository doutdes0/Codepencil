import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'vertical' | 'horizontal';
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  if (direction === 'vertical') {
    resizableProps = {
      className: 'resizable-container-v',
      height: 400,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
    };
  } else {
    resizableProps = {
      className: 'resizable-container-h',
      height: Infinity,
      width: window.innerWidth * 0.6,
      resizeHandles: ['e'],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
