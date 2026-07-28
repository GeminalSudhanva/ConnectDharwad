'use client';
import CrudPage from '../CrudPage';
export default function GalleryAdmin() {
  return <CrudPage resource="gallery" title="Gallery" description="Upload photos and organize them by category."
    fields={[
      { key: 'title', label: 'Title', required: true },
      { key: 'category', label: 'Category', type: 'select', options: ['Corporate Training', 'Recruitment', 'Consultancy', 'Workshops', 'Seminars', 'Industrial Visits', 'Campus Events'], default: 'Workshops' },
      { key: 'url', label: 'Image', type: 'image', required: true },
    ]} />;
}
