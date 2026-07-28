'use client';
import CrudPage from '../CrudPage';
export default function StatsAdmin() {
  return <CrudPage resource="stats" title="Statistics" description="Impact numbers shown on the homepage stats section."
    fields={[
      { key: 'label', label: 'Label', required: true, placeholder: 'e.g. Students Trained' },
      { key: 'value', label: 'Value', type: 'number', required: true, default: 0 },
      { key: 'suffix', label: 'Suffix', placeholder: '+ or %', default: '+' },
      { key: 'order', label: 'Sort Order', type: 'number', default: 0 },
    ]} />;
}
