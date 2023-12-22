import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme();

export function FeedbackRoute() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={2}>
        <FeedbackForm />
      </Box>
      <Box marginTop={4} marginBottom={4}>
        <FeedbackList />
      </Box>
    </ThemeProvider>
  );
}
