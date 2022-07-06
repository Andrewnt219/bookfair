import React from 'react';
import { ZoomablePhoto } from './ZoomablePhoto';

export interface PhotosGridProps {
  photoSrcs: string[];
}

export const PhotosGrid = ({ photoSrcs }: PhotosGridProps) => {
  return (
    <ul
      className="list-unstyled"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.5rem',
      }}
    >
      {photoSrcs.map((src) => (
        <li key={src}>
          <ZoomablePhoto alt="Listing's photo" src={src} />
        </li>
      ))}
    </ul>
  );
};
