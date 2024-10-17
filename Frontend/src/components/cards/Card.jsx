
import React from 'react';

const Card = ({ title, number,icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-2 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-2xl font-bold text-gray-800">{number}</p>
      </div>
      <div className="text-3xl text-gray-600">{icon}</div>
    </div>
  );
};

export default Card;
