'use client';
import CrudPage from '../CrudPage';
export default function ClientsAdmin() {
  return <CrudPage resource="clients" title="Clients" description="Corporate partner logos featured on the homepage."
    fields={[
      { key: 'name', label: 'Client Name', required: true },
      { key: 'logoUrl', label: 'Logo', type: 'image' },
      { key: 'order', label: 'Sort Order', type: 'number', default: 0 },
    ]} />;
}
