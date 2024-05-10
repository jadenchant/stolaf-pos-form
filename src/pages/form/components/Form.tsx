import {FormData} from '@/interface';
import formatID from '../FormatID';
import ClassTable from './ClassTable';
import ElectiveSelect from './ElectiveSelect';
import {
  foundationData,
  requiredData,
  electiveData,
  otherElectiveData,
} from '../../../data/CSFormData';

interface FormProps {
  formStatus: string;
  formValues: FormData[];
  setFormValues: React.Dispatch<React.SetStateAction<FormData[]>>;
  className?: string;
}

const Form = ({
  formStatus,
  formValues,
  setFormValues,
  className,
}: FormProps) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-2">
        Foundational Courses
      </h2>
      <p className="mb-2">
        Must complete by the end of sophomore year.
      </p>
      <ClassTable
        formStatus={formStatus}
        selectedValues={foundationData}
        formValues={formValues}
        setFormValues={setFormValues}
        classNames="mb-8"
      />
      <h2 className="text-2xl font-bold mt-8 mb-4">
        Required Courses
      </h2>
      <p className="mb-2">
        Generally completed by end of junior year, perhaps 1 for
        senior year.
      </p>
      <ClassTable
        formStatus={formStatus}
        selectedValues={requiredData}
        formValues={formValues}
        setFormValues={setFormValues}
        classNames="mb-8"
      />
      <h2 className="text-2xl font-bold mb-2">Electives</h2>
      <p className="mb-2">Complete 3, at least 1 must be 300-level</p>

      <div className="flex justify-between mb-2 align-baseline">
        <h2 className="text-lg font-bold">
          Designated:{' '}
          <span className="text-sm font-normal">
            Select at least 2 classes
          </span>
        </h2>
        <div className="flex flex-col justify-end mr-8">
          <p className="h-5">Prerequisites</p>
        </div>
      </div>

      <ElectiveSelect
        formStatus={formStatus}
        classes={electiveData}
        formValues={formValues}
        setFormValues={setFormValues}
      />

      <ClassTable
        formStatus={formStatus}
        selectedValues={electiveData.filter((elective) =>
          formValues.some(
            (formValue) =>
              formatID(elective.id) === formatID(formValue.id),
          ),
        )}
        formValues={formValues}
        setFormValues={setFormValues}
        classNames="mb-8"
      />

      <div className="flex justify-between mb-2 align-baseline">
        <h2 className="text-lg font-bold">Other Electives</h2>
        <div className="flex flex-col justify-end mr-8">
          <p className="h-5">Prerequisites</p>
        </div>
      </div>

      <ElectiveSelect
        formStatus={formStatus}
        classes={otherElectiveData}
        formValues={formValues}
        setFormValues={setFormValues}
        isOtherElective
      />

      <ClassTable
        formStatus={formStatus}
        selectedValues={otherElectiveData.filter((elective) =>
          formValues.some(
            (formValue) =>
              formatID(elective.id) === formatID(formValue.id),
          ),
        )}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </div>
  );
};

export default Form;
