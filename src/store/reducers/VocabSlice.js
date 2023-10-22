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
// add vocab
export const addVocabulary = createAsyncThunk(
  "addVocabulary",
  async (vocab) => {
    try {
      const addVocabRef = await setDoc(doc(db, "vocab", `${vocab.id}`), vocab);
    } catch (e) {
      return { error: "Some error" };
    }
    // const newVocab = { id: addVocabRef.id, vocab };
    return vocab;
  }
);

// Delete Category
export const deleteVocabulary = createAsyncThunk(
  "deleteVocabulary",
  async (id) => {
    const vocab = await getDocs(collection(db, "vocab"));
    for (var snap of vocab.docs) {
      if (snap.id === id) {
        await deleteDoc(doc(db, "vocab", `${id}`));
      }
    }

    return id;
  }
);

// fetch data
export const getVocab = createAsyncThunk("getVocab", async () => {
  const vocabCollectionRef = collection(db, "vocab");

  try {
    const res = await getDocs(vocabCollectionRef);
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

const VocabSlice = createSlice({
  name: "Vocab",
  initialState,
  reducers: {
    // addVocab: (state, action) => {
    //   state.unshift(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getVocab.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getVocab.fulfilled, (state, action) => {
      state.loading = "completed";
      state.data = action.payload;
    });
    builder.addCase(getVocab.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = "some error";
    });
    builder.addCase(addVocabulary.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
    });
    builder.addCase(addVocabulary.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(deleteVocabulary.fulfilled, (state, action) => {
      state.data = state.data.filter((vocab) => vocab.id !== action.payload);
    });
  },
});

// export const { addVocab } = VocabSlice.actions;

export const selectVocab = (store) => store.vocab;

export default VocabSlice.reducer;
