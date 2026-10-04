import React from 'react';

// Polaroid-style card
export const ImageCard = ({ imageUrl, altText = "image", title, description }) => {
    return (
      <div className="max-w-sm mx-auto overflow-hidden shadow-xl bg-white rounded-md p-3 h-[36rem]">
        <div className="relative w-full h-[24rem]">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
        <div className="px-1 pt-3">
          <h2 className="mb-1 text-3xl font-bold font-hand text-rose-600">{title}</h2>
          <p className="text-sm leading-relaxed text-gray-600">{description}</p>
        </div>
      </div>
    );
  };
