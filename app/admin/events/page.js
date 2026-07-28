'use client';
import CrudPage from '../CrudPage';
export default function EventsAdmin() {
  return <CrudPage resource="events" title="Events" description="Create upcoming events and archive past ones."
    fields={[
      { key: 'title', label: 'Event Title', required: true },
      { key: 'date', label: 'Date', required: true, placeholder: 'Jul 15, 2025' },
      { key: 'location', label: 'Location', placeholder: 'Dharwad' },
      { key: 'bannerUrl', label: 'Banner', type: 'image' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'registerUrl', label: 'Registration URL' },
      { key: 'isPast', label: 'Past event', type: 'boolean', hint: 'Move to past events section' },
    ]} />;
}
