import userIcon from "./assets/man.svg";
import phoneIcon from "./assets/phone.svg";
import emailIcon from "./assets/mail.svg";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
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

const ContactDetails = ({ contact }) => {
    const [rating, setRating] = useState(contact.mainContact ? 1 : 0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dispatch = useDispatch();

    const handleViewDetails = () => {
        setIsDrawerOpen(true);
        dispatch(selectContact(contact));
    };

    const handleRatingChange = () => {
        const newValue = rating === 1 ? 0 : 1;
        setRating(newValue);
        dispatch(updateUserMainContact({ id: contact.id, mainContact: !!newValue }));
    };

    const profileImagePath = contact.image ? `/img/${contact.image}.jpg` : "";

    return (
        <>
            <TableRow>
                {/* תמונת פרופיל */}
                <TableCell>
                    <Avatar
                        alt={`${contact.firstName} ${contact.lastName}`}
                        src={profileImagePath}
                        sx={{ bgcolor: "#ddd", width: 40, height: 40 }}
                    >
                        {!contact.image && <DefaultUserIcon />}
                    </Avatar>
                </TableCell>

                {/* סוג איש קשר */}
                <TableCell>{contact.contactType}</TableCell>

                {/* שם מלא */}
                <TableCell>{contact.firstName} {contact.lastName}</TableCell>

                {/* תפקיד */}
                <TableCell>{contact.role}</TableCell>

                {/* אמצעי התקשרות */}
                <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <img src={userIcon} alt="User" width={20} />
                        <img src={phoneIcon} alt="Phone" width={20} />
                        <img src={emailIcon} alt="Email" width={20} />
                    </Box>
                </TableCell>

                {/* דירוג ראשי */}
                <TableCell align="center">
                    <IconButton onClick={handleRatingChange} sx={{ color: "#2e5277" }}>
                        {rating ? <StarFilledIcon /> : <StarIcon />}
                    </IconButton>
                </TableCell>

                {/* כפתור צפייה בפרטים */}
                <TableCell align="center">
                    <IconButton onClick={handleViewDetails}>
                        <ViewIcon />
                    </IconButton>
                </TableCell>
            </TableRow>

            {/* קומפוננטת ContactView */}
            <ContactView open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    );
};

export default ContactDetails;
