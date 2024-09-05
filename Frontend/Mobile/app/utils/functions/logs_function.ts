import { url } from "../url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const postLogs = async (error: any) => {
  try {
    const user = await AsyncStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;

    const formattedError = {
      message: error.message || 'Unknown error',
      stack: error.stack || '',
      url: error.config?.url || 'No URL',
      method: error.config?.method || 'No method',
      user: parsedUser ? parsedUser.email : 'Unknown user',
      timestamp: new Date().toISOString(),
    };

    console.log('Formatted Error:', formattedError);

    const response = await fetch(`${url.api_gateway}/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedError)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.text();
    console.log('Log sent successfully:', data);
    return data;
  } catch (loggingError) {
    console.error('Error sending log:', loggingError);
    throw loggingError;
  }
};
