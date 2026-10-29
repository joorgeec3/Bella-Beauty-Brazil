import { serviceGalleryFor } from './bellaApprovedMedia';
export type ServiceCover = { src: string; specific: boolean };
// No treatment may borrow a photo from a different procedure's folder.
export const serviceCoverFor = (serviceId: string): ServiceCover | undefined => {
  const {photos,illustrative} = serviceGalleryFor(serviceId);
  // Use the last Nano Strokes gallery image as the service cover.
  const cover = serviceId === 'lip-blush' && photos.length >= 6 ? photos[5] : serviceId === 'nano-strokes' && photos.length > 0 ? photos[photos.length - 1] : serviceId === 'brow-sculpt' && photos.length >= 2 ? photos[1] : photos[0];
  return cover ? {src:cover.src,specific:!illustrative} : undefined;
};
