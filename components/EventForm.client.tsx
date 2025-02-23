"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Container,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import EventDatePicker from "./EventDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Delete } from "@mui/icons-material";

type EventData = {
  name: string;
  location: string;
  description: string;
  date: Dayjs | null;
  invitees: string[];
  descisionMode: number;
};

const EventForm = () => {
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    location: "",
    description: "",
    date: dayjs(),
    invitees: [],
    descisionMode: 1,
  });

  useEffect(() => {
    setEventData((prev) => ({ ...prev, date: dayjs() }));
  }, []);

  const handleDateChange = (newDate: Dayjs | null) => {
    setEventData({ ...eventData, date: newDate });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted", eventData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setEventData({
      ...eventData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleInviteeChange = (index: number, value: string) => {
    setEventData((prev) => {
      const updatedInvitees = [...prev.invitees];
      updatedInvitees[index] = value;
      return { ...prev, invitees: updatedInvitees };
    });
  };

  const addInviteeField = () => {
    setEventData((prev) => ({
      ...prev,
      invitees: [...prev.invitees, ""], // Add an empty field
    }));
  };

  const removeInviteeField = (index: number) => {
    if (eventData.invitees.length > 2) {
      setEventData((prev) => {
        const updatedInvitees = prev.invitees.filter((_, i) => i !== index);
        return { ...prev, invitees: updatedInvitees };
      });
    }
  };

  const isValidEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Create Event
        </Typography>
        <TextField
          label="Event Name"
          name="name"
          fullWidth
          margin="normal"
          value={eventData.name}
          onChange={handleChange}
          autoFocus={true}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "white",
              borderRadius: 1,
            },
          }}
          required
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          value={eventData.description}
          onChange={handleChange}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "white",
              borderRadius: 1,
            },
          }}
          required
        />
        <EventDatePicker value={eventData.date} onChange={handleDateChange} />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Invitees
        </Typography>
        {/* Invitee Field */}
        {eventData.invitees.map((invitee, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <TextField
              label={`Invitee ${index + 1} Email`}
              fullWidth
              margin="normal"
              value={invitee}
              onBlur={(e) => handleInviteeChange(index, e.target.value)}
              error={!!invitee && !isValidEmail(invitee)}
              helperText={
                !!invitee && !isValidEmail(invitee)
                  ? "Invalid email format"
                  : ""
              }
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "white",
                  borderRadius: 1,
                },
              }}
            />
            {eventData.invitees.length > 2 && (
              <IconButton
                onClick={() => removeInviteeField(index)}
                color="error"
              >
                <Delete />
              </IconButton>
            )}
          </div>
        ))}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={addInviteeField}
        >
          + Add Another Invitee
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Create Event
        </Button>
      </form>
    </Container>
  );
};

export default EventForm;
