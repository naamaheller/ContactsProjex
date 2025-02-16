import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  arr: [],
  thisContact: null
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    selectContact: (state, action) => {
      state.thisContact = action.payload;
    },
    updateContact: (state, action) => {
      const index = state.arr.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.arr[index] = { ...state.arr[index], ...action.payload };
      }
    },
    addContact: (state, action) => {
      action.payload.id = (state.arr[state.arr.length - 1].id) + 1
      state.arr.push(action.payload)
    },
    EnterDetails: (state, action) => {
      state.arr = action.payload;
    },
    updateUserMainContact: (state, action) => {
      const { id, mainContact } = action.payload;
      const contact = state.arr.find(c => c.id === id);
      if (contact)
        contact.mainContact = mainContact;
    }
  }
});


export const { selectContact, updateContact, addContact, EnterDetails, updateUserMainContact } = contactsSlice.actions;
export default contactsSlice.reducer;

