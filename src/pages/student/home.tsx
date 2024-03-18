import {Button, Label, Table} from '@gravity-ui/uikit';
import {Link} from 'react-router-dom';

// Dummy data
const data = [
  {
    form_id: 0,
    major: 'Computer Science',
    status: ['in_progress', 'rejected'],
    updated: '01-02-2023 09:30 AM',
  },
  {
    form_id: 1,
    major: 'Mathematics',
    status: ['submitted_for_review'],
    updated: '01-02-2023 09:30 AM',
  },
  {
    form_id: 2,
    major: 'Mathematics',
    status: ['complete'],
    updated: '01-02-2023 09:30 AM',
  },
  {
    form_id: 3,
    major: 'Computer Science',
    status: ['complete'],
    updated: '01-02-2023 09:30 AM',
  },
];

const dataFormat = data.map((item) => ({
  major: (
    <Link className="underline" to={'/form/' + String(item.form_id)}>
      {item.major}
    </Link>
  ),
  status: (
    <div className="flex justify-between">
      {item.status.map((status) => (
        <Link to={'/form/' + String(item.form_id)}>
          <Label
            theme={
              status === 'in_progress'
                ? 'info'
                : status === 'complete'
                  ? 'success'
                  : status === 'submitted_for_review'
                    ? 'warning'
                    : 'danger'
            }
          >
            {status === 'in_progress'
              ? 'In Progress'
              : status === 'complete'
                ? 'Complete'
                : status === 'submitted_for_review'
                  ? 'Submitted For Review'
                  : 'Rejected'}
          </Label>
        </Link>
      ))}
    </div>
  ),
  updated: item.updated,
}));

const col = [
  {id: 'major', name: 'Major', width: 400},
  {id: 'status', name: 'Status', width: 200},
  {id: 'updated', name: 'Updated', width: 500},
];

const StudentHome = () => {
  return (
    <section>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">
          St. Olaf Program of Study
        </h1>
        <Link to="/form/new">
          <Button size="l" view="action">
            New
          </Button>
        </Link>
      </div>
      <Table data={dataFormat} columns={col} />
    </section>
  );
};

export default StudentHome;
