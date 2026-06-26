import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Pagination,
  Box,
} from "@mui/material";

import NotificationFilter from "../components/NotificationFilter";
import useNotifications from "../hooks/useNotifications";
import { sortByPriority } from "../utils/priority";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [viewed, setViewed] = useState([]);

  const { notifications, loading, error } = useNotifications();

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">
          Failed to load notifications.
        </Alert>
      </Container>
    );
  }

  // Filter
  const filteredNotifications =
    filter === ""
      ? notifications
      : notifications.filter(
          (item) => item.Type === filter
        );

  // Priority
  const priorityNotifications =
    sortByPriority(filteredNotifications).slice(0, 10);

  // Pagination
  const limit = 10;

  const start = (page - 1) * limit;

  const currentNotifications =
    filteredNotifications.slice(
      start,
      start + limit
    );

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>

      <Typography
        variant="h4"
        align="center"
        gutterBottom
      >
        Notification Center
      </Typography>

      <NotificationFilter
        value={filter}
        onChange={setFilter}
      />

      {/* Priority Notifications */}

      <Typography
        variant="h5"
        sx={{ mt: 3, mb: 2 }}
      >
        Top Priority Notifications
      </Typography>

      {priorityNotifications.length === 0 ? (
        <Typography>No Priority Notifications</Typography>
      ) : (
        priorityNotifications.map((item) => (
          <Card
            key={"priority-" + item.ID}
            sx={{
              mb: 2,
              borderLeft: "6px solid red",
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {item.Type}
              </Typography>

              <Typography>
                {item.Message}
              </Typography>

              <Typography color="text.secondary">
                {item.Timestamp}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      {/* All Notifications */}

      <Typography
        variant="h5"
        sx={{ mt: 4, mb: 2 }}
      >
        All Notifications
      </Typography>

      {currentNotifications.length === 0 ? (
        <Typography align="center">
          No Notifications Found
        </Typography>
      ) : (
        currentNotifications.map((item) => (
          <Card
            key={item.ID}
            onClick={() => {
              if (!viewed.includes(item.ID)) {
                setViewed([...viewed, item.ID]);
              }
            }}
            sx={{
              mb: 2,
              cursor: "pointer",
              backgroundColor: viewed.includes(item.ID)
                ? "#eeeeee"
                : "#ffffff",
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {item.Type}
              </Typography>

              <Typography>
                {item.Message}
              </Typography>

              <Typography color="text.secondary">
                {item.Timestamp}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      <Box
        display="flex"
        justifyContent="center"
        mt={4}
      >
        <Pagination
          page={page}
          count={Math.ceil(filteredNotifications.length / limit)}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>

    </Container>
  );
}