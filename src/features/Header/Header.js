import redditIcon from '../../resources/reddit-logo-2436.png'
import './Header.css';
import { UseDispatch, useDispatch } from 'react-redux';
import { getSearchPosts } from '../../components/PostCard/postCardSlice';

const Header = (props) => {
    const dispatch = useDispatch();
    return (
        <div className='header'>
            <div className='logo-container' onClick={props.handleHomeClick}>
                <img className='logo' src={redditIcon} />
                <p>Reddit Client</p>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                props.handleSearch()
            }}>
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