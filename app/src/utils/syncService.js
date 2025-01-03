import { getAsyncItem, removeAsyncItem } from './asyncStorageService';
import NetInfo from '@react-native-community/netinfo';

const API_URL = 'https://example.com/api';

export const syncLocalDataToDatabase = async () => {
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
  if (!isConnected) return;

  try {
    const localData = await getAsyncItem('localData');
    if (localData) {
      const response = await fetch(`${API_URL}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localData),
      });

      if (response.ok) {
        await removeAsyncItem('localData');
        console.log('Data synced successfully');
      }
    }
  } catch (error) {
    console.error('Error syncing data to the database', error);
  }
};
