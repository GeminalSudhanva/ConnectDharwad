'use client';
import CrudPage from '../CrudPage';
export default function JobsAdmin() {
  return <CrudPage resource="jobs" title="Jobs" description="Manage open positions listed on the Recruitment page."
    fields={[
      { key: 'title', label: 'Position', required: true },
      { key: 'company', label: 'Company', required: true },
      { key: 'location', label: 'Location' },
      { key: 'type', label: 'Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
      { key: 'experience', label: 'Experience', placeholder: '2-4 yrs' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'active', label: 'Active', type: 'boolean', hint: 'Show on site', default: true },
    ]} />;
}
