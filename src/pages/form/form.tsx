import {Button, List} from '@gravity-ui/uikit';
import {Link, useNavigate} from 'react-router-dom';

// Cancel doesn't save the form
// Save sends a post request to the database
// Submit sends a post requst to the database for both form data and form status
// Changes status to submitted_for_review

const Form = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <h1 className="text-3xl font-bold">St. Olaf POS Form</h1>
      <h2 className="text-xl font-bold">Primary Classes</h2>
      <h2 className="text-xl font-bold">Electives</h2>
      <List items={['one', 'two', 'three', 'four', 'five', 'six', 'seven']} itemsHeight={160} />
      <div className="flex justify-between">
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
  );
};

export default Form;
