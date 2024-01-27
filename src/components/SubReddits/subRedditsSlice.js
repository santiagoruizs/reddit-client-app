import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSubreddits = createAsyncThunk('subReddits/getSubreddits',
    async() => {
        const endpoint = 'https://www.reddit.com/subreddits.json'
        try{
            const response = await fetch(endpoint)
            const json = await response.json()
            const sr = json.data.children
            return sr
        }catch(error){
        console.error('Error:', error);
        }
    }
)

export const subRedditsSlice = createSlice({
    name: 'subReddits',
    initialState:{
        subReddits:[],
        isLoading: false,
        failedLoad: false,
    },
    extraReducers : (builder) => {
        builder
        .addCase(getSubreddits.pending, (state, action) => {
            state.isLoading = true;
            state.failedLoad = false;
        })
        .addCase(getSubreddits.fulfilled, (state, action) => {
            state.isLoading = false;
            state.failedLoad = false;
            state.subReddits = action.payload;
        })
        .addCase(getSubreddits.rejected, (state, action) => {
            state.isLoading = false;
            state.failedLoad = true;
        })
    }
})

export const selectSubreddits = (state) => state.subReddits
export default subRedditsSlice.reducer