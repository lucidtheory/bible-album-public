import { handleResponse, handleError } from 'api/Response';
import { getAppCheckHeaders } from 'lib/firebaseAppCheck';
import api from './api';

export const getBooks = async (): Promise<any> => {
  try {
    const appCheckHeaders = await getAppCheckHeaders();
    const response = await api.get('/books', appCheckHeaders);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getBook = async (id: string): Promise<any> => {
  try {
    const appCheckHeaders = await getAppCheckHeaders();
    const response = await api.get(`/books/${id}`, appCheckHeaders);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
