import {Select} from '@gravity-ui/uikit';
import {
  ClassData,
  ElectiveSelectProps,
} from '@/interface';
import formatID from './FormatID';

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
      onUpdate={(values: string[]) => {
        const selectedElectives = values
          .map((value) => {
            return data.find(
              (item) =>
                formatID(item.id) === value,
            );
          })
          .filter(Boolean) as ClassData[];
        setSelectedElectiveValues(
          selectedElectives,
        );
      }}
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
