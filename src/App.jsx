import React, { useEffect, useState } from 'react';
import './App.css';
import ContactsTable from './ContactsTable';
import { useDispatch } from 'react-redux';
import { EnterDetails } from "./app/contactsSlice";

/**
 * The main application component.
 * It loads contact data from an external JSON file and displays the contact list.
 */
function App() {
  const [open, setOpen] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    // Fetches contact data from an external JSON file
    fetch("../public/person.json")
      .then(response => response.json()) // Converts the response to a JSON object
      .then(data => {
        console.log("Fetched data:", data);
        dispatch(EnterDetails(data.contacts)); // Stores the fetched data in Redux
      })
      .catch(error => console.log('Error fetching data:', error)); // Handles loading errors
  }, []); // Runs only once when the component is mounted

  return (
    <>
      {/* ContactsTable component for displaying the contact list */}
      <ContactsTable setOpen={setOpen} />
    </>
  );
}

export default App;
