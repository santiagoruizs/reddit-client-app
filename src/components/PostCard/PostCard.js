import './PostCard.css'
import commentIcon from '../../resources/comment.png'
import arrowIcon from '../../resources/up-arrow.png'

const PostCard = (props) => {
    const date = new Date(props.created*1000)
    const now = new Date()
    const dateDiff = (now-date)/(1000*60*60*24)
    const timeElapsed = dateDiff < 1 ? 'Less than one day ago' : `${Math.round(dateDiff)} days ago`
    
    return (
        <div className="card">
            <h1>{props.title}</h1>
            <div className='img-uv-container'>
                <div className='upvotes'>
                    <img className='arrow' src={arrowIcon}/>
                    <p className='upvotes'>{props.ups}</p>
                    <img className='arrow-down' src={arrowIcon}/>
                </div>
                <img src={props.imgUrl} />              
            </div>
            <div className='post-footer'>
                <p>{props.author}</p>
                <p>{timeElapsed}</p>
                <div className='comment-container'> 
                    <img src={commentIcon} className='comment'/>
                    <p>{props.numComments}</p> 
                </div>
            </div>
        </div>
    )
}

export default PostCard;