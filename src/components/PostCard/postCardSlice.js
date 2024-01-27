import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk('posts/getPosts',
    async(url) => {
        const endpoint = url ? 'https://www.reddit.com/'+url+'.json' : 'https://www.reddit.com/r/popular.json'
        try{
            const response = await fetch(endpoint)
            const json = await response.json()
            const feed = json.data.children
            console.log(json.data.children)
            return feed
        }catch(error){
        console.error('Error:', error);
        }
    }
)

export const postCardSlice = createSlice({
    name: 'posts',
    initialState:{
        posts:[],
        isLoading: false,
        failedLoad: false,
    },
    extraReducers : (builder) => {
        builder
        .addCase(getPosts.pending, (state, action) => {
            state.isLoading = true;
            state.failedLoad = false;
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.failedLoad = false;
            state.posts = action.payload;
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.failedLoad = true;
        })
    }
})

export const selectPosts = (state) => state.posts
export default postCardSlice.reducer