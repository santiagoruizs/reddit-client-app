import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk('comments/getComments',
    async(url) => {
        const endpoint = 'https://www.reddit.com/'+url
        try{
            const response = await fetch(endpoint)
            const json = await response.json()
            const comments = json[1].data.children
            return comments
        }catch(error){
        console.error('Error:', error);
        }
    }
)

export const commentsSlice = createSlice({
    name: 'comments',
    initialState:{
        comments:[],
        isLoading: false,
        failedLoad: false,
    },
    extraReducers : (builder) => {
        builder
        .addCase(getComments.pending, (state, action) => {
            state.isLoading = true;
            state.failedLoad = false;
        })
        .addCase(getComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.failedLoad = false;
            state.comments = action.payload;
        })
        .addCase(getComments.rejected, (state, action) => {
            state.isLoading = false;
            state.failedLoad = true;
        })
    }
})

export const selectComments= (state) => state.comments
export default commentsSlice.reducer