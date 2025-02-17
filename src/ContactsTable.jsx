import { useState } from "react";
import { useSelector } from "react-redux";
import ContactDetails from "./ContactDetails";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import AddContactForm from "./AddContactForm";
import FilterPopover from "./FilterPopover";
import "./ContactsTable.css";

const ContactsTable = ({ setOpen }) => {
    const contacts = useSelector(state => state.listOfContacts.arr);

    const [searchTerm, setSearchTerm] = useState("");

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const [filteredContacts, setFilteredContacts] = useState(contacts);

    // Function triggered when the user searches for a contact
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase(); // Convert to lowercase
        setSearchTerm(term);
        setFilteredContacts(
            contacts.filter(contact =>
                `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(term)
            )
        );
    };

    // Open the filter menu
    const handleFilterClick = (event) => setAnchorEl(event.currentTarget);

    // Close the filter menu
    const handleFilterClose = () => setAnchorEl(null);

    return (
        <div className="contacts-container">
            {/* Page header with a button to add a new contact */}
            <div className="contacts-header">
                <h2>Contacts</h2>
                <Button variant="contained" className="add-contact-button" onClick={() => setIsDrawerOpen(true)}>
                    + New Contact
                </Button>
            </div>

            {/* Actions area - Filter menu button */}
            <div className="contacts-actions">
                <div className="filter-button" onClick={handleFilterClick}>
                    <FilterListIcon fontSize="small" />
                    <span>Filter</span>
                </div>
            </div>

            {/* Search area */}
            <div className="search-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search in contacts"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <SearchIcon />
                </div>
                <span className="contacts-count">{filteredContacts.length} Contacts</span>
            </div>

            {/* Table with contacts */}
            <div className="contacts-table-wrapper">
                <table className="contacts-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Contact Type</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Contact Details</th>
                            <th>Main Contact</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Displaying filtered contacts */}
                        {filteredContacts.map((c) => (
                            <ContactDetails key={c.id} contact={c} setOpen={setOpen} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Contact component (Drawer) */}
            <AddContactForm open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Contact filtering component */}
            <FilterPopover
                anchorEl={anchorEl}
                onClose={handleFilterClose}
                setFilteredContacts={setFilteredContacts}
                contacts={contacts}
            />
        </div>
    );
};

export default ContactsTable;
