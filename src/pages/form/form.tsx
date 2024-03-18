import {Button} from '@gravity-ui/uikit';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import ElectiveSelect from './ElectiveSelect';
import {ClassData} from '../../interface';
import ClassTable from './ClassTable';
import {
  foundationData,
  requiredData,
  electiveData,
  otherElectiveData,
} from './CSFormData';

// Cancel doesn't save the form
// Save sends a post request to the database
// Submit sends a post requst to the database for both form data and form status
// Changes status to submitted_for_review

const Form = () => {
  const navigate = useNavigate();

  const [selectedElectiveValues, setSelectedElectiveValues] =
    useState<ClassData[]>([]);

  const [
    selectedOtherElectiveValues,
    setSelectedOtherElectiveValues,
  ] = useState<ClassData[]>([]);

  return (
    <div className="lg:w-[1000px]">
      <h1 className="text-3xl font-bold">
        St. Olaf Program of Study Form
      </h1>
      <div className="">
        <h2 className="text-2xl font-bold mt-8 mb-2">
          Foundational Courses
        </h2>
        <p className="mb-2">
          Must complete by the end of sophomore year.
        </p>
        <ClassTable
          selectedValues={foundationData}
          classNames="mb-8"
        />
        <h2 className="text-2xl font-bold mt-8 mb-4">
          Required Courses
        </h2>
        <p className="mb-2">
          Generally completed by end of junior year, perhaps 1 for
          senior year.
        </p>
        <ClassTable selectedValues={requiredData} classNames="mb-8" />
        <h2 className="text-2xl font-bold mb-2">Electives</h2>
        <p className="mb-2">
          Complete 3, at least 1 must be 300-level
        </p>

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
        {ElectiveSelect({
          data: electiveData,
          setSelectedElectiveValues,
        })}

        <ClassTable
          selectedValues={selectedElectiveValues}
          classNames="mb-8"
        />

        <div className="flex justify-between mb-2 align-baseline">
          <h2 className="text-lg font-bold">Other Electives</h2>
          <div className="flex flex-col justify-end mr-8">
            <p className="h-5">Prerequisites</p>
          </div>
        </div>
        {ElectiveSelect({
          data: otherElectiveData,
          setSelectedOtherElectiveValues,
        })}

        {selectedElectiveValues}

        <div className="flex justify-between mt-4">
          <Button view="normal" size="l" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Link to="/">
            <Button view="action" size="l">
              Save
            </Button>
          </Link>
          <Link to="/">
            <Button view="action" size="l">
              Submit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
