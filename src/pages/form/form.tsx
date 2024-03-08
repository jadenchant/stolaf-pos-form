import {Button} from '@gravity-ui/uikit';
import {Link} from 'react-router-dom';

// Cancel doesn't save the form
// Save sends a post request to the database
// Submit sends a post requst to the database for both form data and form status
// Changes status to submitted_for_review

const Form = () => {
  return (
    <div>
      <h1>St. Olaf POS Form</h1>
      <h2>Primary Classes</h2>
      <h2>Electives</h2>
      <div className="flex justify-between">
        <Link to="/">
          <Button>Cancel</Button>
        </Link>
        <Link to="/">
          <Button>Save</Button>
        </Link>
        <Link to="/">
          <Button>Submit</Button>
        </Link>
      </div>
    </div>
  );
};

export default Form;
