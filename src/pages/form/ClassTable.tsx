import {Select, Table} from '@gravity-ui/uikit';
import {ClassData, FormData, ClassTableProps} from '@/interface';
import formatID from './FormatID';

const dataFormat = (
  data: ClassData[],
  formValues: FormData[],
  setFormValues: React.Dispatch<React.SetStateAction<FormData[]>>,
) => {
  return data.map((item) => ({
    class: `${formatID(item.id)}: ${item.name}`,
    prerequisite: formatID(item.prerequisite),
    term: (
      <Select
        width="max"
        size="m"
        onUpdate={(values: string[]) => {
          let isFound = false;

          formValues.map((value) => {
            if (formatID(item.id) === formatID(value.id)) {
              value.term = values[0];
              isFound = true;
              return;
            }
          });

          if (!isFound) {
            formValues.push({...item, term: values[0]});
          }

          setFormValues(formValues);

          console.log(formValues);
        }}
      >
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
      <Select
        width="max"
        size="m"
        onUpdate={(values: string[]) => {
          const selectedYear = Number(values[0]);

          let isFound = false;

          formValues.map((value) => {
            if (formatID(item.id) === formatID(value.id)) {
              value.year = selectedYear;
              isFound = true;
              return;
            }
          });

          if (!isFound) {
            formValues.push({...item, year: selectedYear});
          }

          setFormValues(formValues);

          console.log(formValues);
        }}
      >
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
  {id: 'class', name: 'Class', width: 300},
  {
    id: 'prerequisite',
    name: 'Prerequisites',
    width: 400,
  },
  {id: 'term', name: 'Term', width: 200},
  {id: 'year', name: 'Year', width: 200},
];

const ClassTable = ({
  selectedValues,
  formValues,
  setFormValues,
  classNames,
}: ClassTableProps) => {
  return (
    <Table
      data={dataFormat(selectedValues, formValues, setFormValues)}
      columns={col}
      className={`border rounded-md border-zinc-300 ${classNames}`}
    />
  );
};

export default ClassTable;
