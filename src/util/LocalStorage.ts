import AsyncStorage from '@react-native-community/async-storage';
import { OperationResult, OperationStatus } from '../constant/localStorage';

const putItem = async (
  key: string,
  value: string,
): Promise<OperationResult> => {
  try {
    await AsyncStorage.setItem(key, value);
    return { status: OperationStatus.SUCCESS };
  } catch (error) {
    return { status: OperationStatus.FAILURE, error };
  }
};

export const getItem = async (key: string): Promise<OperationResult> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return { status: OperationStatus.SUCCESS, value };
  } catch (error) {
    return { status: OperationStatus.FAILURE, error };
  }
};

export const removeItem = async (key: string): Promise<OperationResult> => {
  try {
    await AsyncStorage.removeItem(key);
    return { status: OperationStatus.SUCCESS };
  } catch (error) {
    return { status: OperationStatus.FAILURE, error };
  }
};
