import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Label, Table, TextInput} from '@gravity-ui/uikit';
import {Magnifier} from '@gravity-ui/icons';
import {FacultyClassList, FilterObject} from '@/interface';

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
let filteredData = data;

const professorName = 'Sravya Kondrakunta';
const defaultFilters = {
  unfilteredSearchQ: true,
  searchTerm: '',
  professors: [professorName, 'undecided'],
  formStatus: ['submitted_for_review', 'in_progress', 'complete'],
  // timeFrame: 'Last 20 years',
};

const dataFormat = function (data: FacultyClassList[]) {
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
  {id: 'faculty', name: 'faculty', width: 200},
  {id: 'student', name: 'student', width: 200},
  {id: 'major', name: 'Major', width: 400},
  {id: 'status', name: 'Status', width: 200},
  {id: 'updated', name: 'Updated', width: 300},
];

const filterFunction = (filterObject: FilterObject) => {
  filteredData = data;
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

const searchBarTable = (
  inputText: string,
  setInputText: Function,
) => {
  const handleTextChange = (newText: string) => {
    setInputText(newText);
    console.log(inputText);
    /*filteredData = data.filter(
      (item) =>
        item.faculty.toLowerCase().includes(newText.toLowerCase()) ||
        item.student.toLowerCase().includes(newText.toLowerCase()) ||
        item.major.toLowerCase().includes(newText.toLowerCase()),
    );*/
    let newFilter = defaultFilters;
    newFilter.searchTerm = newText;
    filteredData = filterFunction(newFilter);
  };

  return (
    <view>
      <TextInput
        placeholder="Search"
        leftContent={<Magnifier />}
        value={inputText}
        onUpdate={handleTextChange}
        className="mt-4 mb-4"
      />
      <Table
        data={dataFormat(filteredData)}
        columns={col}
        className=""
      />
    </view>
  );
};

const FacultyHome = () => {
  const [inputText, setInputText] = useState('');
  return (
    <section>
      <div className="flex flex-col justify-between mx-2">
        <h1 className="md:text-3xl text-xl font-bold">
          St. Olaf Program of Study
        </h1>
        {searchBarTable(inputText, setInputText)}
      </div>
    </section>
  );
};

export default FacultyHome;
