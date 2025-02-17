import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Drawer, Box } from "@mui/material";
import { DisplayContact } from "./DisplayContact";
import { EditContact } from "./EditContact";

const ContactView = ({ open, onClose }) => {
    const contact = useSelector(state => state.listOfContacts.thisContact);
    let [isEdit, setIsEdit] = useState(false);
    if (!contact) return null;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: "440px",
                    padding: "20px",
                    height: "100%",
                    backgroundColor: "#f8f9fb",
                    color: "#1f3b57",
                    boxSizing: "border-box",
                    overflow: "hidden"
                }
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    overflowY: "auto",
                    paddingRight: "20px",
                    marginRight: "-20px",
                    boxSizing: "content-box"
                }}
            >
                {isEdit ? (
                    <EditContact item={contact} setIsEdit={setIsEdit} onClose={onClose} />
                ) : (
                    <DisplayContact onClose={onClose} contact={contact} isEdit={isEdit} setIsEdit={setIsEdit} />
                )}

                <Box sx={{ height: "30px" }} />
            </Box>
        </Drawer>
    );
};

export default ContactView;
