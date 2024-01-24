import PostCard from "../../components/PostCard";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import './Home.css'
const Home = () => {
    const [ posts, setPosts ] = useState([])
    const getPopularPosts = async() => {
        const response = await fetch('https://www.reddit.com/r/popular.json')
        const json = await response.json()
        console.log(json.data.children)
        setPosts(json.data.children) 
    }
    useEffect(()=> {
        getPopularPosts()
    },[])
    return (
        <div className="app">
            <Header/>
            {posts.map(post => <PostCard imgUrl = {post.data.url} 
                                            title = {post.data.title} 
                                            ups={post.data.ups} 
                                            author={post.data.author} 
                                            numComments={post.data.num_comments} 
                                            created ={post.data.created}
            />)}
        </div>
    )
}

export default Home;