import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <p>Reddit Client</p>
            <input 
            type="text"
            name="search-bar"
            />
        </div>
    )
}

export default Header