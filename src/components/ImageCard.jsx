import React from 'react';

// Polaroid-style card
export const ImageCard = ({ imageUrl, altText = "image", title, description }) => {
    return (
      <div className="max-w-sm mx-auto overflow-hidden shadow-xl bg-white rounded-md p-3 h-[min(36rem,66dvh)] flex flex-col">
        <div className="relative flex-shrink-0 w-full h-[min(24rem,42dvh)]">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
        <div className="flex-1 min-h-0 px-1 pt-3 overflow-y-auto">
          <h2 className="mb-1 text-3xl font-bold font-hand text-rose-600">{title}</h2>
          <p className="text-sm leading-relaxed text-gray-600">{description}</p>
        </div>
      </div>
    );
  };
