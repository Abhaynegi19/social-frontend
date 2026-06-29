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
        }
    }
})

export default userSlice.reducer
export const{ addUserData, updateFollowing } = userSlice.actions