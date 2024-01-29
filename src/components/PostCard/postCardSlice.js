import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk('posts/getPosts',
    async(url) => {
        const endpoint = url ? 'https://www.reddit.com/'+url : 'https://www.reddit.com/r/popular.json'
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
    reducers:{
        startGetComments(state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments
            if(!state.posts[action.payload].showingComments){
                return;
            }
            state.posts[action.payload].loadingComments = true
            state.posts[action.payload].errorComments = false
        },
        getCommentsSuccess(state, action) {
        state.posts[action.payload.index].loadingComments = false
        state.posts[action.payload.index].comments = action.payload.comments;
        },
        getCommentsFailed(state, action) {
        state.posts[action.payload].loadingComments = false
        state.posts[action.payload].errorComments = true
        },
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
            const postsWithComments = action.payload.map(post => ({
                ...post,
                comments: [],
                showingComments: false,
                loadingComments: false,
                errorComments: false
            }))
            state.posts = postsWithComments;
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.failedLoad = true;
        })
    }
})
export const {
    startGetComments,
    getCommentsSuccess,
    getCommentsFailed
} = postCardSlice.actions;

export const getComments = (index, permalink) => async (dispatch) => {
    const endpoint = 'https://www.reddit.com/'+permalink+'.json'
    try{
        dispatch(startGetComments(index))
        const response = await fetch(endpoint)
        const json = await response.json()
        const comments = json[1].data.children
        console.log(comments)
        dispatch(getCommentsSuccess(index, comments))
    }catch(error){
    console.error('Error:', error);
    }
}

export const selectPosts = (state) => state.posts
export default postCardSlice.reducer