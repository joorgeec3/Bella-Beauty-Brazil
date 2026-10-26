import { serviceGalleryFor } from './bellaApprovedMedia';
export type ServiceCover = { src: string; specific: boolean };
// No treatment may borrow a photo from a different procedure's folder.
export const serviceCoverFor = (serviceId: string): ServiceCover | undefined => {
  const {photos,illustrative} = serviceGalleryFor(serviceId);
  // The former Nano cover (01.webp) is sideways. 08.webp shows a clear,
  // upright brow mapping progression, without altering the client's colours.
  const cover = serviceId === 'nano-strokes' && photos.length >= 8 ? photos[7] : serviceId === 'brow-sculpt' && photos.length >= 2 ? photos[1] : photos[0];
  return cover ? {src:cover.src,specific:!illustrative} : undefined;
};
