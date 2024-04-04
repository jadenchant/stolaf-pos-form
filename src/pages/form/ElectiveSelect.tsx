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

        // THIS IS NOT RIGHT

        // const newFormValues = formValues.map((formValue) => {
        //   electiveData.forEach((elective) => {
        //     if (formatID(elective.id) === formatID(formValue.id)) {
        //       isFound = true;
        //       console.log('is found');
        //       return {...formValue};
        //     }
        //   });
        //   return formValue;
        // });

        let isFound = new Array(values.length).fill(false);

        const newFormValues = formValues.map((formValue) => {
          let updatedFormValue = formValue;

          electiveData.forEach((elective, index) => {
            if (
              formatID(elective.id) === formatID(formValue.id) &&
              values.includes(elective.id)
            ) {
              isFound[index] = true;
            }
          });

          return updatedFormValue;
        });

        if (!isFound.includes(true)) {
          values.forEach((value) => {
            const elective = electiveData.find(
              (elective) => elective.id === value,
            );
            if (elective) {
              newFormValues.push({
                ...elective,
                id: value,
              });
            }
          });
        }

        console.log(newFormValues);

        setFormValues(newFormValues);
      }}
    >
      {classes.map((item, outerIndex) => {
        return (
          <Select.Option value={item.id} key={outerIndex}>
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
