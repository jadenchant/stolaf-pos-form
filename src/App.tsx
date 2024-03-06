import {Link} from 'react-router-dom';
import './styles/globals.scss';

const App = () => {
    return (
        <div className="flex flex-col justify-between h-40 text-lg underline">
            <Link to="/student" className="hover:opacity-85">
                Student Page
            </Link>
            <Link to="/faculty" className="hover:opacity-85">
                Faculty Page
            </Link>
            <Link to="/director" className="hover:opacity-85">
                Director Page
            </Link>
        </div>
    );
};

export default App;
