import React from "react";
import { IconButton, Avatar, Typography, Box, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChatIcon from "@mui/icons-material/Chat";
import ReactCountryFlag from "react-country-flag";

/**
 * This component displays detailed contact information.
 * It includes an avatar, name, contact details, preferred language, and billing information.
 */
export const DisplayContact = ({ onClose, contact, setIsEdit }) => {
    if (!contact) return null; // Prevents errors if data is not yet loaded

    const languageFlags = {
        English: "GB",
        French: "FR",
        Spanish: "ES",
        Hebrew: "IL",
    };

    const preferredLanguage = contact.contactDetails?.preferredLanguage || contact.preferredLanguage || "Not specified";

    return (
        <>
            {/* Header with close button */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold" fontSize="1rem">
                    Contact Details
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Profile picture and edit button */}
            <Box position="relative" textAlign="center" my={1}>
                <Avatar
                    src={contact.image ? `/img/${contact.image}.jpg` : "/img/default.jpg"}
                    onError={(e) => (e.target.src = "/img/default.jpg")}
                    sx={{ width: 70, height: 70, margin: "auto" }}
                />
                {/* Edit button with "Edit" text */}
                <IconButton
                    size="small"
                    onClick={() => setIsEdit(true)}
                    sx={{ position: "absolute", top: 0, right: 0, color: "#1f3b57", display: "flex", alignItems: "center" }}
                >
                    <EditIcon fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>Edit</Typography>
                </IconButton>
                <Typography fontSize="0.9rem" fontWeight="bold">
                    {contact.firstName} {contact.lastName}
                </Typography>
            </Box>
            <Typography
                variant="body1"
                sx={{
                    color: "#1f3b57",
                    backgroundColor: "#F5F8FA",
                    padding: "10px",
                    borderRadius: "5px"
                }}
            >
                {contact.address}
            </Typography>

            {/* Role and contact type */}
            <Box display="flex" justifyContent="space-around" my={1}>
                <Box textAlign="center">
                    <Typography variant="caption" color="textSecondary">Role</Typography>
                    <Typography fontSize="0.9rem" fontWeight="bold">{contact.role || "N/A"}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="caption" color="textSecondary">Contact Type</Typography>
                    <Typography fontSize="0.9rem" fontWeight="bold">{contact.contactType || "N/A"}</Typography>
                </Box>
            </Box>
            <Divider />

            {/* Main contact indicator */}
            <Box display="flex" alignItems="center" gap={1} my={1}>
                <StarIcon sx={{ color: contact.mainContact ? "#2e5277" : "#b0b0b0", fontSize: 20 }} />
                <Typography variant="body2">Main Contact</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />

            {/* Preferred language */}
            <Typography variant="caption" color="textSecondary">Preferred Language</Typography>
            <Box display="flex" alignItems="center" gap={1} mb={3}>
                {languageFlags[preferredLanguage] && (
                    <ReactCountryFlag
                        countryCode={languageFlags[preferredLanguage]}
                        svg
                        style={{ width: 20, height: 15, marginRight: "5px", borderRadius: "3px" }}
                    />
                )}
                <Typography fontSize="0.9rem" fontWeight="bold">{preferredLanguage}</Typography>
            </Box>

            {/* Phone numbers */}
            <Typography variant="caption" color="textSecondary">Phone</Typography>
            {contact.contactDetails?.phoneNumbers?.length > 0 ? (
                contact.contactDetails.phoneNumbers.map((p, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1} mb={3}>
                        <Typography fontSize="0.9rem" fontWeight="bold">
                            {p.type} -{" "}
                            <Box component="span" sx={{ borderBottom: "1px solid black", display: "inline-block" }}>
                                {p.number}
                            </Box>
                        </Typography>
                        <IconButton size="small"><PhoneIcon fontSize="small" /></IconButton>
                        <IconButton size="small"><ChatIcon fontSize="small" /></IconButton>
                        <IconButton size="small"><WhatsAppIcon fontSize="small" /></IconButton>
                    </Box>
                ))
            ) : (
                <Typography>No phone numbers available</Typography>
            )}

            {/* Emails */}
            <Typography variant="caption" color="textSecondary">Email</Typography>
            {contact.contactDetails?.emails?.length > 0 ? (
                contact.contactDetails.emails.map((e, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1}>
                        <Typography fontSize="0.9rem" fontWeight="bold">
                            {e.type} -{" "}
                            <Box component="span" sx={{ borderBottom: "1px solid black", display: "inline-block" }}>
                                {e.email}
                            </Box>
                        </Typography>
                        <IconButton size="small"><EmailIcon fontSize="small" /></IconButton>
                    </Box>
                ))
            ) : (
                <Typography>No emails available</Typography>
            )}

            <Divider sx={{ my: 1 }} />

            {/* Address */}
            <Typography variant="caption" color="textSecondary">Address</Typography>
            <Typography fontSize="0.9rem" fontWeight="bold">{contact.mailingAddress || "No address available"}</Typography>

            <Divider sx={{ my: 1 }} />

            {/* Billing information */}
            {contact.billingInformation && contact.billingInformation !== "" ? (
                <Box>
                    <Typography variant="caption" color="textSecondary">Name for Invoice</Typography>
                    <Typography fontSize="0.9rem" fontWeight="bold" mb={3}>
                        {contact.billingInformation.nameForInvoice || "N/A"}
                    </Typography>

                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            <Typography variant="caption" color="textSecondary">Accounting Ref</Typography>
                            <Typography fontSize="0.9rem" fontWeight="bold">
                                {contact.billingInformation.accountingRef || "N/A"}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="textSecondary">VAT Number</Typography>
                            <Typography fontSize="0.9rem" fontWeight="bold">
                                {contact.billingInformation.VATNumber || "N/A"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Typography variant="caption" color="textSecondary">No billing information available</Typography>
            )}
        </>
    );
};
