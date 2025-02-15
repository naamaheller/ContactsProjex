import React from "react";
import { useSelector } from "react-redux";
import { Drawer, IconButton, Avatar, Typography, Box, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChatIcon from "@mui/icons-material/Chat";

const ContactView = ({ open, onClose }) => {
    const contact = useSelector(state => state.listOfContacts.thisContact);

    if (!contact) return null;

    return (
        <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: "360px", padding: "30px", backgroundColor: "#f8f9fb" } }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold" fontSize={"1rem"}>Contact Details</Typography>
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </Box>

            <Box position="relative" textAlign="center" my={1}>
                <Avatar
                    src={contact.image ? `/img/${contact.image}.jpg` : "/img/default.jpg"}
                    onError={(e) => e.target.src = "/img/default.jpg"}
                    sx={{ width: 70, height: 70, margin: "auto" }}
                />
                <IconButton size="small" sx={{ position: "absolute", top: 0, right: 0, color: "#007bff" }}>
                    <EditIcon fontSize="small" /> <Typography variant="body2">Edit</Typography>
                </IconButton>
                <Typography fontSize={"0.9rem"} fontWeight="bold">{contact.firstName} {contact.lastName}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-around" my={1}>
                <Box textAlign="center">
                    <Typography variant="caption" color="textSecondary">Role</Typography>
                    <Typography fontSize={"0.9rem"} fontWeight="bold">{contact.role}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="caption" color="textSecondary">Contact Type</Typography>
                    <Typography fontSize={"0.9rem"} fontWeight="bold">{contact.contactType}</Typography>
                </Box>
            </Box>
            <Divider />

            <Box display="flex" alignItems="center" gap={1} my={1}>
                <StarIcon color={contact.mainContact ? "warning" : "disabled"} fontSize="small" />
                <Typography variant="body2">Main Contact</Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Typography variant="caption" color="textSecondary">Preferred Language</Typography>
            <Box display="flex" alignItems="center" gap={1}>
                <LanguageIcon fontSize="small" />
                <Typography fontSize={"0.9rem"} fontWeight="bold">{contact.contactDetails?.preferredLanguage || "Not specified"}</Typography>
            </Box>
            {/* <Divider sx={{ my: 1 }} /> */}

            <Typography variant="caption" color="textSecondary">Phone</Typography>
            {contact.contactDetails?.phoneNumbers?.map((p, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1}>
                    <Typography fontSize={"0.9rem"} fontWeight="bold">
                        {p.type} -
                        <Box component="span" sx={{ borderBottom: "1px solid black", display: "inline-block" }}>
                            {p.number}
                        </Box>
                    </Typography>
                    <IconButton size="small"><PhoneIcon fontSize="small" /></IconButton>
                    <IconButton size="small"><ChatIcon fontSize="small" /></IconButton>
                    <IconButton size="small"><WhatsAppIcon fontSize="small" /></IconButton>
                </Box>
            )) || <Typography>No phone numbers available</Typography>}
            {/* <Divider sx={{ my: 1 }} /> */}

            <Typography variant="caption" color="textSecondary">Email</Typography>
            {contact.contactDetails?.emails?.map((e, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1}>
                    <Typography fontSize={"0.9rem"} fontWeight="bold">
                        {e.type} -
                        <Box component="span" sx={{ borderBottom: "1px solid black", display: "inline-block" }}>
                            {e.email}
                        </Box>
                    </Typography>
                    <IconButton size="small"><EmailIcon fontSize="small" /></IconButton>
                </Box>
            )) || <Typography>No emails available</Typography>}
            <Divider sx={{ my: 1 }} />

            <Typography variant="caption" color="textSecondary">Address</Typography>
            <Typography fontSize={"0.9rem"} fontWeight="bold">{contact.address || "No address available"}</Typography>
            <Divider sx={{ my: 1 }} />

            {contact.billingInformation && contact.billingInformation !== "" ? (
                <Box>
                    <Typography variant="caption" color="textSecondary">Name for Invoice</Typography>
                    <Typography fontSize={"0.9rem"} fontWeight="bold">{contact.billingInformation.nameForInvoice || "N/A"}</Typography>
                    {/* <Divider sx={{ my: 1 }} /> */}

                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            <Typography variant="caption" color="textSecondary">Accounting Ref</Typography>
                            <Typography fontSize={"0.9rem"} fontWeight="bold">{contact.billingInformation.accountingRef || "N/A"}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="textSecondary">VAT Number</Typography>
                            <Typography fontSize={"0.9rem"} fontWeight="bold">{contact.billingInformation.VATNumber || "N/A"}</Typography>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Typography variant="caption" color="textSecondary">No billing information available</Typography>
            )}
        </Drawer>
    );
};

export default ContactView;
