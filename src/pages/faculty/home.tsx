import {Label, Table, TextInput} from '@gravity-ui/uikit';
import {Magnifier} from '@gravity-ui/icons';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';

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

const dataFormat = filteredData.map((item) => ({
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

const searchBar = () => {
  const [inputText, setInputText] = useState('');
  const handleTextChange = (newText: string) => {
    setInputText(newText);
    filteredData = data.filter(
      (item) =>
        item.faculty
          .toLowerCase()
          .includes(inputText.toLowerCase()) ||
        item.student
          .toLowerCase()
          .includes(inputText.toLowerCase()) ||
        item.major.toLowerCase().includes(inputText.toLowerCase()),
    );
  };

  return (
    <view>
      <TextInput
        placeholder="Search"
        leftContent={<Magnifier></Magnifier>}
        value={inputText}
        onUpdate={handleTextChange}
      />
    </view>
  );
};

const FacultyHome = () => {
  return (
    <section>
      <h1 className="text-xl font-bold">St. Olaf POS</h1>
      {searchBar()}
      {/*<Button>New</Button>*/}
      <Table data={dataFormat} columns={col} className="" />
    </section>
  );
};

export default FacultyHome;
