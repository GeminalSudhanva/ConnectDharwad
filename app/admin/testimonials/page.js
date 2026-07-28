'use client';
import CrudPage from '../CrudPage';
export default function TestimonialsAdmin() {
  return <CrudPage resource="testimonials" title="Testimonials" description="Approve, edit or delete customer reviews."
    fields={[
      { key: 'name', label: 'Name', required: true },
      { key: 'role', label: 'Role / Company', placeholder: 'e.g. HR Head, TechNova' },
      { key: 'quote', label: 'Quote', type: 'textarea', required: true },
      { key: 'rating', label: 'Rating (1-5)', type: 'number', default: 5 },
      { key: 'type', label: 'Type', type: 'select', options: ['Corporate', 'Student'], default: 'Corporate' },
      { key: 'photoUrl', label: 'Photo', type: 'image' },
      { key: 'approved', label: 'Approved', type: 'boolean', hint: 'Show on site', default: true },
    ]} />;
}
