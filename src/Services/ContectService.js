import axios from "axios";

export const SERVER_URL = "";

export const createTicket = (value, token) => {
  const url = `${SERVER_URL}/ticket/ticket/`;
  return axios.post(url, value, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMessages = async () => {
  try {
    const response = await axios.get("/api/ticket/messages");
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

// Function to send a new message
export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post("/api/ticket/messages", messageData);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};
