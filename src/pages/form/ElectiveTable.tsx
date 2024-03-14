import {Table} from '@gravity-ui/uikit';
import { ElectiveSelectProps } from '@/interface';

const dataFormat = selectedElectiveValues.map(
  (item) => ({
    id: (
      {item.id}
    ),
    status: (
      <div className="flex justify-between"></div>
    ),
    updated: item.updated,
  }),
);

const col = [
  {id: 'id', name: 'Class ID', width: 400},
];

const ElectiveTable = ({
  selectedElectiveValues,
}) => {
  <Table data={dataFormat} columns={col} />;
};

export default ElectiveTable;
