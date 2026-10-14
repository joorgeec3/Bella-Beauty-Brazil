import React from 'react';
import { siteImages } from '../data/siteImages';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = 'h-14 sm:h-16 w-auto' }) => (
  <img
    src={siteImages.brand.logoEmblem}
    alt="Bella Beauty Brazil"
    className={`${className} object-contain`}
    width={667}
    height={812}
    loading="eager"
  />
);
