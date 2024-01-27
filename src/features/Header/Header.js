import redditIcon from '../../resources/reddit-logo-2436.png'
import './Header.css';

const Header = (props) => {
    return (
        <div className='header'>
            <div className='logo-container' onClick={props.handleHomeClick}>
                <img className='logo' src={redditIcon} />
                <p>Reddit Client</p>
            </div>
            <form onSubmit={props.handleSearch}>
                <input 
                type="text"
                name="search-bar"
                placeholder='Search'
                className='search-bar'
                value={props.filter}
                onChange={(e) => props.setFilter(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Header