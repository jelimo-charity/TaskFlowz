import Axios from "axios";
import { apiDomain } from "../utils/utils";

export const createNotification = async (userData, notificationData) => {
  try {
    const response = await Axios.post(`${apiDomain}/notifications`, notificationData, {
      headers: {
        Authorization: `${userData.token}`,
      },
    });
    // console.log("Notification created:", response.data);
    // alert("Notification created!");  
    
    return response.data;
  } catch (error) {
    console.error("Error creating notification:", error.message);
    throw error;
  }
};
