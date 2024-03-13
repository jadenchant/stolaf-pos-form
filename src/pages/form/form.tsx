import {Button} from '@gravity-ui/uikit';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import {useState} from 'react';
import ElectiveSelect from './ElectiveSelect';
import {ClassData} from '../../interface';

// Cancel doesn't save the form
// Save sends a post request to the database
// Submit sends a post requst to the database for both form data and form status
// Changes status to submitted_for_review

const electiveData: ClassData[] = [
  {
    id: 'csci273',
    name: 'Operating Systems',
    prerequisite: 'csci241 && csci251',
  },
  {
    id: 'csci276',
    name: 'Programming Languages',
    prerequisite: 'csci251',
  },
  {
    id: 'csci3??',
    name: 'Artificial Intelligence',
    prerequisite: 'csci251 && math234',
  },
  {
    id: 'csci333',
    name: 'Theory of Computation',
    prerequisite: 'math234',
  },
];

const otherElectiveData: ClassData = [
  {
    id: 'csci200',
    name: 'Topics in CS',
    prerequisite: 'varies',
  },
  {
    id: 'csci300',
    name: 'Topics in CS',
    prerequisite: 'varies',
  },
  {
    id: 'csci284',
    name: 'Mobile Computing Applications',
    prerequisite: 'csci251',
  },
  {
    id: 'csci336',
    name: 'Logic Programming',
    prerequisite: 'csci251',
  },
  {
    id: 'csci356',
    name: 'Parallel and Distributed Systems',
    prerequisite: 'csci241 && csci251',
  },
  {
    id: 'csci390',
    name: 'Senior Capstone',
    prerequisite: 'csci263 && csci353',
  },
  {
    id: 'csci391',
    name: 'Senior Capstone',
    prerequisite: 'csci263 && csci353',
  },
  {
    id: 'math282',
    name: 'Computational Geometry',
    prerequisite: 'none',
  },
  {
    id: 'mscs341',
    name: 'Algorithms for Decision Making',
    prerequisite: 'csci251 || math220 || stat272',
  },
  {
    id: 'phys246',
    name: 'Electronics',
    prerequisite: 'phys125 || phys131',
  },
];

const Form = () => {
  const navigate = useNavigate();

  const [
    selectedElectiveValues,
    setSelectedElectiveValues,
  ] = useState<string[]>([]);

  const [
    selectedOtherElectiveValues,
    setSelectedOtherElectiveValues,
  ] = useState<string[]>([]);

  return (
    <div className="w-[700px]">
      <h1 className="text-3xl font-bold">
        St. Olaf POS Form
      </h1>
      <div className="">
        <h2 className="text-2xl font-bold mt-8">
          Primary Classes
        </h2>
        <h2 className="text-2xl font-bold my-4">
          Electives
        </h2>
        <div className="flex justify-between mb-2">
          <p>
            <span className="font-bold">
              Designated:
            </span>{' '}
            Select at least 2 classes
          </p>
          <p className="mr-8">Prerequisites</p>
        </div>
        {ElectiveSelect({
          data: electiveData,
          setSelectedElectiveValues:
            setSelectedElectiveValues,
        })}

        {selectedElectiveValues}

        <div className="flex justify-between mb-2">
          <p className="font-bold">
            Other Electives
          </p>
          <p className="mr-8">Prerequisites</p>
        </div>

        {ElectiveSelect({
          data: otherElectiveData,
          setSelectedElectiveValues:
            setSelectedOtherElectiveValues,
        })}

        {selectedOtherElectiveValues}

        <div className="flex justify-between mt-4">
          <Button
            view="normal"
            size="l"
            onClick={() => navigate(-1)}
          >
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
