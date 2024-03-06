import {Table, TableSettingsData, withTableSettings} from '@gravity-ui/uikit';
import {useState} from 'react';

const data = [
  {major: 'CS', status: 'in progress', updated: 'Date'},
  {major: 'Math', status: 'complete', updated: 'Date'},
];

const col = [{id: 'major'}, {id: 'status'}, {id: 'updated'}];

const StudentHome = () => {
  return (
    <section>
      <div>St. Olaf POS</div>
      <Table data={data} columns={col} className="" />
    </section>
  );
};

export default StudentHome;
