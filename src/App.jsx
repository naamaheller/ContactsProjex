import React, { useEffect, useState } from 'react';
import './App.css'
import ContactsTable from './ContactsTable'
import { useDispatch } from 'react-redux'
import { EnterDetails } from "./app/contactsSlice"

function App() {
  const [open, setOpen] = useState(false);

  let dispatch = useDispatch();
  useEffect(() => {
    fetch("../public/person.json")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data);
        dispatch(EnterDetails(data.contacts));
      })
      .catch(error => console.log('Error fetching data:', error));
  }, []);


  return (
    <>
      <ContactsTable setOpen={setOpen} />
    </>
  )
}

export default App

