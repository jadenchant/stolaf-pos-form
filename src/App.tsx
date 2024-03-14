import {Link} from 'react-router-dom';
import './styles/globals.scss';

const App = () => {
  return (
    <div className="flex flex-col justify-between h-40 text-2xl">
      <h1 className="text-3xl font-bold">
        St. Olaf Program of Study
      </h1>
      <Link to="/student" className="underline hover:opacity-85">
        Student Page
      </Link>
      <Link to="/faculty" className="underline hover:opacity-85">
        Faculty Page
      </Link>
      <Link to="/director" className="underline hover:opacity-85">
        Director Page
      </Link>
    </div>
  );
};

export default App;
