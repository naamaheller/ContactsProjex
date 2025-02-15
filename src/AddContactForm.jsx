import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useState } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReactCountryFlag from "react-country-flag";

const languageOptions = [
    { value: "hebrew", label: "Hebrew", flag: "IL" },
    { value: "english", label: "English", flag: "US" },
    { value: "spanish", label: "Spanish", flag: "ES" },
    { value: "french", label: "French", flag: "FR" },
];

const AddContactForm = ({ open, onClose }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            role: "",
            contactType: "",
            language: "",
            phones: [{ number: "", type: "" }],
            emails: [{ email: "", type: "" }],
        },
    });
    const [mailingAddress, setMailingAddress] = useState({
        address: "",
        comment: "",
    });
    const [billingInfo, setBillingInfo] = useState({
        invoiceName: "",
        accountingRef: "",
        vatNumber: "",
    });

    const { fields: phoneFields, append: addPhone, remove: removePhone } =
        useFieldArray({ control, name: "phones" });
    const { fields: emailFields, append: addEmail, remove: removeEmail } =
        useFieldArray({ control, name: "emails" });
    const [profileImage, setProfileImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleClose = () => {
        reset(); // מאפס את כל השדות של react-hook-form
        setProfileImage(null); // מאפס את תמונת הפרופיל
        setMailingAddress({ address: "", comment: "" }); // מאפס את הכתובת
        setBillingInfo({ invoiceName: "", accountingRef: "", vatNumber: "" }); // מאפס את הנתונים לחיוב
        onClose();
    };


    const onSubmit = (data) => {
        console.log("Form Data:", data);
        handleClose();
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { width: "400px", padding: "20px", height: "700px" } }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",color:"#1f3b57" }}>
                <h2>New Contact</h2>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </div>

            <div style={{ textAlign: "center", marginBottom: "15px", position: "relative" }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} id="profile-upload" />
                <label htmlFor="profile-upload">
                    <Avatar src={profileImage} sx={{ width: 80, height: 80, margin: "auto", cursor: "pointer" }} />
                </label>
                <IconButton
                    component="label"
                    htmlFor="profile-upload"
                    sx={{ position: "absolute", left: "60%", bottom: 0, transform: "translateX(-50%)", background: "#fff" }}
                >
                    <EditIcon />
                </IconButton>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
    <Controller 
        name="firstName" 
        control={control} 
        render={({ field }) => (
            <TextField 
                {...field} 
                label="First Name" 
                fullWidth 
                sx={{ 
                    backgroundColor: "#F5F8FA", 
                    "& .MuiOutlinedInput-root": { 
                        "&.Mui-focused fieldset": { borderColor: "#1f3b57" } 
                    },
                    "& .MuiInputLabel-root": { 
                        color: "#1f3b57" // צבע ברירת מחדל
                    },
                    "& .MuiInputLabel-root.Mui-focused": { 
                        color: "#1f3b57" // צבע הכותרת כשהאינפוט בפוקוס
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
                    <MenuItem value="contractor">Contractor</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
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
                name="language"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        fullWidth
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
                )}
            />
        </Grid>

        <h4 style={{ color: "#1f3b57" }}>Phone</h4>
        {phoneFields.map((item, index) => (
            <div key={item.id} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                <Controller
                    name={`phones.${index}.number`}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Phone"
                            fullWidth
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
                    name={`phones.${index}.type`}
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            sx={{
                                backgroundColor: "#F5F8FA",
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1f3b57" }
                            }}
                            displayEmpty
                        >
                            <MenuItem value="Work">Work</MenuItem>
                            <MenuItem value="Personal">Personal</MenuItem>
                        </Select>
                    )}
                />
                <IconButton onClick={() => removePhone(index)}><DeleteIcon /></IconButton>
            </div>
        ))}
        <Button
            onClick={() => addPhone({ number: "", type: "" })}
            startIcon={<AddIcon />}
            variant="text"
            style={{ color: "#1f3b57" }}
        >
            Add Phone
        </Button>

        <h4 style={{ color: "#1f3b57" }}>Email</h4>
        {emailFields.map((item, index) => (
            <div key={item.id} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                <Controller
                    name={`emails.${index}.email`}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Email"
                            fullWidth
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
                    name={`emails.${index}.type`}
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            sx={{
                                backgroundColor: "#F5F8FA",
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1f3b57" }
                            }}
                            displayEmpty
                        >
                            <MenuItem value="Private">Private</MenuItem>
                            <MenuItem value="Work">Work</MenuItem>
                        </Select>
                    )}
                />
                <IconButton onClick={() => removeEmail(index)}><DeleteIcon /></IconButton>
            </div>
        ))}
        <Button
            onClick={() => addEmail({ email: "", type: "" })}
            startIcon={<AddIcon />}
            variant="text"
            style={{ color: "#1f3b57" }}
        >
            Add Email
        </Button>
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
                    fullWidth
                    sx={{
                        backgroundColor: "#F5F8FA",
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                        },
                        "& .MuiInputLabel-root": { color: "#1f3b57" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#1f3b57" }
                    }}
                    value={mailingAddress.address}
                    onChange={(e) => setMailingAddress({ ...mailingAddress, address: e.target.value })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Comment"
                    fullWidth
                    sx={{
                        backgroundColor: "#F5F8FA",
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                        },
                        "& .MuiInputLabel-root": { color: "#1f3b57" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#1f3b57" }
                    }}
                    value={mailingAddress.comment}
                    onChange={(e) => setMailingAddress({ ...mailingAddress, comment: e.target.value })}
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
                    fullWidth
                    sx={{
                        backgroundColor: "#F5F8FA",
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                        },
                        "& .MuiInputLabel-root": { color: "#1f3b57" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#1f3b57" }
                    }}
                    value={billingInfo.invoiceName}
                    onChange={(e) => setBillingInfo({ ...billingInfo, invoiceName: e.target.value })}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Accounting Ref"
                    fullWidth
                    sx={{
                        backgroundColor: "#F5F8FA",
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                        },
                        "& .MuiInputLabel-root": { color: "#1f3b57" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#1f3b57" }
                    }}
                    value={billingInfo.accountingRef}
                    onChange={(e) => setBillingInfo({ ...billingInfo, accountingRef: e.target.value })}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="VAT Number"
                    fullWidth
                    sx={{
                        backgroundColor: "#F5F8FA",
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#1f3b57" }
                        },
                        "& .MuiInputLabel-root": { color: "#1f3b57" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#1f3b57" }
                    }}
                    value={billingInfo.vatNumber}
                    onChange={(e) => setBillingInfo({ ...billingInfo, vatNumber: e.target.value })}
                />
            </Grid>
        </Grid>
    </AccordionDetails>
</Accordion>


                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <Button onClick={handleClose} variant="contained" style={{ backgroundColor: "#1f3b57", color: "#fff" }}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" style={{ backgroundColor: "#1f3b57", color: "#fff" }}>
                        Save Contact
                    </Button>
                </div>

            </form>
        </Drawer>
    );
};

export default AddContactForm;
