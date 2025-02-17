import userIcon from "./assets/man.svg";
import phoneIcon from "./assets/phone.svg";
import emailIcon from "./assets/mail.svg";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ViewIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Avatar from "@mui/material/Avatar";
import DefaultUserIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import { selectContact } from "./app/contactsSlice";
import { TableRow, TableCell, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/StarBorder";
import StarFilledIcon from "@mui/icons-material/Star";
import ContactView from "./ContactView";
import { updateUserMainContact } from "./app/contactsSlice";

/**
 * This component represents a single contact in the contact list table.
 * It displays the contact's profile picture, name, role, type, and communication options.
 * It also allows marking the contact as a "main contact" and viewing detailed information.
 */
const ContactDetails = ({ contact }) => {
    const [rating, setRating] = useState(contact.mainContact ? 1 : 0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dispatch = useDispatch();

    /**
     * Opens the contact details drawer and updates the Redux store with the selected contact.
     */
    const handleViewDetails = () => {
        setIsDrawerOpen(true);
        dispatch(selectContact(contact)); // Updates the global state with the selected contact
    };

    /**
     * Toggles the "main contact" status (star icon) and saves the change to Redux.
     */
    const handleRatingChange = () => {
        const newValue = rating === 1 ? 0 : 1;
        setRating(newValue);
        dispatch(updateUserMainContact({ id: contact.id, mainContact: !!newValue }));
    };

    // Computes the profile image path if available
    const profileImagePath = contact.image ? `/img/${contact.image}.jpg` : "";

    return (
        <>
            <TableRow>
                {/* Profile picture */}
                <TableCell>
                    <Avatar
                        alt={`${contact.firstName} ${contact.lastName}`}
                        src={profileImagePath}
                        sx={{ bgcolor: "#ddd", width: 40, height: 40 }}
                    >
                        {/* Shows default icon if no profile image is available */}
                        {!contact.image && <DefaultUserIcon />}
                    </Avatar>
                </TableCell>

                {/* Contact type (e.g., Employee, Client) */}
                <TableCell>{contact.contactType}</TableCell>

                {/* Full name */}
                <TableCell>{contact.firstName} {contact.lastName}</TableCell>

                {/* Role/Position */}
                <TableCell>{contact.role}</TableCell>

                {/* Communication icons (User, Phone, Email) */}
                <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <img src={userIcon} alt="User" width={20} />
                        <img src={phoneIcon} alt="Phone" width={20} />
                        <img src={emailIcon} alt="Email" width={20} />
                    </Box>
                </TableCell>

                {/* Star button to mark as "Main Contact" */}
                <TableCell align="center">
                    <IconButton onClick={handleRatingChange} sx={{ color: "#2e5277" }}>
                        {rating ? <StarFilledIcon /> : <StarIcon />}
                    </IconButton>
                </TableCell>

                {/* View Contact Details button */}
                <TableCell align="center">
                    <IconButton onClick={handleViewDetails}>
                        <ViewIcon />
                    </IconButton>
                </TableCell>
            </TableRow>

            {/* ContactView component - displays full contact details in a drawer */}
            <ContactView open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    );
};

export default ContactDetails;
