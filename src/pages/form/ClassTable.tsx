import {Select, Table} from '@gravity-ui/uikit';
import {ClassData, FormData} from '@/interface';
import formatID from './FormatID';

const dataFormat = (data: ClassData[]) => {
  return data.map((item) => ({
    class: `${formatID(item.id)}: ${item.name}`,
    prerequisite: formatID(item.prerequisite),
    term: (
      <Select width="max" size="m">
        <Select.Option value="fall" key="fall">
          Fall
        </Select.Option>
        <Select.Option value="jterm" key="jterm">
          J-Term
        </Select.Option>
        <Select.Option value="spring" key="spring">
          Spring
        </Select.Option>
        <Select.Option value="summer" key="summer">
          Summer
        </Select.Option>
      </Select>
    ),
    year: (
      <Select width="max" size="m">
        <Select.Option value="2024" key="2024">
          2024
        </Select.Option>
        <Select.Option value="2025" key="2025">
          2025
        </Select.Option>
        <Select.Option value="2026" key="2026">
          2026
        </Select.Option>
      </Select>
    ),
  }));
};

const col = [
  {id: 'class', name: 'Class', width: 200},
  {
    id: 'prerequisite',
    name: 'Prerequisites',
    width: 400,
  },
  {id: 'term', name: 'Term', width: 200},
  {id: 'year', name: 'Year', width: 200},
];

interface ClassTableProps {
  selectedValues: ClassData[];
  setFormValues: React.Dispatch<React.SetStateAction<FormData[]>>;
  classNames?: string;
}

const ClassTable = ({
  selectedValues,
  setFormValues,
  classNames,
}: ClassTableProps) => {
  return (
    <Table
      data={dataFormat(selectedValues)}
      columns={col}
      className={`border rounded-md border-zinc-300 ${classNames}`}
    />
  );
};

export default ClassTable;
