import {Table} from '@gravity-ui/uikit';
import {ClassData} from '@/interface';
import formatID from './FormatID';

const dataFormat = (data: ClassData[]) => {
  return data.map((item) => ({
    class: `${formatID(item.id)}: ${item.name}`,
    prerequisite: formatID(item.prerequisite),
  }));
};

const col = [
  {id: 'class', name: 'Class', width: 400},
  {
    id: 'prerequisite',
    name: 'Prerequisites',
    width: 400,
  },
];

interface ElectiveTableProps {
  selectedElectiveValues: ClassData[];
}

const ElectiveTable = ({
  selectedElectiveValues,
}: ElectiveTableProps) => {
  return (
    <Table
      data={dataFormat(selectedElectiveValues)}
      columns={col}
    />
  );
};

export default ElectiveTable;
