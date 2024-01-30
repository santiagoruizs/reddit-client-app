import './Comments.css';

const Comments = (props) => {
    return (
        <div className='comment-box'>
            <div className='comment-header'>
                <p>{props.author}</p>
                <p>{props.created} time ago</p>
            </div>
            <p className='comment-text'>{props.body}</p>
        </div>
    );
}

export default Comments;