import {Select} from '@gravity-ui/uikit';
import {ClassData, ElectiveSelectProps} from '@/interface';
import formatID from './FormatID';
import {electiveData, otherElectiveData} from './CSFormData';

// Pass down formData and setFormData

const ElectiveSelect = ({
  classes,
  setSelectedElectiveValues,
  formValues,
  setFormValues,
  isOtherElective,
}: ElectiveSelectProps) => {
  return (
    <Select
      width="max"
      size="l"
      multiple
      filterable
      hasClear
      className="mb-4"
      value={[
        formValues.find(
          (value) =>
            (electiveData.includes(formatID(value.id)) ||
              otherElectiveData.includes(formatID(value.id))) &&
            formatID(item.id) === formatID(value.id),
        )?.term ?? '',
      ]}
      onUpdate={(values: string[]) => {
        const selectedElectives = values
          .map((value) => {
            return classes.find(
              (item) => formatID(item.id) === value,
            );
          })
          .filter(Boolean) as ClassData[];
        setSelectedElectiveValues(selectedElectives);
      }}
    >
      {classes.map((item, outerIndex) => {
        return (
          <Select.Option value={formatID(item.id)} key={outerIndex}>
            <div className="flex justify-between lg:w-[950px] md:w-[600px] w-[400px]">
              <p>{`${formatID(item.id)}: ${item.name}`}</p>
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
