'use client';
import CrudPage from '../CrudPage';
export default function AnnouncementsAdmin() {
  return <CrudPage resource="announcements" title="Announcements" description="Highlight news and updates on the homepage."
    fields={[
      { key: 'title', label: 'Title', required: true },
      { key: 'date', label: 'Date', required: true, placeholder: 'Jun 30, 2025' },
      { key: 'description', label: 'Short Description', type: 'textarea' },
      { key: 'pinned', label: 'Pin to top', type: 'boolean' },
    ]} />;
}
