import {Button, Label, Table} from '@gravity-ui/uikit';
import {Link} from 'react-router-dom';

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
  {form_id: 2, major: 'Mathematics', status: ['complete'], updated: '01-02-2023 09:30 AM'},
  {form_id: 3, major: 'Computer Science', status: ['complete'], updated: '01-02-2023 09:30 AM'},
];

const dataFormat = data.map((item) => ({
  major: <Link to={'/form/' + String(item.form_id)}>{item.major}</Link>,
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
        <h1 className="text-xl font-bold">St. Olaf POS</h1>

        <Link to="/">
          <Button size="l" view="action">
            New
          </Button>
        </Link>
      </div>

      <Table data={dataFormat} columns={col} className="" />
    </section>
  );
};

export default StudentHome;
