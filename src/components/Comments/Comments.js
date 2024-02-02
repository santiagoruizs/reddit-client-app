import './Comments.css';

const Comments = (props) => {
    const date = new Date(props.created*1000)
    const now = new Date()
    const dateDiff = (now-date)/(1000*60*60*24)
    const timeElapsed = dateDiff < 1 ? 'Less than one day ago' : `${Math.round(dateDiff)} day${Math.round(dateDiff) >=2 ? 's':''} ago`
    return (
        <div className='comment-box'>
            <div className='comment-header'>
                <p>{props.author}</p>
                <p>{timeElapsed}</p>
            </div>
            <p className='comment-text'>{props.body}</p>
        </div>
    );
}

export default Comments;