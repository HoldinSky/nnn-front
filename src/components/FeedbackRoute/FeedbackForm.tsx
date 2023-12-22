import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Rating,
  Grid,
} from "@mui/material";
import { MuiPhone } from "./PhoneNumber";
import { AxiosResponse, AxiosError } from "axios";
import { backendCall } from "../../helper/axios";
import { PhoneNumberUtil } from "google-libphonenumber";

interface CreateFeedbackDto {
  phoneNumber: string;
  text: string;
  rating: number;
}

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const FeedbackForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const isValidPhone = isPhoneValid(phoneNumber);
  const isValidRating = rating != null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: string[] = [];

    if (!isValidPhone) {
      errors.push("Phone is not valid");
    }

    if (!isValidRating) {
      errors.push("Rating is not valid");
    }

    if (errors.length === 0) {
      const feedbackData: CreateFeedbackDto = {
        phoneNumber,
        text: feedback,
        rating: rating!,
      };

      try {
        const response: AxiosResponse<unknown, unknown> = await backendCall(
          "post",
          "/feedback",
          {
            data: feedbackData,
          }
        );

        console.log("Feedback submitted successfully:", response.data);

        // Clear the form after submission
        setPhoneNumber("");
        setFeedback("");
        setRating(null);
      } catch (error) {
        console.error(
          "Error submitting feedback:",
          (error as AxiosError).response?.data
        );
      }
    } else {
      console.error("Please fix the validation errors before submitting.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography
        variant="h1"
        gutterBottom
        style={{
          textAlign: "center",
          fontSize: "2rem", // Responsive font size
        }}
      >
        Feedback Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <MuiPhone
          value={phoneNumber}
          onChange={setPhoneNumber}
          required
          placeholder="Enter phone number"
          fullWidth
          margin="normal"
        />
        <Grid
          container
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
        >
          <Grid item>
            <Typography variant="body1">Rating:</Typography>
          </Grid>
          <Grid item>
            <Rating
              name="stars-rating"
              value={rating}
              precision={0.5}
              onChange={(_event, newValue) => setRating(newValue)}
            />
          </Grid>
        </Grid>
        <TextField
          label="Feedback"
          multiline
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isValidPhone || !isValidRating}
        >
          Submit Feedback
        </Button>
      </form>
    </Container>
  );
};

export default FeedbackForm;
