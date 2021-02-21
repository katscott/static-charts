import React from 'react';

const FancyDiv: React.FC = ({ children }) => {
  return (
    <div data-testid="testid" style={{ border: '1px solid red' }}>
      {children}
    </div>
  );
};
export default FancyDiv;
