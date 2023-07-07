import AsyncStorage from '@react-native-async-storage/async-storage';
import {CachingService} from '../../src/services/CachingService';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('CachingService', () => {
  beforeEach(() => {
    AsyncStorage.setItem.mockClear();
    AsyncStorage.getItem.mockClear();
  });

  it('should set fetched users data in AsyncStorage', async () => {
    const usersData = [
      {age: 1, name: 'Mohamed'},
      {age: 2, name: 'Amer'},
    ];
    await CachingService.setFetchedUsersData(usersData);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'fetchedUsersData',
      JSON.stringify(usersData),
    );
  });

  it('should get fetched users data from AsyncStorage', async () => {
    const usersData = [
      {age: 1, name: 'Mohamed'},
      {age: 2, name: 'Amer'},
    ];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(usersData));
    const fetchedUsersData = await CachingService.getFetchedUsersData();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('fetchedUsersData');
    expect(fetchedUsersData).toEqual(usersData);
  });

  it('should return an empty array when fetched users data is not available', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const fetchedUsersData = await CachingService.getFetchedUsersData();
    expect(fetchedUsersData).toEqual([]);
  });

  it('should set last datetime for fetching users in AsyncStorage', async () => {
    await CachingService.setLastDateTimeFetchingUsers();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'lastDateTimeFetchingUsers',
      expect.any(String),
    );
  });

  it('should return true when caching threshold is reached', async () => {
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() + 2);
    const thresholdExceededDateTime = currentDateTime.toISOString();

    AsyncStorage.getItem.mockResolvedValueOnce(thresholdExceededDateTime);

    const result = await CachingService.isCachingThresholdReached();

    expect(result).toBe(true);
  });

  it('should return false when caching threshold is not reached', async () => {
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() - 1);
    const thresholdExceededDateTime = currentDateTime.toISOString();

    AsyncStorage.getItem.mockResolvedValueOnce(thresholdExceededDateTime);

    const result = await CachingService.isCachingThresholdReached();

    expect(result).toBe(false);
  });
});
