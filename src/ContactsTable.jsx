
// ContactsTable.js
import { useState } from "react";
import { useSelector } from "react-redux";
import ContactDetails from "./ContactDetails";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import AddContactForm from "./AddContactForm";

const ContactsTable = ({ setOpen }) => {
    const contacts = useSelector(state => state.listOfContacts.arr);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const filteredContacts = contacts.filter(contact =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: "#f8f9fc", padding: "20px", borderRadius: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0 }}>Contacts</h2>
                <Button variant="contained" style={{ backgroundColor: "#1f3b57" }} onClick={() => setIsDrawerOpen(true)}>
                    + New Contact
                </Button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#2e5277", cursor: "pointer", marginBottom: "10px" }}>
                <FilterListIcon fontSize="small" />
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>Filter</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #8ea2c0", borderRadius: "5px", padding: "5px 10px", backgroundColor: "#f8f9fc" }}>
                    <input
                        type="text"
                        placeholder="Search in contacts"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: "none",
                            outline: "none",
                            fontSize: "14px",
                            flex: 1,
                            color: "#2e5277",
                            backgroundColor: "transparent"
                        }}
                    />
                    <SearchIcon style={{ color: "#2e5277" }} />
                </div>
                <span style={{ color: "#2e5277", fontWeight: "bold" }}>
                    {filteredContacts.length} Contacts
                </span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Contact Type</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th style={{ padding: "10px 20px" }}>Contact Details</th>
                        <th style={{ padding: "10px 20px" }}>Main Contact</th>
                        <th style={{ padding: "10px 20px" }}>...</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((c) => (
                        <ContactDetails key={c.id} contact={c} setOpen={setOpen} />
                    ))}
                </tbody>
            </table>

            <AddContactForm open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </div>
    );
};

export default ContactsTable;
