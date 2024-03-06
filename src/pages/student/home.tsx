import {Label, Table} from '@gravity-ui/uikit';
import {Link} from 'react-router-dom';

const data = [
  {
    major: 'Computer Science',
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
    updated: 'date',
  },
  {
    major: 'Mathematics',
    status: (
      <Link to="/">
        <Label theme="info">In Progress</Label>
      </Link>
    ),
    updated: 'date',
  },
  {
    major: 'Mathematics',
    status: (
      <Link to="/">
        <Label theme="success">Complete</Label>
      </Link>
    ),
    updated: 'date',
  },
  {
    major: 'Computer Science',
    status: (
      <Link to="/">
        <Label theme="success">Complete</Label>
      </Link>
    ),
    updated: 'date',
  },
];

const col = [
  {id: 'major', name: 'Major', width: 200},
  {id: 'status', name: 'Status', width: 200},
  {id: 'updated', name: 'Updated', width: 200},
];

const StudentHome = () => {
  return (
    <section>
      <h1 className="text-xl font-bold">St. Olaf POS</h1>
      <Table data={data} columns={col} className="" />
    </section>
  );
};

export default StudentHome;
