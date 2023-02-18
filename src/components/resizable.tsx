import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'vertical' | 'horizontal';
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      className="resizable-container"
      height={400}
      width={1000}
      resizeHandles={['s']}
      maxConstraints={[1000, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 24]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
