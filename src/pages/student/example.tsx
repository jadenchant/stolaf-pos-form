import {Button, Label, Table, withTableActions} from '@gravity-ui/uikit';
import {Link} from 'react-router-dom';

const MyTable = withTableActions(Table);
const data = [
  {
    id: 1,
    text: (
      <Link to="/">
        <Label theme="info">Hi</Label>
      </Link>
    ),
  },
  {id: 2, text: 'World'},
];
const columns = [{id: 'id'}, {id: 'text'}];
const getRowActions = () => {
  return [
    {
      text: 'Print',
      handler: () => {},
    },
    {
      text: 'Remove',
      handler: () => {},
      theme: 'danger',
    },
  ];
};

const Example = () => {
  return <MyTable data={data} columns={columns} getRowActions={getRowActions} />;
};

export default Example;
