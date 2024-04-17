import {Select, Table} from '@gravity-ui/uikit';
import {
  ClassData,
  FormData,
  ClassTableProps,
  ScreenSize,
} from '@/interface';
import formatID from './FormatID';
import useScreenSize from '../../hooks/useScreenSize';

const dataFormat = (
  data: ClassData[],
  formValues: FormData[],
  setFormValues: React.Dispatch<React.SetStateAction<FormData[]>>,
  screenSize: ScreenSize,
): any => {
  return data.map((item) => ({
    class:
      screenSize.width > 750 ? (
        `${formatID(item.id)}: ${item.name}`
      ) : (
        <div>
          <div>{formatID(item.id)}: </div>
          <div className="w-20 text-wrap">{item.name}</div>
        </div>
      ),
    // Add tooltip to show the class name for prerequisites
    prerequisite:
      screenSize.width > 750 ? (
        formatID(item.prerequisite)
      ) : (
        <div className="w-20 text-wrap">
          {formatID(item.prerequisite)}
        </div>
      ),
    term: (
      <Select
        width="max"
        // Not working as expected
        className="!text-[30px]"
        size={screenSize.width > 750 ? 'm' : 's'}
        value={[
          formValues.find(
            (value) => formatID(item.id) === formatID(value.id),
          )?.term ?? '',
        ]}
        onUpdate={(values: string[]) => {
          let isFound = false;

          const newFormValues = formValues.map((value) => {
            if (formatID(item.id) === formatID(value.id)) {
              isFound = true;
              return {...value, term: values[0]};
            } else {
              return value;
            }
          });

          if (!isFound) {
            newFormValues.push({...item, term: values[0]});
          }

          console.log(newFormValues);

          setFormValues(newFormValues);
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
        size={screenSize.width > 750 ? 'm' : 's'}
        value={[
          formValues
            .find((value) => formatID(item.id) === formatID(value.id))
            ?.year?.toString() ?? '',
        ]}
        onUpdate={(values: string[]) => {
          const selectedYear = Number(values[0]);

          let isFound = false;

          const newFormValues = formValues.map((value) => {
            if (formatID(item.id) === formatID(value.id)) {
              isFound = true;
              return {...value, year: selectedYear};
            } else {
              return value;
            }
          });

          if (!isFound) {
            newFormValues.push({...item, year: selectedYear});
          }

          setFormValues(newFormValues);

          console.log(newFormValues);
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
  {id: 'class', name: 'Class', width: 400},
  {
    id: 'prerequisite',
    name: 'Prerequisites',
    width: 300,
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
  const screenSize = useScreenSize();

  return (
    <Table
      data={dataFormat(
        selectedValues,
        formValues,
        setFormValues,
        screenSize,
      )}
      columns={col}
      className={`border rounded-md border-zinc-300 ${classNames}`}
    />
  );
};

export default ClassTable;
