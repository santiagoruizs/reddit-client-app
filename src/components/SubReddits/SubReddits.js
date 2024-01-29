import './SubReddits.css'
const SubReddits = (props) => {
    let iconUrl = props.icon.split('?',1)
    iconUrl = iconUrl[0] ? iconUrl[0] : ''
    return (
        <div className='sr' onClick={() => props.handleClick(props.name)}>
            <img alt='logo' src={iconUrl} className='icon'/>
            <p>{props.name}</p>
        </div>
    )
}

export default SubReddits;