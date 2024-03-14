import {Select} from '@gravity-ui/uikit';
import {ElectiveSelectProps} from '@/interface';

const formatID = (id: string) => {
  return id
    .split(' ')
    .map((part) => {
      if (part === '||' || part === '&&') {
        return part;
      } else {
        const charMatch = part.match(/[a-zA-Z]+/);
        const prefix = charMatch
          ? charMatch[0].toUpperCase()
          : '';
        const numMatch = part.match(/[0-9]+/);
        const suffix = numMatch
          ? numMatch[0]
          : '';
        return `${prefix} ${suffix}`;
      }
    })
    .join(' ');
};

const ElectiveSelect = ({
  data,
  setSelectedElectiveValues,
}: ElectiveSelectProps) => {
  return (
    <Select
      width="max"
      size="l"
      multiple
      filterable
      hasClear
      className="mb-4"
      onUpdate={(values: string[]) =>
        setSelectedElectiveValues(values)
      }
    >
      {data.map((item, outerIndex) => {
        return (
          <Select.Option
            value={formatID(item.id)}
            key={outerIndex}
          >
            <div className="flex justify-between w-[632px]">
              <p>{`${formatID(item.id)}: ${
                item.name
              }`}</p>
              <div className="flex flex-row justify-end">
                {formatID(item.prerequisite)}
              </div>
            </div>
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default ElectiveSelect;
