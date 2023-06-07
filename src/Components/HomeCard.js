import React from 'react';
import './UI/common.css';
import './styles/homecard.css';

const HomeCard = (props) => {
  const { image, name, onButtonPress } = props;

  return (
    <div className="home-card-container">
      <div className="card home-card" dir="rtl">
        <img
          src={`${image}`}
          className="home-card-img"
          alt="..."
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          onClick={onButtonPress}
        />
        <div className="home-card-body">
          <p className="home-card-text" onClick={onButtonPress}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
