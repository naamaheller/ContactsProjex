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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
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

  const { fields: phoneFields, append: addPhone, remove: removePhone } = useFieldArray({ control, name: "phones" });
  const { fields: emailFields, append: addEmail, remove: removeEmail } = useFieldArray({ control, name: "emails" });
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    reset();
    setProfileImage(null);
    onClose();
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    handleClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose} PaperProps={{ sx: { width: "400px", padding: "20px", height: "700px" } }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>New Contact</h2>
        <IconButton onClick={handleClose}><CloseIcon /></IconButton>
      </div>
      
      <div style={{ textAlign: "center", marginBottom: "15px", position: "relative" }}>
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} id="profile-upload" />
        <label htmlFor="profile-upload">
          <Avatar src={profileImage} sx={{ width: 80, height: 80, margin: "auto", cursor: "pointer" }} />
        </label>
        <IconButton component="label" htmlFor="profile-upload" sx={{ position: "absolute", left: "60%", bottom: 0, transform: "translateX(-50%)", background: "#fff" }}>
          <EditIcon />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
          <Controller name="firstName" control={control} render={({ field }) => <TextField {...field} label="First Name" fullWidth />} />
          <Controller name="lastName" control={control} render={({ field }) => <TextField {...field} label="Last Name" fullWidth />} />
          <Controller name="role" control={control} render={({ field }) => <TextField {...field} label="Role" fullWidth />} />
          <Controller name="contactType" control={control} render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel shrink>Contact Type</InputLabel>
              <Select {...field} displayEmpty>
                <MenuItem value="contractor">Contractor</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
              </Select>
            </FormControl>
          )} />
        </div>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontSize: "14px", marginBottom: "10px"}}>Contact Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth sx={{ marginBottom: "10px" }}>
              <InputLabel shrink>Preferred Language</InputLabel>
              <Controller name="language" control={control} render={({ field }) => (
                <Select {...field} displayEmpty>
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>{lang.flag} {lang.name}</MenuItem>
                  ))}
                </Select>
              )} />
            </FormControl>

            <h4>Phone</h4>
            {phoneFields.map((item, index) => (
              <div key={item.id} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                <Controller name={`phones.${index}.number`} control={control} render={({ field }) => <TextField {...field} label="Phone" fullWidth />} />
                <Controller name={`phones.${index}.type`} control={control} render={({ field }) => (
                  <Select {...field} displayEmpty>
                    <MenuItem value="Work">Work</MenuItem>
                    <MenuItem value="Personal">Personal</MenuItem>
                  </Select>
                )} />
                <IconButton onClick={() => removePhone(index)}><DeleteIcon /></IconButton>
              </div>
            ))}
            <Button onClick={() => addPhone({ number: "", type: "" })} startIcon={<AddIcon />}>Add Phone</Button>

            <h4>Email</h4>
            {emailFields.map((item, index) => (
              <div key={item.id} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                <Controller name={`emails.${index}.email`} control={control} render={({ field }) => <TextField {...field} label="Email" fullWidth />} />
                <Controller name={`emails.${index}.type`} control={control} render={({ field }) => (
                  <Select {...field} displayEmpty>
                    <MenuItem value="Private">Private</MenuItem>
                    <MenuItem value="Work">Work</MenuItem>
                  </Select>
                )} />
                <IconButton onClick={() => removeEmail(index)}><DeleteIcon /></IconButton>
              </div>
            ))}
            <Button onClick={() => addEmail({ email: "", type: "" })} startIcon={<AddIcon />}>Add Email</Button>
          </AccordionDetails>
        </Accordion>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Save Contact</Button>
        </div>
      </form>
    </Drawer>
  );
};

export default AddContactForm;
