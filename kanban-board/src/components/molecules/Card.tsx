import React from 'react';

type Card = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Card = (props: Card) => {
  return (
    <div className={`rounded-lg shadow-lg ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
