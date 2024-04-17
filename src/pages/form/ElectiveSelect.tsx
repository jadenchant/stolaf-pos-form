import {Select} from '@gravity-ui/uikit';
import {ClassData, ElectiveSelectProps} from '@/interface';
import formatID from './FormatID';
import {electiveData, otherElectiveData} from './CSFormData';

const ElectiveSelect = ({
  formStatus,
  classes,
  formValues,
  setFormValues,
  isOtherElective,
}: ElectiveSelectProps) => {
  return (
    <Select
      width="max"
      size="l"
      disabled={
        formStatus === 'complete' ||
        formStatus === 'submitted_for_review'
      }
      multiple
      filterable
      hasClear
      className="mb-4"
      value={
        isOtherElective
          ? formValues
              .filter((value) =>
                otherElectiveData.find(
                  (elective) => elective.id === value.id,
                ),
              )
              .map((value) => value.id)
          : formValues
              .filter((value) =>
                electiveData.find(
                  (elective) => elective.id === value.id,
                ),
              )
              .map((value) => value.id)
      }
      onUpdate={(values: string[]) => {
        let electData: ClassData[];

        if (isOtherElective) {
          electData = otherElectiveData;
        } else {
          electData = electiveData;
        }

        let isFound = new Array(values.length).fill(false);

        const newFormValues = formValues
          .filter(
            (formValue) =>
              !electData.some(
                (elective) =>
                  formatID(elective.id) === formatID(formValue.id),
              ),
          )
          .map((formValue) => {
            let updatedFormValue = formValue;

            electData.forEach((elective, index) => {
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
            const elective = electData.find(
              (elective) => elective.id === values[i],
            );
            if (elective) {
              newFormValues.push(elective);
            }
          }
        }

        setFormValues(newFormValues);
      }}
    >
      {classes.map((item, outerIndex) => {
        return (
          <Select.Option value={item.id} key={outerIndex}>
            <div className="flex justify-between lg:w-[950px] md:w-[725px] w-[315px]">
              <p className="md:text-[12px] text-[10px]">{`${formatID(
                item.id,
              )}: ${item.name}`}</p>
              <div className="flex flex-row justify-end  md:text-[12px] text-[10px]">
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
