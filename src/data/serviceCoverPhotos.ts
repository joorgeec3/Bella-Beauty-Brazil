import { serviceGalleryFor } from './bellaApprovedMedia';
export type ServiceCover = { src: string; specific: boolean };
// No treatment may borrow a photo from a different procedure's folder.
export const serviceCoverFor = (serviceId: string): ServiceCover | undefined => {
  const {photos,illustrative} = serviceGalleryFor(serviceId);
  return photos.length ? {src:photos[0].src,specific:!illustrative} : undefined;
};
