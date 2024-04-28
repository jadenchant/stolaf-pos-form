import {Link} from 'react-router-dom';
import {Button, Label, Table} from '@gravity-ui/uikit';
import {ScreenSize} from '@/interface';
import useScreenSize from '../../hooks/useScreenSize';

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

const dataFormat = (data: any, screenSize: ScreenSize) => {
  return data.map((item: any) => ({
    major: (
      <Link
        className="underline"
        to={'/form/' + String(item.form_id)}
      >
        {item.major}
      </Link>
    ),
    status: (
      <div className="flex justify-between">
        {item.status.map((status: any) => (
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
              <span className="lg:text-[14px] md:text-[12px] text-[10px]">
                {status === 'in_progress'
                  ? 'In Progress'
                  : status === 'complete'
                    ? 'Complete'
                    : status === 'submitted_for_review'
                      ? 'Submitted For Review'
                      : 'Rejected'}
              </span>
            </Label>
          </Link>
        ))}
      </div>
    ),
    updated:
      screenSize.width > 700
        ? item.updated
        : item.updated.match(/(\d{2}-\d{2}-\d{4})/)[0],
  }));
};

const col = [
  {
    id: 'major',
    name: 'Major',
    width: 400,
    className: 'md:text-[14px] text-[12px]',
  },
  {id: 'status', name: 'Status', width: 200},
  {
    id: 'updated',
    name: 'Updated',
    width: 500,
    className: 'md:text-[14px] text-[12px]',
  },
];

const StudentHome = () => {
  const screenSize = useScreenSize();
  return (
    <section>
      <div className="flex justify-between  mx-2">
        <h1 className="md:text-3xl text-xl font-bold">
          St. Olaf Program of Study
        </h1>
        <Link to="/form/new">
          <Button size="l" view="action">
            New
          </Button>
        </Link>
      </div>
      <Table data={dataFormat(data, screenSize)} columns={col} />
    </section>
  );
};

export default StudentHome;
