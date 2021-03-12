const { Link } = require("react-router-dom")

const NotFound = () => {
    return ( 
        <div className='not-found'>
            <h2>Sorry</h2>
            <p>We are unable to find that page.</p>
            <p>Head back <Link to='/'>home!</Link></p>
        </div>
     );
}
 
export default NotFound;