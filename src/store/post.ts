import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';

export interface postsState {
  post: object;
  error: string;
}

export const initialState = {
  post: {},
  error: '',
};

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostsSuccess(state, { payload }) {
      console.log(payload);
      state.post = payload;
    },
    getPostsFailure(state, { payload }: PayloadAction<postsState>) {
      state.error = payload.error;
    },
  },
});

export const { getPostsSuccess } = postsSlice.actions;

export const PostInit = (payload): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(getPostsSuccess(payload));
};

export default postsSlice.reducer;
