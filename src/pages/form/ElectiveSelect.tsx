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
      value={formValues
        .filter((value) =>
          electiveData.find((elective) => elective.id === value.id),
        )
        .map((value) => value.id)}
      onUpdate={(values: string[]) => {
        // THIS IS NOT RIGHT
        // Need to remove any values not in values

        let isFound = new Array(values.length).fill(false);

        const newFormValues = formValues
          .filter(
            (formValue) =>
              !electiveData.some(
                (elective) =>
                  formatID(elective.id) === formatID(formValue.id),
              ),
          )
          .map((formValue) => {
            let updatedFormValue = formValue;

            electiveData.forEach((elective, index) => {
              if (
                formatID(elective.id) === formatID(formValue.id) &&
                values.includes(elective.id)
              ) {
                console.log(isFound);
                isFound[index] = true;
              }
            });

            return updatedFormValue;
          });

        for (let i = 0; i < isFound.length; i++) {
          if (!isFound[i]) {
            const elective = electiveData.find(
              (elective) => elective.id === values[i],
            );
            if (elective) {
              newFormValues.push(elective);
            }
          }
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
