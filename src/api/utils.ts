import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Observable, PartialObserver } from 'rxjs';

import environment from 'api/environment';

export const apiUriInterceptor = (request: AxiosRequestConfig) => {
  const { apiUrl } = environment;

  if (request?.url?.startsWith('backend://') && apiUrl) {
    request.url = request.url.replace(
      'backend://',
      apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`
    );
  }

  return request;
};

export const getAsObservable = (url: string, config?: AxiosRequestConfig) =>
  Observable.create((observer: PartialObserver<AxiosResponse>) => {
    const cancelToken = axios.CancelToken.source();

    axios
      .get(url, {
        cancelToken: cancelToken.token,
        ...config
      })
      .then(
        (result) => {
          observer.next?.(result);
          observer.complete?.();
        },
        (error) => {
          if (axios.isCancel(error)) {
            observer.complete?.();
          } else {
            observer.error?.(error);
          }
        }
      );

    return () => cancelToken.cancel();
  });
