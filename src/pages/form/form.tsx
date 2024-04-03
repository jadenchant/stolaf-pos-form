import {Button} from '@gravity-ui/uikit';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import ElectiveSelect from './ElectiveSelect';
import {ClassData, FormData} from '../../interface';
import ClassTable from './ClassTable';
import {
  foundationData,
  requiredData,
  electiveData,
  otherElectiveData,
} from './CSFormData';
import form0 from '../../data/form0.json';
import form1 from '../../data/form1.json';
import form2 from '../../data/form2.json';
import form3 from '../../data/form3.json';

const forms: any = [form0, form1, form2, form3];

// Cancel doesn't save the form
// Save sends a post request to the database
// Submit sends a post requst to the database for both form data and form status
// Changes status to submitted_for_review

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const lastCharacter = location.pathname.slice(-1);

  let formDataJson = [];

  if (!isNaN(Number(lastCharacter))) {
    formDataJson = forms[lastCharacter];
  }

  const [selectedElectiveValues, setSelectedElectiveValues] =
    useState<ClassData[]>([]);

  const [
    selectedOtherElectiveValues,
    setSelectedOtherElectiveValues,
  ] = useState<ClassData[]>([]);

  const [formValues, setFormValues] = useState<FormData[]>(
    formDataJson as FormData[],
  );

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
          selectedValues={requiredData}
          formValues={formValues}
          setFormValues={setFormValues}
          classNames="mb-8"
        />
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

        <ElectiveSelect
          classes={electiveData}
          setSelectedElectiveValues={setSelectedElectiveValues}
          formValues={formValues}
          setFormValues={setFormValues}
        />

        <ClassTable
          selectedValues={selectedElectiveValues}
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
          classes={otherElectiveData}
          setSelectedElectiveValues={setSelectedOtherElectiveValues}
          formValues={formValues}
          setFormValues={setFormValues}
        />

        <ClassTable
          selectedValues={selectedOtherElectiveValues}
          formValues={formValues}
          setFormValues={setFormValues}
        />

        <div className="flex justify-between mt-20">
          <Button view="normal" size="l" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Link to="/student">
            <Button view="action" size="l">
              Save
            </Button>
          </Link>
          <Link to="/student">
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
