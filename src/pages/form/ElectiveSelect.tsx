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
      // value={
      //   [
      // formValues.find(
      //   (value) =>
      //     (electiveData.includes(formatID(value)) ||
      //       otherElectiveData.includes(
      //         formatID(value.id as ClassData),
      //       )) &&
      //     formatID(item.id) === formatID(value.id as ClassData),
      // )?.term ?? '',
      // formValues.find(
      //   (value) =>
      //     formatID(electiveData[0].id) === formatID(value.id),
      // )?.id ?? '',
      //   ]
      // }
      onUpdate={(values: string[]) => {
        // const selectedElectives = values
        //   .map((value) => {
        //     return classes.find(
        //       (item) => formatID(item.id) === value,
        //     );
        //   })
        //   .filter(Boolean) as ClassData[];
        // setSelectedElectiveValues(selectedElectives);
        let isFound = false;

        // THIS IS NOT RIGHT

        const newFormValues = formValues.map((formValue) => {
          electiveData.forEach((elective) => {
            if (formatID(elective.id) === formatID(formValue.id)) {
              isFound = true;
              return {...formValue, term: values[0]};
            }
          });
          return formValue;
        });

        if (!isFound) {
          electiveData.forEach((elective) => {
            newFormValues.push({...elective, term: values[0]});
          });
        }

        setFormValues(newFormValues);
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
