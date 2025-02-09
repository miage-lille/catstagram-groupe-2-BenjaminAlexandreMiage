import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { FetchCatsRequest } from './types/actions.type';
import { Picture } from './types/picture.type';

export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    () => {
      return fetch(action.path, {
        method: action.method,
      }).then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        console.log("la");
        const picture: Picture[] = data.hits.map((hit: any) => ({
            previewFormat: hit.previewURL,
            webFormat: hit.webformatURL,
            author: hit.user,
            largeFormat: hit.largeImageURL,
        }));
        return picture;
      });
    },
    {
      successActionCreator: fetchCatsCommit, // (equals to (payload) => fetchCatsCommit(payload))
      failActionCreator: fetchCatsRollback, // (equals to (error) => fetchCatsCommit(error))
    },
  );

const checkStatus = (response: Response) => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};
