import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "User",
    initialState : {},
    reducers : {
        addUserData : (state, action) => {
            return action.payload
        },
        updateFollowing: (state, action) => {
            const { targetId, isFollowing } = action.payload
             if (!state) return state

              if (isFollowing) {
                 state.following = state.following.filter((f) => f !== targetId)
             } else {
                state.following = [...state.following, targetId]
             }
        },
        updatePost : (state, action) => {
            const { postId, updatedFields } = action.payload
            if (!state) return state

            state.posts = state.posts.map((p) =>
                p._id === postId ? { ...p, ...updatedFields } : p
            )
        }
    }
})

export default userSlice.reducer
export const{ addUserData, updateFollowing, updatePost } = userSlice.actions