import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const App = () => (
  <Carousel 
  className='rounded-lg shadow-lg shadow-gray-300 overflow-hidden'
  autoplay>
    <div>
      <h3 style={contentStyle}>
      <img
      src='./assets/images/image (1).jpg'
      />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}><img
      src='./assets/images/image (2).jpg'
      /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img
      src='./assets/images/image (3).jpg'
      /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img
      src='./assets/images/image (4).jpg'
      /></h3>
    </div>
  </Carousel>
);
export default App;