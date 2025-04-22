import { Link } from "react-router-dom";
import '../Styles/NotFoundStyle.css'

export default function NotFound(){
    return(
        <button className='return-button'>
            <Link to="/cars">Return to main page</Link>
        </button>
    )
}