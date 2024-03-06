import {Table} from '@gravity-ui/uikit';

const data = [
  {major: 'Computer Science', status: ['in progress', 'rejected'], updated: 'date'},
  {major: 'Mathematics', status: 'submitted for review', updated: 'date'},
  {major: 'Mathematics', status: 'complete', updated: 'date'},
  {major: 'Computer Science', status: 'complete', updated: 'date'},
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
