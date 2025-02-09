import { Option, some, none } from 'fp-ts/Option';
import { Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment, SelectPicture, CloseModal } from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (counter : number): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: `https://pixabay.com/api/?key=48661366-fe3a10488a8e8940a296a9e6a&q=cat&per_page=${counter}`,
}); // TODO : Update this value !

export const fetchCatsCommit = (payload: Picture[]): FetchCatsCommit => ({ type: 'FETCH_CATS_COMMIT', payload });

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });

export const selectPicture = (previewFormat: String | null): SelectPicture => ({
  type: 'SELECT_PICTURE',
  payload: previewFormat ? some(previewFormat) : none,
});

export const closeModal = (): CloseModal => ({
  type: 'CLOSE_MODAL',
});