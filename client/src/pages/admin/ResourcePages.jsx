import CrudPage from './CrudPage.jsx';

const date = (d) => (d ? new Date(d).toLocaleDateString() : '');

export function AdminServices() {
  return (
    <CrudPage
      title="Services"
      endpoint="/services"
      slugFrom="title"
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'icon', label: 'Icon name', type: 'text' },
        { name: 'shortText', label: 'Short text', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea', rows: 6 },
        { name: 'order', label: 'Order', type: 'number' },
      ]}
      columns={[
        { label: 'Order', render: (r) => r.order },
        { label: 'Title', render: (r) => r.title },
        { label: 'Short text', render: (r) => r.shortText },
      ]}
    />
  );
}

export function AdminCourses() {
  return (
    <CrudPage
      title="Courses"
      endpoint="/courses"
      slugFrom="title"
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'tools', label: 'Tools', type: 'list' },
        { name: 'duration', label: 'Duration', type: 'text' },
        { name: 'fee', label: 'Fee (PKR)', type: 'number' },
        { name: 'outline', label: 'Outline', type: 'list' },
        { name: 'image', label: 'Image', type: 'image' },
      ]}
      columns={[
        { label: 'Title', render: (r) => r.title },
        { label: 'Duration', render: (r) => r.duration },
        { label: 'Fee', render: (r) => r.fee },
      ]}
    />
  );
}

export function AdminBatches() {
  return (
    <CrudPage
      title="Batches"
      endpoint="/batches"
      fields={[
        { name: 'course', label: 'Course', type: 'relation', optionsEndpoint: '/courses', optionLabel: 'title', required: true },
        { name: 'startDate', label: 'Start date', type: 'date', required: true },
        { name: 'mode', label: 'Mode', type: 'select', options: ['Online', 'On-site'] },
        { name: 'totalSeats', label: 'Total seats', type: 'number', required: true },
        { name: 'seatsTaken', label: 'Seats taken', type: 'number' },
      ]}
      columns={[
        { label: 'Course', render: (r) => r.course?.title },
        { label: 'Start', render: (r) => date(r.startDate) },
        { label: 'Mode', render: (r) => r.mode },
        { label: 'Seats', render: (r) => `${r.seatsTaken} / ${r.totalSeats}` },
      ]}
    />
  );
}

export function AdminProjects() {
  return (
    <CrudPage
      title="Projects"
      endpoint="/projects"
      slugFrom="title"
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'capacity', label: 'Capacity (e.g. 10 kW)', type: 'text' },
        { name: 'sector', label: 'Sector', type: 'select', options: ['Residential', 'Commercial', 'Industrial', 'Agriculture', 'EV'] },
        { name: 'systemType', label: 'System type', type: 'select', options: ['On-grid', 'Off-grid', 'Hybrid'] },
        { name: 'city', label: 'City', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea', rows: 6 },
        { name: 'images', label: 'Gallery images', type: 'images' },
      ]}
      columns={[
        { label: 'Title', render: (r) => r.title },
        { label: 'Capacity', render: (r) => r.capacity },
        { label: 'Sector', render: (r) => r.sector },
        { label: 'City', render: (r) => r.city },
      ]}
    />
  );
}

export function AdminPosts() {
  return (
    <CrudPage
      title="Blog posts"
      endpoint="/posts"
      slugFrom="title"
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'coverImage', label: 'Cover image', type: 'image' },
        { name: 'content', label: 'Content', type: 'textarea', rows: 10, required: true },
      ]}
      columns={[
        { label: 'Title', render: (r) => r.title },
        { label: 'Category', render: (r) => r.category },
        { label: 'Published', render: (r) => date(r.publishedAt) },
      ]}
    />
  );
}