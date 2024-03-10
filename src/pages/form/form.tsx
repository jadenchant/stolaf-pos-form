import {Button, Select} from '@gravity-ui/uikit';
import {Link, useNavigate} from 'react-router-dom';

// Cancel doesn't save the form
// Save sends a post request to the database
// Submit sends a post requst to the database for both form data and form status
// Changes status to submitted_for_review

const electiveData = [
  {id: 'csci273', name: 'Operating Systems', prerequisite: ['csci241', 'csci251']},
  {id: 'csci276', name: 'Programming Languages', prerequisite: ['csci251']},
  {id: 'csci3??', name: 'Artificial Intelligence', prerequisite: ['csci251', 'math234']},
  {id: 'csci333', name: 'Theory of Computation', prerequisite: ['math234']},
];

const electiveSelect = (
  <Select width="max" size="l" multiple filterable hasClear>
    {electiveData.map((item) => (
      <Select.Option value={item.id}>{item.name}</Select.Option>
    ))}
  </Select>
);

const Form = () => {
  const navigate = useNavigate();
  return (
    <div className="w-96">
      <h1 className="text-3xl font-bold">St. Olaf POS Form</h1>
      <div className="">
        <h2 className="text-2xl font-bold mt-8">Primary Classes</h2>
        <h2 className="text-2xl font-bold mt-4">Electives</h2>
        {electiveSelect}
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
