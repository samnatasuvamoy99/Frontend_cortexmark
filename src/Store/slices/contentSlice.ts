import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../Config';

export interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: 'twitter' | 'youtube' | 'documents' | 'others';
  createdAt?: string;
  updatedAt?: string;
}

interface ContentState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk for fetching content
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/content/viewcontent`, {
        headers: {
          'Authorization': token
        }
      });

      return response.data.content || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch content');
    }
  }
);

// Async thunk for adding content
export const addContent = createAsyncThunk(
  'content/addContent',
  async (contentData: { type: string; title: string; link: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/content/addcontent`, contentData, {
        headers: {
          'Authorization': token
        }
      });

      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add content');
    }
  }
);

// Async thunk for deleting content
export const deleteContent = createAsyncThunk(
  'content/deleteContent',
  async (contentId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      await axios.delete(`${BACKEND_URL}/api/v1/content/deletecontent/${contentId}`, {
        headers: {
          'Authorization': token
        }
      });

      return contentId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete content');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch content
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add content
      .addCase(addContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(addContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete content
      .addCase(deleteContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(deleteContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = contentSlice.actions;
export default contentSlice.reducer;
