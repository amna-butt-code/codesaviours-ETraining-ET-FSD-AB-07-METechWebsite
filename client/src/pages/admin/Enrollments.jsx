import RecordsTable from './RecordsTable.jsx';

const columns = [
  { label: 'Date', render: (r) => new Date(r.createdAt).toLocaleDateString() },
  { label: 'Name', render: (r) => r.name },
  { label: 'Phone', render: (r) => r.phone },
  { label: 'Email', render: (r) => r.email },
  { label: 'University', render: (r) => r.university },
  { label: 'Course', render: (r) => r.course?.title },
  { label: 'Batch start', render: (r) => (r.batch ? new Date(r.batch.startDate).toLocaleDateString() : '') },
];

export default function Enrollments() {
  return <RecordsTable title="Enrollments" endpoint="/enrollments" columns={columns} />;
}