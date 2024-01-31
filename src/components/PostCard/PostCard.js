import './PostCard.css'
import commentIcon from '../../resources/comment.png'
import redditIcon from '../../resources/reddit-logo-2436.png'
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
            return(<div className="comments-spinner-container">
            <img className='comments-spinner' src={redditIcon} alt='Loading'/>
        </div>)
        }else{
            console.log('a')
            console.log(props.comments)
            for(let i = 0; i<= 3; i++ ){
                c.push(<Comments body={props.comments[i].data.body} author={props.comments[i].data.author} created= {props.comments[i].data.created}/>)
            }
        }
        return c
    }
    return (
        <div className="card">
            <h1>{props.title}</h1>
            {!(props.thumbnail === 'self' || props.thumbnail === 'spoiler' )&&(
            <img alt="" className='post-image' src={props.imgUrl} /> )}
            <div className='post-footer'>
                 <div className='upvotes'>
                    <img alt='arrow1' className='arrow down' src={arrowIcon}/>
                    <p className='upvotes'>{props.ups}</p>
                    <img alt='arrow2' className='arrow' src={arrowIcon}/>
                 </div>
                <p>{props.author}</p>
                <p>{timeElapsed}</p>
                <div className='comment-container' onClick={handleToggleComments}> 
                    <img alt='comment' src={commentIcon} className='comment'/>
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