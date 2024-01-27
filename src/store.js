import { configureStore } from "@reduxjs/toolkit";
import postCardReducer from "./components/PostCard/postCardSlice";
import subRedditsReducer from "./components/SubReddits/subRedditsSlice";

export default configureStore({
    reducer: {
      posts: postCardReducer,
      subReddits: subRedditsReducer
}
})