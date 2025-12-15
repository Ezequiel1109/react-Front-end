import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  getUserProfile as userProfileService,
} from "../services/UserService";

export const addRegister = createAsyncThunk(
  "user/addRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerService(userData);
      return response;
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || error?.message || "Error desconocido";
      return rejectWithValue(errMsg);
    }
  }
);

export const addLogin = createAsyncThunk(
  "user/addLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const token = await loginService(credentials);
      return { token };
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || error?.message || "Error desconocido";
      return rejectWithValue(errMsg);
    }
  }
);

export const addLogout = createAsyncThunk(
  "user/addLogout",
  async (_, { rejectWithValue }) => {
    try {
      const response = logoutService();
      return response;
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || error?.message || "Error desconocido";
      return rejectWithValue(errMsg);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      if (!token) throw new Error("No token found");
      const user = await userProfileService(token);
      return user;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);
export const authSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: !!localStorage.getItem("token"),
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setAuth: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRegister.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al obtener el perfil de usuario";
      })
      .addCase(addLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al iniciar sesión";
      });
  },
});
export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
