import React from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';

const HomePageLayout=(props)=>{

  return (
    <div className="fullHeight">
      <Header {...props}/>
        <div className="adjusth">
          {props.children}
        </div>
      <Footer/>
    </div>
  );
}

export default HomePageLayout;