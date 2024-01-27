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
    const [ displayPosts, setDisplayPosts ] = useState([])
    const dispatch = useDispatch();

    const posts = useSelector(selectPosts)
    const subReddits = useSelector(selectSubreddits)
    const handleSearch = () => {
        filter ? setDisplayPosts(posts.filter(post => post.data.title.includes(filter))) : setDisplayPosts(posts)
    }
    // const getPopularPosts = async() => {
    //     const response = await fetch('https://www.reddit.com/r/popular.json')
    //     const json = await response.json()
    //     const feed = json.data.children
    //     console.log(json.data.children)
    //     setPosts(feed) 
    //     setDisplayPosts(feed)
    // }
    const getSubredditPosts = (sr) => {
        console.log('hey')
        dispatch(getPosts(sr))
    }
    const handleHomeClick = async() => {
        dispatch(getPosts(''))
    }
    // const getPopularSubreddits = async() => {
    //     const response = await fetch('https://www.reddit.com/subreddits.json')
    //     const json = await response.json()
    //     const sr = json.data.children
    //     setSubreddits(sr) 
    // }
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
            <Header setFilter = {setFilter} filter = {filter} handleSearch={handleSearch} handleHomeClick={handleHomeClick}/>
            <div className="body-container">
                <div className="posts-container">
                    {posts.posts.map(post => <PostCard 
                                                imgUrl = {post.data.url} 
                                                title = {post.data.title} 
                                                ups={post.data.ups} 
                                                author={post.data.author} 
                                                numComments={post.data.num_comments} 
                                                created ={post.data.created}
                                                isVideo = {post.data.is_video}
                                                />)}
                </div>
                <div className="subreddit-container">
                    {subReddits.subReddits.map(sr => <SubReddits name = {sr.data.display_name_prefixed} icon = {sr.data.community_icon} handleClick = {getSubredditPosts}/>)}
                </div>
            </div>
        </div>
    )
}

export default Home;