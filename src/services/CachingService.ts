import AsyncStorage from '@react-native-async-storage/async-storage';

export const CachingThresholdHours = 1;

const cachingStorageKeys = {
  fetchedUsersData: 'fetchedUsersData',
  lastDateTimeFetchingUsers: 'lastDateTimeFetchingUsers',
};

export const CachingService = {
  setFetchedUsersData: async (usersData: any) => {
    await AsyncStorage.setItem(
      cachingStorageKeys.fetchedUsersData,
      JSON.stringify(usersData),
    );
  },
  getFetchedUsersData: async () => {
    const fetchedUsersData = await AsyncStorage.getItem(
      cachingStorageKeys.fetchedUsersData,
    );

    if (!fetchedUsersData) {
      return [];
    }

    return JSON.parse(fetchedUsersData);
  },
  setLastDateTimeFetchingUsers: async () => {
    await AsyncStorage.setItem(
      cachingStorageKeys.lastDateTimeFetchingUsers,
      new Date().toISOString(),
    );
  },
  isCachingThresholdReached: async () => {
    const currentDateTime = new Date().toISOString();
    const lastDateTimeFetchingUsers = await AsyncStorage.getItem(
      cachingStorageKeys.lastDateTimeFetchingUsers,
    );

    if (!lastDateTimeFetchingUsers) {
      return true;
    }
    const differenceInMilliseconds =
      new Date(lastDateTimeFetchingUsers).valueOf() -
      new Date(currentDateTime).valueOf();

    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    return differenceInHours > CachingThresholdHours;
  },
};
