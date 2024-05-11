import {useState, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {Label, Table, TextInput} from '@gravity-ui/uikit';
import {Magnifier} from '@gravity-ui/icons';
import {ScreenSize} from '@/interface';
import useScreenSize from '../../hooks/useScreenSize';
import form0 from '../../data/form0.json';
import form1 from '../../data/form1.json';
import form2 from '../../data/form2.json';
import form3 from '../../data/form3.json';
import form4 from '../../data/form4.json';
import form5 from '../../data/form5.json';
import form6 from '../../data/form6.json';
import form7 from '../../data/form7.json';
import form8 from '../../data/form8.json';

const forms = [
  form0,
  form1,
  form2,
  form3,
  form4,
  form5,
  form6,
  form7,
  form8,
];

interface StudentForm {
  id: string;
  faculty: string;
  student: string;
  major: string;
  status: string[];
  updated: string;
}

interface FilterObject {
  unfilteredSearchQ: boolean;
  searchTerm: string;
  professors: string[];
  formStatus: string[];
  timeFrame?: string;
}

const professorName = 'Sravya Kondrakunta';
const defaultFilters = {
  unfilteredSearchQ: true,
  searchTerm: '',
  professors: [professorName, 'undecided'],
  formStatus: ['submitted_for_review', 'in_progress', 'complete'],
};

const dataFormat = (data: StudentForm[], screenSize: ScreenSize) =>
  data.map((item) => ({
    faculty: (
      <Link to={'/faculty/form/' + String(item.id)}>
        {item.faculty}
      </Link>
    ),
    student: (
      <Link
        className="underline"
        to={'/faculty/form/' + String(item.id)}
      >
        {item.student}
      </Link>
    ),
    major: (
      <Link to={'/faculty/form/' + String(item.id)}>
        {item.major}
      </Link>
    ),
    status: (
      <div className="flex justify-between">
        {item.status.map((status: any) => (
          <Link to={'/faculty/form/' + String(item.id)}>
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
        : item.updated.match(/(\d{2}-\d{2}-\d{4})/)?.[0],
  }));

const col = [
  {id: 'faculty', name: 'Faculty', width: 200},
  {id: 'student', name: 'Student', width: 200},
  {id: 'major', name: 'Major', width: 400},
  {id: 'status', name: 'Status', width: 200},
  {id: 'updated', name: 'Updated', width: 300},
];

const filterFunction = (
  data: StudentForm[],
  filterObject: FilterObject,
) => {
  let filteredData = data;
  if (filterObject.searchTerm.length > 0) {
    filteredData = data.filter(
      (item) =>
        item.faculty
          .toLowerCase()
          .includes(filterObject.searchTerm.toLowerCase()) ||
        item.student
          .toLowerCase()
          .includes(filterObject.searchTerm.toLowerCase()) ||
        item.major
          .toLowerCase()
          .includes(filterObject.searchTerm.toLowerCase()),
    );
  }
  if (
    !filterObject.unfilteredSearchQ ||
    filterObject.searchTerm.length === 0
  ) {
    filteredData = filteredData.filter(
      (item) =>
        filterObject.professors.includes(item.faculty) &&
        (filterObject.formStatus.includes(item.status[0]) ||
          filterObject.formStatus.includes(item.status[1])),
    );
  }
  return filteredData;
};

const FacultyHome = () => {
  const screenSize = useScreenSize();
  const [inputText, setInputText] = useState('');
  const [studentFormData] = useState<StudentForm[]>(() =>
    forms.map((form: any) => ({
      id: form.id,
      faculty: form.facultyName,
      student: form.studentName,
      major: form.major,
      status: form.isRejected
        ? [form.formStatus, 'rejected']
        : [form.formStatus],
      updated: form.updated,
    })),
  );

  const filteredData = useMemo(() => {
    return filterFunction(studentFormData, {
      ...defaultFilters,
      searchTerm: inputText,
    });
  }, [inputText, studentFormData]);

  const handleTextChange = (newText: string) => setInputText(newText);

  return (
    <section>
      <div className="flex flex-col justify-between mx-2">
        <h1 className="md:text-3xl text-xl font-bold">
          St. Olaf Program of Study
        </h1>
        <TextInput
          placeholder="Search"
          leftContent={<Magnifier />}
          value={inputText}
          onUpdate={handleTextChange}
          className="mt-4 mb-4"
        />
        <Table
          data={dataFormat(filteredData, screenSize)}
          columns={col}
        />
      </div>
    </section>
  );
};

export default FacultyHome;
