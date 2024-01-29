import './Comments.css';

const Comments = (props) => {
    return (
        <div className='comment-box'>
            <div className='comment-header'>
                <p>{props.author}</p>
                <p className='comment-text'>{props.created} time ago</p>
            </div>
            <p>{props.body}</p>
        </div>
    );
}

export default Comments;