import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import {Picture} from './types/picture.type';
import { state } from 'fp-ts';
import fakeDatas from './fake-datas.json';

export type State = {
  counter: number,
  pictures: Picture[],
  select_picture: string | null;
};

export const defaultState : State = {
  counter: 0,
  pictures: [],
  select_picture: null,
};

type Increment = { type: 'INCREMENT' };
type Decrement = { type: 'DECREMENT' };
type SelectPicture = { type: "SELECT_PICTURE"; payload: string | null };
type CloseModal =  { type : "CLOSE_MODAL"};

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });
export const selectPicture = (previewFormat: string | null ): SelectPicture => ({
  type: "SELECT_PICTURE",
  payload: previewFormat,
});
export const closeModal = (): CloseModal => ({ type: 'CLOSE_MODAL' });

type Actions =
  | Increment
  | Decrement
  | SelectPicture
  | CloseModal



export const reducer = (state: State | undefined, action: Actions): State => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      const newCompteur = state.counter + 1;
      return { 
        ...state, 
        counter: newCompteur,
        pictures: fakeDatas.slice(0,newCompteur)
      };
    case 'DECREMENT':
      if(state.counter<=3){ return state }
      else { 
        const newCompteur = state.counter - 1;
        return { 
          ...state, 
          counter: newCompteur,
          pictures: fakeDatas.slice(0, newCompteur),
        }; 
      }
    case 'SELECT_PICTURE':
      return {
        ...state,
        select_picture: action.payload,
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        select_picture: null
      };
    /*case 'FETCH_CATS_REQUEST':
      throw 'Not Implemented';
    case 'FETCH_CATS_COMMIT':
      throw 'Not Implemented';
    case 'FETCH_CATS_ROLLBACK':
      throw 'Not Implemented';*/
  }
};

export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  return state.pictures.find((picture) => picture.previewFormat === state.select_picture) || null
};

export default compose(liftState, reducer);
