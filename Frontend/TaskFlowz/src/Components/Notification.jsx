import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { apiDomain } from '../utils/utils';
import { Context } from '../context/userContext/Context';

function Notification() {
  const { user } = useContext(Context); // Access user data from context
  const [notifications, setNotifications] = useState([]);

  const getUserNotifications = async () => {
    try {
      const response = await Axios.get(`${apiDomain}/notifications`, {
        headers: { Authorization: `${user.token}` },
      });
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserNotifications();
  }, []);

  return (
    <div className="notify_page">
      <h2 className="notify_title">Notifications</h2>

      <div className="notification_wrapper">
        {notifications.length > 0 && (
          <div className="clear_notifications">
            {/* Here you can implement the functionality to clear notifications */}
            {/* <button onClick={handleDeleteNotification}>Clear notifications</button> */}
          </div>
        )}

        <ol className="ordered_list">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => {
              return (
                <div className="notifications_content" key={index}>
                  <li>{notification.Content}</li>
                </div>
              );
            })
          ) : (
            <div className="no_notifications">
              No notifications at the moment🙁
            </div>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Notification;
