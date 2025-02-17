import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import {
    TextField,
    Button,
    Drawer,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    IconButton,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ReactCountryFlag from "react-country-flag";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "./app/contactsSlice";

export const EditContact = ({ item, onClose, setIsEdit }) => {
    const [profileImage, setProfileImage] = useState(null);
    const dispatch = useDispatch();
    const [mailingAddress, setMailingAddress] = useState(item.mailingAddress || { address: "", comment: "" });
    const [billingInfo, setBillingInfo] = useState(item.billingInformation || { nameForInvoice: "", accountingRef: "", VATNumber: "" });

    useEffect(() => {
        if (item && !profileImage) {
            setProfileImage(item.image ? `/img/${item.image}.jpg` : null);
        }
    }, [item]);



    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            firstName: item?.firstName || "",
            lastName: item?.lastName || "",
            role: item?.role || "",
            contactType: item?.contactType || "Employee",
            preferredLanguage: item?.contactDetails?.preferredLanguage || "English",
            phones: item?.contactDetails?.phoneNumbers || [{ number: "", type: "Personal" }],
            emails: item?.contactDetails?.emails || [{ email: "", type: "Private" }],
            mailingAddress: item?.mailingAddress?.address || "",
            billingInformation: {
                nameForInvoice: item?.billingInformation?.nameForInvoice || "",
                accountingRef: item?.billingInformation?.accountingRef || "",
                VATNumber: item?.billingInformation?.VATNumber || "",
            }
        },
    });

    const languageOptions = [
        { value: "Hebrew", label: "Hebrew", flag: "IL" },
        { value: "English", label: "English", flag: "US" },
        { value: "Spanish", label: "Spanish", flag: "ES" },
        { value: "French", label: "French", flag: "FR" },
    ];

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfileImage(item.image ? `/img/${item.image}.jpg` : profileImage);
        }
    };

    const saveContact = (data) => {
        console.log(data);
        const formattedData = {
            id: item.id,
            ...data,
            image: profileImage ? profileImage.replace('/img/', '').replace('.jpg', '') : item?.image || null,
            contactDetails: {
                preferredLanguage: data.preferredLanguage,
                phoneNumbers: data.phones.map(phone => ({ type: phone.type, number: phone.number })),
                emails: data.emails.map(email => ({ type: email.type, email: email.email })),
            },
            mailingAddress: mailingAddress.address,
            billingInformation: {
                nameForInvoice: billingInfo.nameForInvoice,
                accountingRef: billingInfo.accountingRef,
                VATNumber: billingInfo.VATNumber,
            },
        };
        formattedData.mainContact = item.mainContact;

        if (item.id) {
            dispatch(updateContact(formattedData));
        } else {
            dispatch(addContact(formattedData));
        }
        onClose();
        setIsEdit(false)
    };


    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#1f3b57" }}>
                <h2>Edit Contact</h2>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div style={{ textAlign: "center", marginBottom: "15px", position: "relative" }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="profile-upload"
                />
                <label htmlFor="profile-upload">
                    <Avatar
                        src={profileImage || `/img/${item.image}.jpg`}
                        onError={(e) => (e.target.src = "/img/default.jpg")}
                        sx={{ width: 80, height: 80, margin: "auto", cursor: "pointer" }}
                    />
                </label>
                <IconButton
                    component="label"
                    htmlFor="profile-upload"
                    sx={{
                        position: "absolute",
                        left: "60%",
                        bottom: 0,
                        transform: "translateX(-50%)",
                        background: "#fff"
                    }}
                >
                    <EditIcon />
                </IconButton>
            </div>

            <form onSubmit={handleSubmit(saveContact)}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="First Name"
                                fullWidth
                                disabled
                                sx={{
                                    backgroundColor: "#F5F8FA",
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "#1f3b57"
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#1f3b57"
                                    }
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Last Name"
                                fullWidth
                                disabled
                                sx={{
                                    backgroundColor: "#F5F8FA",
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "#1f3b57"
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#1f3b57"
                                    }
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Role"
                                fullWidth
                                disabled
                                sx={{
                                    backgroundColor: "#F5F8FA",
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "#1f3b57"
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#1f3b57"
                                    }
                                }}
                            />
                        )}
                    /><Controller
                        name="contactType"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth sx={{ backgroundColor: "#F5F8FA" }}>
                                <InputLabel
                                    shrink
                                    sx={{
                                        color: "#1f3b57",
                                        "&.Mui-focused": { color: "#1f3b57" }
                                    }}
                                >
                                    Contact Type
                                </InputLabel>
                                <Select
                                    {...field}
                                    displayEmpty
                                    sx={{
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1f3b57" }
                                    }}
                                >
                                    <MenuItem value="Contractor">Contractor</MenuItem>
                                    <MenuItem value="Employee">Employee</MenuItem>
                                    <MenuItem value="Freelancer">Freelancer</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />

                </div>


                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" sx={{ fontSize: "14px", marginBottom: "10px", color: "#1f3b57" }}>
                            Contact Details
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12}>
                            <label htmlFor="preferredLanguage" style={{ color: "#1f3b57" }}>Preferred Language</label>
                            <Controller
                                name="preferredLanguage"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            fullWidth
                                            inputProps={{ readOnly: true }}
                                            sx={{
                                                backgroundColor: "#F5F8FA",
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1f3b57" }
                                            }}
                                            displayEmpty
                                        >
                                            {languageOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    <ReactCountryFlag countryCode={option.flag} svg style={{ marginRight: 5 }} />
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </>
                                )}
                            />
                        </Grid>
                        <h4 style={{ color: "#1f3b57" }}>Phone</h4>
                        {item.contactDetails.phoneNumbers.map((phone, index) => (
                            <div key={phone.id || index} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                                <TextField
                                    defaultValue={phone.number}
                                    label="Phone"
                                    fullWidth
                                    disabled
                                    sx={{
                                        backgroundColor: "#F5F8FA",
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-disabled fieldset": {
                                                borderColor: "#b0b0b0"
                                            }
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#1f3b57"
                                        }
                                    }}
                                />
                                <TextField
                                    defaultValue={phone.type}
                                    label="Type"
                                    fullWidth
                                    disabled
                                    sx={{
                                        backgroundColor: "#F5F8FA",
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-disabled fieldset": {
                                                borderColor: "#b0b0b0"
                                            }
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#1f3b57"
                                        }
                                    }}
                                />
                            </div>
                        ))}

                        <h4 style={{ color: "#1f3b57" }}>Email</h4>
                        {item.contactDetails.emails.map((email, index) => (
                            <div key={email.id || index} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                                <TextField
                                    defaultValue={email.email}
                                    label="Email"
                                    fullWidth
                                    disabled
                                    sx={{
                                        backgroundColor: "#F5F8FA",
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-disabled fieldset": {
                                                borderColor: "#b0b0b0"
                                            }
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#1f3b57"
                                        }
                                    }}
                                />
                                <TextField
                                    defaultValue={email.type}
                                    label="Type"
                                    fullWidth
                                    disabled
                                    sx={{
                                        backgroundColor: "#F5F8FA",
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-disabled fieldset": {
                                                borderColor: "#b0b0b0"
                                            }
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#1f3b57"
                                        }
                                    }}
                                />
                            </div>
                        ))}


                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" style={{ color: "#1f3b57" }}>Mailing Address</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    defaultValue={item.mailingAddress}
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#F5F8FA",
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                                        },
                                        "& .MuiInputLabel-root": { color: "#1f3b57" },
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#1f3b57" }
                                    }}
                                    onChange={(e) => setMailingAddress({ ...mailingAddress, address: e.target.value })}
                                />
                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" style={{ color: "#1f3b57" }}>Billing Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name for invoice"
                                    defaultValue={item.billingInformation.nameForInvoice}
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#F5F8FA",
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                                        },
                                        "& .MuiInputLabel-root": { color: "#1f3b57" },
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#1f3b57" }
                                    }}
                                    onChange={(e) => setBillingInfo({ ...billingInfo, invoiceName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Accounting Ref"
                                    defaultValue={item.billingInformation.accountingRef}

                                    fullWidth
                                    sx={{
                                        backgroundColor: "#F5F8FA",
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                                        },
                                        "& .MuiInputLabel-root": { color: "#1f3b57" },
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#1f3b57" }
                                    }}
                                    onChange={(e) => setBillingInfo({ ...billingInfo, accountingRef: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="VAT Number"
                                    defaultValue={item.billingInformation.VATNumber}
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#F5F8FA",
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                                        },
                                        "& .MuiInputLabel-root": { color: "#1f3b57" },
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#1f3b57" }
                                    }}
                                    onChange={(e) => setBillingInfo({ ...billingInfo, vatNumber: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>


                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <Button onClick={() => { setIsEdit(false); onClose() }} variant="contained" style={{ backgroundColor: "#fff", color: "#1f3b57" }}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" style={{ backgroundColor: "#1f3b57", color: "#fff" }}>
                        Save Contact
                    </Button>
                </div>

            </form>
        </>
    );

}