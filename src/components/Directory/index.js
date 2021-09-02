import React from 'react';
import './styles.scss';
import foto1 from './../../assets/lasvegas-jorgetono.jpg';
import foto2 from './../../assets/lasvegas-jorgecony.jpg';

const Directory=(props)=>{
  console.log("foto1",foto1);
  return (
    <div className="directory">
      <div className="wrap">
        <div 
          className="item" 
          style={{backgroundImage:"url("+foto1+")"}}
        >
          <a href="#">Shop Mens</a>
        </div>
        <div style={{backgroundImage:"url("+foto2+")"}}
          className="item">
            <a href="#">Shop Womens</a>
        </div>
      </div>
    </div>
  );
}

export default Directory;