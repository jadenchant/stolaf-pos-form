import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Label, Table, TextInput} from '@gravity-ui/uikit';
import {Magnifier} from '@gravity-ui/icons';
import form0 from '../../data/form0.json';
import form1 from '../../data/form1.json';
import form2 from '../../data/form2.json';
import form3 from '../../data/form3.json';
import form4 from '../../data/form4.json';

const forms: any = [form0, form1, form2, form3, form4];

// Dummy data
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

const professorName = 'Sravya Kondrakunta';
const defaultFilters = {
  unfilteredSearchQ: true,
  searchTerm: '',
  professors: [professorName, 'undecided'],
  formStatus: ['submitted_for_review', 'in_progress', 'complete'],
  // timeFrame: 'Last 20 years',
};

const dataFormat = function (data: StudentForm[]) {
  return data.map((item) => ({
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
};
const col = [
  {id: 'faculty', name: 'Faculty', width: 200},
  {id: 'student', name: 'Student', width: 200},
  {id: 'major', name: 'Major', width: 400},
  {id: 'status', name: 'Status', width: 200},
  {id: 'updated', name: 'Updated', width: 300},
];

interface FilterObject {
  unfilteredSearchQ: boolean;
  searchTerm: string;
  professors: string[];
  formStatus: string[];
  timeFrame?: string;
}

const filterFunction = (filterObject: FilterObject) => {
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
    filterObject.searchTerm.length == 0
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

interface StudentForm {
  id: string;
  faculty: string;
  student: string;
  major: string;
  status: string[];
  updated: string;
}

const searchBarTable = (
  inputText: string,
  setInputText: Function,
  filteredData: StudentForm[],
) => {
  const handleTextChange = (newText: string) => {
    setInputText(newText);
    let newFilter = defaultFilters;
    newFilter.searchTerm = newText;
    filteredData = filterFunction(newFilter);
  };

  return (
    <>
      <TextInput
        placeholder="Search"
        leftContent={<Magnifier />}
        value={inputText}
        onUpdate={handleTextChange}
        className="mt-4 mb-4"
      />
      <Table data={dataFormat(filteredData)} columns={col} />
    </>
  );
};

const FacultyHome = () => {
  const [inputText, setInputText] = useState('');

  const data: StudentForm[] = forms.map((form: any) => ({
    id: form.id,
    faculty: form.facultyName,
    student: form.studentName,
    major: form.major,
    status: form.isRejected
      ? [form.formStatus, 'rejected']
      : [form.formStatus],
    updated: form.updated,
  }));

  return (
    <section>
      <div className="flex flex-col justify-between mx-2">
        <h1 className="md:text-3xl text-xl font-bold">
          St. Olaf Program of Study
        </h1>
        {searchBarTable(inputText, setInputText, data)}
      </div>
    </section>
  );
};

export default FacultyHome;
