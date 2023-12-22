import React, { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import { Typography, Button, Box, Container } from "@mui/material";
import { backendCall } from "../../helper/axios";

interface FeedbackItem {
  phoneNumber: string;
  text: string;
  rating: number;
}

const FeedbackList: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<FeedbackItem[]>([]);
  const [loadMore, setLoadMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      try {
        const response = await backendCall("get", "/feedback/");
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback items:", error);
      }
    };

    fetchFeedbackItems();
  }, []); // Fetch items on component mount

  useEffect(() => {
    // Display the first 5 items
    setVisibleItems(feedbackData.slice(0, 5));
  }, [feedbackData]);

  const handleLoadMore = () => {
    // Load the next 5 items
    const nextIndex = visibleItems.length + 5;
    const nextItems = feedbackData.slice(0, nextIndex);
    setVisibleItems(nextItems);

    // Check if there are more items to load
    if (nextIndex >= feedbackData.length) {
      setLoadMore(false);
    }
  };

  return (
    <Container maxWidth={"sm"}>
      <Box textAlign="center">
        <Typography
          variant="h1"
          gutterBottom
          style={{
            textAlign: "center",
            fontSize: "2rem", // Responsive font size
          }}
        >
          Feedback List
        </Typography>
        {visibleItems.map((feedback, index) => (
          <FeedbackItem
            key={index}
            phone={feedback.phoneNumber}
            feedback={feedback.text}
            rating={feedback.rating}
          />
        ))}
        <Box display="flex" justifyContent="center" marginTop="10px">
          {loadMore && (
            <Button
              onClick={handleLoadMore}
              variant="contained"
              color="primary"
            >
              Load More
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default FeedbackList;
