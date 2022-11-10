import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setAllUsers,
  setValidateUser,
  setShowedUsers,
  updateUser,
  setAuthToken,
  setAllProducts,
  setFilteredProducts,
  setItemToEdit,
  setAllRooms,
  setAllCourses,
  setFilteredCourses,
} from "../reducer/index";

// asynchronous actions

export const register = createAsyncThunk(
  "/auth/register",
  async (userData, thunkAPI) => {
    try {
      const metaData = await axios.post("/render/auth/register", userData);
      thunkAPI.dispatch(setValidateUser(metaData.data.user));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const createProduct = createAsyncThunk(
  "/productsprivate",
  async (obj, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };
    try {
      const metaData = await axios.post(
        "/render/productsprivate",
        obj.productData,
        config
      );
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const createCourse = createAsyncThunk(
  "/coursesprivate",
  async (obj, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };
    try {
      const metaData = await axios.post(
        "/render/coursesprivate",
        obj.courseData,
        config
      );
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const createRoom = createAsyncThunk(
  "/roomsprivate",
  async (obj, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };
    try {
      const metaData = await axios.post(
        "/render/roomsprivate",
        obj.productData,
        config
      );
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const login = createAsyncThunk(
  "/auth/render/login",
  async (post, thunkAPI) => {
    try {
      const metaData = await axios.post("/render/auth/login", post);
      thunkAPI.dispatch(setValidateUser(metaData.data.user));
      thunkAPI.dispatch(setAuthToken(metaData.data.token));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const findUserByName = createAsyncThunk(
  "/usersprivate/username",
  async (obj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };
      let metaData = await axios.get(
        `/render/usersprivate/username?username=${obj.input}`,
        config
      );
      thunkAPI.dispatch(setShowedUsers(metaData.data));
    } catch (err) {
      alert("Ups! Something went wrong... FINDUSERBYNAME");
      return err.response.data;
    }
  }
);

export const editItem = createAsyncThunk(
  "/productsprivate/:id",
  async (obj, thunkAPI) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };
    console.log(obj);
    try {
      const metaData = await axios.put(
        `/render/productsprivate/${obj.id}/edit`,
        { nombre: obj.nombre, price: obj.price },
        config
      );
      console.log(metaData.data);
      thunkAPI.dispatch(getAllProducts());
      return metaData.data;
    } catch (err) {
      alert("Ups! Something went wrong...");
      new Error(err);
    }
  }
);

export const editUsername = createAsyncThunk(
  "/:id/profile",
  async (obj, thunkAPI) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };

    try {
      const metaData = await axios.put(
        `/render/usersprivate/${obj.id}/profile`,
        { username: obj.username },
        config
      );
      thunkAPI.dispatch(updateUser(metaData.data));
      return metaData.data;
    } catch (err) {
      alert("Ups! Something went wrong...EDITUSERNAME");
      new Error(err);
    }
  }
);

export const editPassword = createAsyncThunk(
  "/auth/forgotPassword",
  async (email) => {
    try {
      const metaData = await axios.put(`/render/auth/forgotPassword`, {
        email: email,
      });
      return metaData.data;
    } catch (err) {
      alert("Ups! Something went wrong...EDITPASSWORD");
      console.log("err", err);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "/render/usersprivate",
  async (obj, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };
      const metaData = await axios(
        `/render/usersprivate/?limit=8&page=${obj.page}`,
        config
      );
      thunkAPI.dispatch(setAllUsers(metaData.data.users.docs));
      thunkAPI.dispatch(setShowedUsers(metaData.data.users.docs));
      thunkAPI.dispatch(setPaginateUsers(metaData.data.users));
    } catch (err) {
      console.log(err);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "/render/product",
  async (obj, thunkAPI) => {
    try {
      const metaData = await axios.get(`/render/product`);
      thunkAPI.dispatch(setAllProducts(metaData.data));
      0;
      thunkAPI.dispatch(setFilteredProducts(metaData.data));
    } catch (err) {
      console.log(err);
    }
  }
);

export const getAllCourses = createAsyncThunk(
  "/render/courses",
  async (obj, thunkAPI) => {
    try {
      const metaData = await axios.get(`/render/courses`);
      thunkAPI.dispatch(setAllCourses(metaData.data));
    } catch (err) {
      console.log(err);
    }
  }
);

export const getAllRooms = createAsyncThunk(
  "/render/rooms",
  async (obj, thunkAPI) => {
    try {
      const metaData = await axios.get(`/render/rooms`);
      thunkAPI.dispatch(setAllRooms(metaData.data));
    } catch (err) {
      console.log(err);
    }
  }
);

export const getProductsByGender = createAsyncThunk(
  "/render/product/:gender",
  async (obj, thunkAPI) => {
    try {
      const metaData = await axios.get(
        `/render/product/${obj.gender}/${obj.age}`
      );
      thunkAPI.dispatch(setFilteredProducts(metaData.data.product));
      return metaData.data.product;
    } catch (err) {
      thunkAPI.dispatch(setFilteredProducts([]));
      return err.response.data;
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "/:gender/:category/:age",
  async (obj, thunkAPI) => {
    try {
      const metaData = await axios.get(
        `/render/product/${obj.gender}/${obj.category}/${obj.age}`
      );
      thunkAPI.dispatch(setFilteredProducts(metaData.data.product));
      return metaData.data.product;
    } catch (err) {
      thunkAPI.dispatch(setFilteredProducts([]));
      return err.response.data;
    }
  }
);

export const getProductsById = createAsyncThunk(
  "/productsprivate/:id",
  async (obj, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };
    try {
      const metaData = await axios.get(
        `/render/productsprivate/${obj.id}`,
        config
      );
      thunkAPI.dispatch(setItemToEdit(metaData.data));
      return metaData.data.product;
    } catch (err) {
      thunkAPI.dispatch(setItemToEdit([]));
      return err.response.data;
    }
  }
);

export const getCourseById = createAsyncThunk(
  "/courses/detail/:id",
  async (id, thunkAPI) => {
    try {
      const metaData = await axios.get(`/render/courses/detail/${id}`);
      thunkAPI.dispatch(setFilteredCourses(metaData.data.course));
      return metaData.data;
    } catch (err) {
      thunkAPI.dispatch(setFilteredCourses([]));
      return err.response.data;
    }
  }
);

export const auhtGoogle = createAsyncThunk(
  "/auth/googlelogin",
  async (tokenId, thunkAPI) => {
    try {
      const metaData = await axios.post("/render/auth/googlelogin", {
        tokenId,
      });
      thunkAPI.dispatch(setValidateUser(metaData.data.user));
      thunkAPI.dispatch(setAuthToken(metaData.data.token));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "/usersprivate/deleteuser",
  async (obj) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
        data: {
          id: obj.userId,
        },
      };

      const metaData = await axios.delete(
        `/render/usersprivate/deleteUser`,
        config
      );
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/productsprivate/deleteProduct",
  async (obj, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
        data: {
          id: obj.id,
        },
      };

      const metaData = await axios.delete(
        `/render/productsprivate/deleteProduct`,
        config
      );
      thunkAPI.dispatch(getAllProducts());
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "/roomsprivate/deleteRoom",
  async (obj, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
        data: {
          id: obj.id,
        },
      };

      const metaData = await axios.delete(
        `/render/roomsprivate/deleteRoom`,
        config
      );
      thunkAPI.dispatch(getAllRooms());
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const isAdminConverter = createAsyncThunk(
  "/usersprivate/isAdmin",
  async (obj) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };

      const metaData = await axios.put(
        `/render/usersprivate/isAdmin`,
        { id: obj.userId, change: obj.boolean },
        config
      );
      console.log(metaData);
      return metaData.data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const isPremiumConverter = createAsyncThunk(
  "/usersprivate/isPremium",
  async (obj, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };
      const metaData = await axios.put(
        `/render/usersprivate/isPremium`,
        { hola: "" },
        config
      );
      return metaData.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  }
);

export const Banear = createAsyncThunk("/usersprivate/ban", async (obj) => {
  try {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };

    const metaData = await axios.post(
      `/render/usersprivate/ban`,
      { id: obj.userId, fecha: obj.date },
      config
    );

    return { successful: true, data: metaData };
  } catch (err) {
    return { successful: false, error: err };
  }
});

export const editImage = createAsyncThunk(
  "/editImage/profile",
  async (obj, thunkAPI) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };

    try {
      const metaData = await axios.put(
        "/render/usersprivate/editImage/profile",
        { url: obj.url },
        config
      );
      thunkAPI.dispatch(updateUser(metaData.data.updateUser));
      return metaData.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  }
);

export const getProductsByName = createAsyncThunk(
  "/product/:name",
  async (name, thunkAPI) => {
    try {
      const metaData = await axios.get(`/render/product/${name}`);
      thunkAPI.dispatch(setFilteredProducts(metaData.data.product));
      return metaData.data;
    } catch (err) {
      thunkAPI.dispatch(setFilteredProducts([]));
      return err.response.data;
    }
  }
);
