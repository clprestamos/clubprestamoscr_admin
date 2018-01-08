import React from 'react';
import { Responsive } from 'semantic-ui-react';

const TitleHeader = (props) => {
  const {
    title,
    subHeader,
    imageHeader,
  } = props;
  return (
    <div>
      <Responsive maxWidth={768}>
        <div className="sub-header">
          <div className="left-content">
            <div className="divider" />
            <h2>{title}</h2>
            <div className="divider" />
            <img src={imageHeader} alt={title} />
            <p>{subHeader}</p>
          </div>
        </div>
      </Responsive>
      <Responsive minWidth={769}>
        <div className="sub-header">
          <div className="left-content">
            <div className="divider" />
            <h2>{title}</h2>
            <div className="divider" />
            <p>{subHeader}</p>
          </div>
          <div className="right-content">
            <img src={imageHeader} alt={title} />
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default TitleHeader;
