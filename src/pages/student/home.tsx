import {Label, Table} from '@gravity-ui/uikit';
import {Link} from 'react-router-dom';

const data = [
  {major: 'Computer Science', status: ['in progress', 'rejected'], updated: 'date'},
  {major: 'Mathematics', status: 'submitted for review', updated: 'date'},
  {major: 'Mathematics', status: 'complete', updated: 'date'},
  {major: 'Computer Science', status: 'complete', updated: 'date'},
];

const dataFormat = [
  {
    major: <Link to="/">Computer Science</Link>,
    status: (
      <div className="flex justify-between">
        <Link to="/">
          <Label theme="info">In Progress</Label>
        </Link>
        <Link to="/">
          <Label theme="danger">Rejected</Label>
        </Link>
      </div>
    ),
    updated: '01-02-2023 09:30 AM',
  },
  {
    major: <Link to="/">Mathematics</Link>,
    status: (
      <Link to="/">
        <Label theme="info">In Progress</Label>
      </Link>
    ),
    updated: '01-02-2023 09:30 AM',
  },
  {
    major: <Link to="/">Mathematics</Link>,
    status: (
      <Link to="/">
        <Label theme="success">Complete</Label>
      </Link>
    ),
    updated: '01-02-2023 09:30 AM',
  },
  {
    major: <Link to="/">Computer Science</Link>,
    status: (
      <Link to="/">
        <Label theme="success">Complete</Label>
      </Link>
    ),
    updated: '01-02-2023 09:30 AM',
  },
];

const col = [
  {id: 'major', name: 'Major', width: 400},
  {id: 'status', name: 'Status', width: 200},
  {id: 'updated', name: 'Updated', width: 500},
];

const StudentHome = () => {
  return (
    <section>
      <h1 className="text-xl font-bold">St. Olaf POS</h1>
      <Table data={dataFormat} columns={col} className="" />
    </section>
  );
};

export default StudentHome;
