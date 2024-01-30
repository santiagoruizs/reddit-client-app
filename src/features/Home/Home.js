import PostCard from "../../components/PostCard/PostCard";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import SubReddits from "../../components/SubReddits/SubReddits";
import './Home.css'
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../components/PostCard/postCardSlice";
import { getSubreddits } from "../../components/SubReddits/subRedditsSlice";
import { selectSubreddits } from "../../components/SubReddits/subRedditsSlice";
import { selectPosts } from "../../components/PostCard/postCardSlice";

const Home = () => {
    //const [ posts, setPosts ] = useState([])
    //const [ subreddits, setSubreddits ] = useState([])
    const [ filter, setFilter ] = useState('')
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts)
    const subReddits = useSelector(selectSubreddits)
    
    const handleSearch = () => {
        //filter ? setDisplayPosts(posts.filter(post => post.data.title.includes(filter))) : setDisplayPosts(posts)
        const endpoint = filter !== '' ? 'search.json?q='+encodeURIComponent(filter) : ''
        console.log(endpoint)
        dispatch(getPosts(endpoint))
    }

    const getSubredditPosts = (sr) => {
        const url = sr + '.json'
        dispatch(getPosts(url))
    }
    const handleHomeClick = async() => {
        dispatch(getPosts(''))
    }

    useEffect(()=> {
        dispatch(getPosts(''))
        dispatch(getSubreddits())
    },[dispatch])

    if(posts.isLoading || subReddits.isLoading){
        return (
        <div>
            <Header setFilter = {setFilter} filter = {filter} handleSearch={handleSearch} handleHomeClick={handleHomeClick}/>
            <p>loading</p>
        </div>
        )
    }
    return (
        <div className="app">
            <Header setFilter = {setFilter} filter = {filter} handleHomeClick={handleHomeClick} handleSearch={handleSearch}/>
            <div className="body-container">
                <div className="posts-container">
                    {posts.posts.map((post,i) => (!post.data.is_video &&(post.data.is_reddit_media_domain 
                    || post.data.is_self)
                    ) && (<PostCard 
                                                imgUrl = {post.data.url} 
                                                title = {post.data.title} 
                                                ups={post.data.ups} 
                                                author={post.data.author} 
                                                numComments={post.data.num_comments} 
                                                created ={post.data.created}
                                                isVideo = {post.data.is_video}
                                                thumbnail = {post.data.thumbnail}
                                                permalink = {post.data.permalink}
                                                index={i}
                                                comments = {post.comments}
                                                loadingComments = {post.loadingComments}
                                                showingComments = {post.showingComments}
                                                />))}
                </div>
                <div className="subreddit-container">
                    {subReddits.subReddits.map(sr => <SubReddits name = {sr.data.display_name_prefixed} icon = {sr.data.community_icon} handleClick = {getSubredditPosts}/>)}
                </div>
            </div>
        </div>
    )
}

export default Home;