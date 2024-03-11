import {Button, Select} from '@gravity-ui/uikit';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

// Cancel doesn't save the form
// Save sends a post request to the database
// Submit sends a post requst to the database for both form data and form status
// Changes status to submitted_for_review

type ClassData = {
  id: string;
  name: string;
  prerequisite: string[];
}[];

const electiveData: ClassData = [
  {
    id: 'csci273',
    name: 'Operating Systems',
    prerequisite: ['csci241', 'csci251'],
  },
  {
    id: 'csci276',
    name: 'Programming Languages',
    prerequisite: ['csci251'],
  },
  {
    id: 'csci3??',
    name: 'Artificial Intelligence',
    prerequisite: ['csci251', 'math234'],
  },
  {
    id: 'csci333',
    name: 'Theory of Computation',
    prerequisite: ['math234'],
  },
];

const otherElectiveData: ClassData = [
  {
    id: 'csci200',
    name: 'Topics in CS',
    prerequisite: ['varies'],
  },
  {
    id: 'csci300',
    name: 'Topics in CS',
    prerequisite: ['varies'],
  },
  {
    id: 'csci284',
    name: 'Mobile Computing Applications',
    prerequisite: ['csci251'],
  },
  {
    id: 'csci336',
    name: 'Logic Programming',
    prerequisite: ['csci251'],
  },
  {
    id: 'csci356',
    name: 'Parallel and Distributed Systems',
    prerequisite: ['csci241', 'csci251'],
  },
  {
    id: 'csci390',
    name: 'Senior Capstone',
    prerequisite: ['csci263', 'csci353'],
  },
  {
    id: 'csci391',
    name: 'Senior Capstone',
    prerequisite: ['csci263', 'csci353'],
  },
  {
    id: 'math282',
    name: 'Computational Geometry',
    prerequisite: [],
  },
  {
    id: 'mscs341',
    name: 'Algorithms for Decision Making',
    prerequisite: [
      'csci251',
      'math220',
      'stat272',
    ],
  },
  {
    id: 'phys246',
    name: 'Electronics',
    prerequisite: ['phys125', 'phys131'],
  },
];

const formatID = (id: string) => {
  const charMatch = id.match(/[a-zA-Z]+/);
  const prefix = charMatch
    ? charMatch[0].toUpperCase()
    : '';
  const numMatch = id.match(/[0-9]+/);
  const suffix = numMatch ? numMatch[0] : '';
  return `${prefix} ${suffix}`;
};

const electiveSelect = (data: ClassData) => {
  return (
    <Select
      width={512}
      size="l"
      multiple
      filterable
      hasClear
      className="mb-4"
    >
      {data.map((item, outerIndex) => {
        return (
          <Select.Option
            value={formatID(item.id)}
            key={outerIndex}
          >
            <div className="flex justify-between w-116">
              <p>{`${formatID(item.id)}: ${
                item.name
              }`}</p>
              <div className="flex flex-row justify-end">
                {item.prerequisite.map(
                  (
                    prereq: string,
                    innerIndex: any,
                  ) => {
                    return (
                      <p
                        key={`${outerIndex}-${innerIndex}`}
                        className="ml-2"
                      >
                        {formatID(prereq)}
                      </p>
                    );
                  },
                )}
              </div>
            </div>
          </Select.Option>
        );
      })}
    </Select>
  );
};

const Form = () => {
  const navigate = useNavigate();
  return (
    <div className="w-128">
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
        <h3 className="mb-2">
          <span className="font-bold">
            Designated:
          </span>{' '}
          Select at least 2 classes
        </h3>
        {electiveSelect(electiveData)}
        <h3 className="mb-2">
          <span className="font-bold">
            Other Electives
          </span>
        </h3>
        {electiveSelect(otherElectiveData)}
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
