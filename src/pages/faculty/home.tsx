import {Button, Label, Table} from '@gravity-ui/uikit';
import {Link} from 'react-router-dom';

const data = [
  {
    faculty: 'undecided',
    student: 'Reinhardt von Lohengramm',
    major: 'Politics',
    status: ['in_progress'],
    updated: '10-01-3600 09:30 AM',
    id: '01',
  },
  {
    faculty: 'undecided',
    student: 'Qui-Gon-Jin',
    major: 'Jedi Master',
    status: ['complete'],
    updated: '10-01-0000 09:30 AM',
    id: '02',
  },
];

const dataFormat = data.map((item) => ({
  faculty: item.faculty,
  student: item.student,
  major: <Link to="/">{item.major}</Link>,
  status: (
    <div className="flex justify-between">
      {item.status.map((status) => (
        <Link to="/">
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
  {id: 'faculty', name: 'faculty', width: 200},
  {id: 'student', name: 'student', width: 200},
  {id: 'major', name: 'Major', width: 400},
  {id: 'status', name: 'Status', width: 200},
  {id: 'updated', name: 'Updated', width: 300},
];

const FacultyHome = () => {
  return (
    <section>
      <h1 className="text-xl font-bold">St. Olaf POS</h1>
      <Button>New</Button>
      <Table data={dataFormat} columns={col} className="" />
    </section>
  );
};

export default FacultyHome;
