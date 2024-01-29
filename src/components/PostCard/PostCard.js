import './PostCard.css'
import commentIcon from '../../resources/comment.png'
import arrowIcon from '../../resources/up-arrow.png'
import Comments from '../Comments/Comments'
import { useDispatch } from 'react-redux';
import { getComments } from './postCardSlice'

const PostCard = (props) => {
    const dispatch = useDispatch()
    const date = new Date(props.created*1000)
    const now = new Date()
    const dateDiff = (now-date)/(1000*60*60*24)
    const timeElapsed = dateDiff < 1 ? 'Less than one day ago' : `${Math.round(dateDiff)} days ago`

    const handleToggleComments = () => {
        dispatch(getComments(props.index, props.permalink))
    }

    const renderComments = () => {
        const c = []
        if (props.loadingComments){
            return(<p>Loading</p>)
        }else{
            for(let i = 0; i<= 3; i++ ){
                c.push(<Comments body={props.comments.body} author={props.comments.author} created= {props.comments.created}/>)
            }
        }
        return c
    }
    return (
        <div className="card">
            <h1>{props.title}</h1>
            {!(props.thumbnail === 'self' )&&(
            <img className='post-image' src={props.imgUrl} /> )}
            <div className='post-footer'>
                 <div className='upvotes'>
                    <img className='arrow down' src={arrowIcon}/>
                    <p className='upvotes'>{props.ups}</p>
                    <img className='arrow' src={arrowIcon}/>
                 </div>
                <p>{props.author}</p>
                <p>{timeElapsed}</p>
                <div className='comment-container' onClick={handleToggleComments}> 
                    <img src={commentIcon} className='comment'/>
                    <p className='num-comments  '>{props.numComments}</p> 
                </div> 
                      
            </div>
            {props.showingComments &&
            (<div className='comments-section'>
                    {renderComments()}
            </div>) }
        </div>
    )
}

export default PostCard;