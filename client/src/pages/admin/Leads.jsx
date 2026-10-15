import RecordsTable from './RecordsTable.jsx';

const columns = [
  { label: 'Date', render: (r) => new Date(r.createdAt).toLocaleDateString() },
  { label: 'Name', render: (r) => r.name },
  { label: 'Phone', render: (r) => r.phone },
  { label: 'Email', render: (r) => r.email },
  { label: 'City', render: (r) => r.city },
  { label: 'Service', render: (r) => r.service },
  { label: 'Message', render: (r) => r.message },
  { label: 'Source', render: (r) => r.source },
];

export default function Leads() {
  return <RecordsTable title="Leads" endpoint="/leads" columns={columns} />;
}