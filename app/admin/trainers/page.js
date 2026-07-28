'use client';
import CrudPage from '../CrudPage';
export default function TrainersAdmin() {
  return <CrudPage resource="trainers" title="Trainers" description="Manage the featured trainers shown on the site."
    fields={[
      { key: 'name', label: 'Name', required: true },
      { key: 'role', label: 'Designation', required: true, placeholder: 'e.g. Lead Corporate Trainer' },
      { key: 'experience', label: 'Experience', placeholder: '18+ yrs' },
      { key: 'photoUrl', label: 'Photo', type: 'image' },
      { key: 'linkedin', label: 'LinkedIn URL' },
      { key: 'bio', label: 'Bio', type: 'textarea' },
      { key: 'order', label: 'Sort Order', type: 'number', default: 0 },
    ]} />;
}
