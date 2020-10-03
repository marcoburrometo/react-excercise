import store from '../Redux/store';
import { logout } from '../Redux/user';

const apiUrl = 'https://reqres.in/api/';

const getAuthHeader = () => store.getState().user?.accessToken;

/**
 * fetch GET or DELETE. apiUrl is included.
 * @param url part of url after api url
 * @param ignoreToken if true there is no auth header. Default false.
 * @param isDelete if true the call will be a DELETE. default false.
 */
export const httpget = async (url: string, ignoreToken = false, isDelete = false) => {
  const authToken = getAuthHeader();
  if (!authToken && !ignoreToken) {
    console.error(`[GET] ${url} Unauthorized!`);
    store.dispatch(logout());
    return new Promise<Response>((_resolve) => null);
  }
  // eslint-disable-next-line consistent-return
  if (!authToken) return;
  const ret = fetch(apiUrl + url, {
    method: isDelete ? 'DELETE' : 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    } as any,
  });
  return ret;
};

/**
 * fetch POST, PATH or PUT. apiUrl is included.
 * @param url part of url after api url
 * @param body body part of the call
 * @param ignoreToken if true there is no auth header. Default false.
 * @param isPatch if true the call will be a PATCH. default false.
 * @param isPut if true the call will be a PUT. default false.
 */
export const httppost = async (url: string, body?: any, ignoreToken?: boolean, isPatch?: boolean, isPut?: boolean) => {
  const authToken = getAuthHeader();
  if (!authToken && !ignoreToken) {
    console.error('[POST] Unauthorized!');
    store.dispatch(logout());
    return new Promise<Response>((_resolve) => null);
  }
  // eslint-disable-next-line consistent-return
  if (!authToken && !ignoreToken) return;
  const ret = fetch(apiUrl + url, {
    method: isPut ? 'PUT' : isPatch ? 'PATCH' : 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    } as any,
  });
  return ret;
};
