import React, { useState, useEffect } from "react";
import { Popover, Button, Switch, FormControl, Select, MenuItem, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";

const FilterPopover = ({ anchorEl, onClose, setFilteredContacts, contacts }) => {
    const open = Boolean(anchorEl);
    const defaultFilters = {
        contactType: "All",
        tags: "All",
        activeContact: "All",
        mainContact: false
    };

    const [filters, setFilters] = useState(defaultFilters);
    const [pendingFilters, setPendingFilters] = useState(defaultFilters);

    useEffect(() => {
        setFilteredContacts(contacts); // Show all contacts by default
    }, [contacts, setFilteredContacts]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPendingFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (event) => {
        setPendingFilters(prev => ({ ...prev, mainContact: event.target.checked }));
    };

    const applyFilters = () => {
        let filtered = contacts;

        if (pendingFilters.contactType !== "All") {
            filtered = filtered.filter(contact => contact.contactType === pendingFilters.contactType);
        }
        if (pendingFilters.tags !== "All") {
            filtered = filtered.filter(contact => contact.tags?.includes(pendingFilters.tags));
        }
        if (pendingFilters.activeContact !== "All") {
            filtered = filtered.filter(contact => String(contact.activeContact) === pendingFilters.activeContact);
        }
        if (pendingFilters.mainContact) {
            filtered = filtered.filter(contact => contact.mainContact);
        }

        setFilters(pendingFilters);
        setFilteredContacts(filtered);
        onClose();
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{ marginTop: "5px" }}
        >
            <div style={{ width: "300px", padding: "20px", fontFamily: "Arial", color: "#1f3b57" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <Typography variant="h6" fontWeight="bold">Filter</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </div>

                <Button variant="contained" size="small" onClick={() => setPendingFilters(defaultFilters)}
                    style={{ background: "#6c7a92", marginBottom: "15px", textTransform: "none", fontSize: "12px", borderRadius: "15px", padding: "5px 10px" }}>
                    x Clear all
                </Button>

                {["contactType", "tags", "activeContact"].map(field => (
                    <div key={field} style={{ marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                            <RemoveIcon style={{ fontSize: "16px", color: "#6c7a92" }} />
                            <Typography variant="body2" fontWeight="bold" style={{ marginLeft: "5px" }}>
                                {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                            </Typography>
                        </div>
                        <FormControl fullWidth>
                            <Select name={field} value={pendingFilters[field]} onChange={handleChange} size="small">
                                <MenuItem value="All">All</MenuItem>
                                {field === "contactType" && ["Contractor", "Employee","Freelancer"].map(type => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                                {field === "tags" && ["VIP", "Client", "Supplier"].map(tag => (
                                    <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                                ))}
                                {field === "activeContact" && ["true", "false"].map(status => (
                                    <MenuItem key={status} value={status}>{status === "true" ? "Active" : "Inactive"}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                ))}

                <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    <RemoveIcon style={{ fontSize: "16px", color: "#6c7a92" }} />
                    <Typography variant="body2" fontWeight="bold" style={{ marginLeft: "5px", color: pendingFilters.mainContact ? "#1f3b57" : "#a1a1a1" }}>
                        Main Contact
                    </Typography>
                    <Switch checked={pendingFilters.mainContact} onChange={handleSwitchChange} style={{ marginLeft: "auto" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <Button onClick={onClose} style={{ color: "#6c7a92", textTransform: "none", fontSize: "14px" }}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={applyFilters} style={{ background: "#1f3b57", textTransform: "none", fontSize: "14px", padding: "5px 15px" }}>
                        Save
                    </Button>
                </div>
            </div>
        </Popover>
    );
};

export default FilterPopover;
