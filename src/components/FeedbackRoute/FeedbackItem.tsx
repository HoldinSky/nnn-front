import React from "react";
import { Box, Typography, Rating, Grid } from "@mui/material";

interface FeedbackItemProps {
  phone: string;
  feedback: string;
  rating: number;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({
  phone,
  feedback,
  rating,
}) => {
  return (
    <Box
      border={1}
      borderRadius={5}
      borderColor="primary.main"
      p={2}
      mt={2}
      textAlign={"left"}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Typography variant="body1">Phone: {phone}</Typography>
      <Typography variant="body1">Feedback: {feedback}</Typography>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Grid item>
          <Typography variant="body1">Rating:</Typography>
        </Grid>
        <Grid item>
          <Rating name="read-only" value={rating} precision={0.5} readOnly />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeedbackItem;
