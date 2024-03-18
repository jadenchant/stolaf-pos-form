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
        <h2 className="text-2xl font-bold mt-8">Primary Classes</h2>
        <ClassTable selectedValues={foundationData} />
        <ClassTable selectedValues={requiredData} />
        <h2 className="text-2xl font-bold my-4">Electives</h2>
        <div className="flex justify-between mb-2">
          <p>
            <span className="font-bold">Designated:</span> Select at
            least 2 classes
          </p>
          <p className="mr-8">Prerequisites</p>
        </div>
        {ElectiveSelect({
          data: electiveData,
          setSelectedElectiveValues: setSelectedElectiveValues,
        })}

        <ClassTable selectedValues={selectedElectiveValues} />

        <div className="flex justify-between mb-2">
          <p className="font-bold">Other Electives</p>
          <p className="mr-8">Prerequisites</p>
        </div>

        {ElectiveSelect({
          data: otherElectiveData,
          setSelectedElectiveValues: setSelectedOtherElectiveValues,
        })}

        <ClassTable selectedValues={selectedOtherElectiveValues} />

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
