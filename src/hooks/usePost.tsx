import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import axiosInstance from '../config/axios';

type CallbackFunction<T> = (data: T) => void;
type UsePostHookReturnType<T> = [T, (data: T) => Promise<void>];

function usePost<T>(
  url: string,
  initialState: T,
  callback?: CallbackFunction<T>
): UsePostHookReturnType<T> {
  const [data, setData] = useState<T>(initialState);

  async function postData(payload: T): Promise<void> {
    console.log(payload);
    const result: AxiosResponse<T> = await axiosInstance.post(url, payload);
    const responseData = result.data;

    if (callback) {
      callback(responseData);
    }

    setData(responseData);
  }

  return [data, postData];
}

export default usePost;
