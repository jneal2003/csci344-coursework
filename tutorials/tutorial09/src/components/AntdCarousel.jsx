import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const App = () => {
  const onChange = currentSlide => {
    console.log(currentSlide);
  };
  return (
    <Carousel afterChange={onChange}>
      <div>
        <h3 style={contentStyle}>Hey</h3>
      </div>
      <div>
        <h3 style={contentStyle}>Its</h3>
      </div>
      <div>
        <h3 style={contentStyle}>Ya</h3>
      </div>
      <div>
        <h3 style={contentStyle}>Boy</h3>
      </div>
    </Carousel>
  );
};
export default App;