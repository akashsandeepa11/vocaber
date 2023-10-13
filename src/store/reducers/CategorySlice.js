import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
};

// Add Catergory
export const addCategory = createAsyncThunk("addCategory", async (category) => {
  const addCategoryRef = await setDoc(
    doc(db, "category", `${category.id}`),
    category
  );
  return category;
});

// Delete Category
export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (category) => {
    const deleteCategoryRef = await setDoc(
      doc(db, "category", `${category.id}`),
      {
        deleted: true,
      }
    );
    return category;
  }
);

// fetch Category
export const getCategory = createAsyncThunk("getCategory", async () => {
  const categoryCollectionRef = collection(db, "category");

  try {
    const res = await getDocs(categoryCollectionRef);
    const data = res.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (data) {
      return data.reverse();
    } else {
      return { error: "Some error" };
    }
  } catch (error) {
    return { error: "Some error" };
  }
});

const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = "completed";
      state.data = action.payload;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = "some error";
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
    });
  },
});

export const selectCategory = (store) => store.category;

export default CategorySlice.reducer;

// const initialState = [
//   { id: 3, name: "Nouns", icon: "book" },
//   { id: 4, name: "Computer Science Computer Science ", icon: "book" },
//   { id: 5, name: "Verbs", icon: "book" },
//   { id: 6, name: "Verbs", icon: "book" },
//   { id: 7, name: "Verbs", icon: "book" },
//   { id: 8, name: "Verbs", icon: "book" },
//   { id: 9, name: "Verbs", icon: "book" },
// ];
