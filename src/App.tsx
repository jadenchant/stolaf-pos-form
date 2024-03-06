import {Link} from 'react-router-dom';
import './styles/globals.scss';

const App = () => {
    return (
        <div className="flex flex-col text-lg underline">
            <Link to="/student" className="hover:opacity-85">
                Student Page
            </Link>
            <Link to="/faculty" className="hover:opacity-85">
                Faculty Page
            </Link>
        </div>
    );
};

export default App;
