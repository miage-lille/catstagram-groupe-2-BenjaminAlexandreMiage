import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import {Picture} from './types/picture.type';
import { state } from 'fp-ts';
import fakeDatas from './fake-datas.json';
import { Option, some, none, isSome } from 'fp-ts/Option';

export type State = {
  counter: number,
  pictures: Picture[],
  select_picture: Option<String>;
};

export const defaultState : State = {
  counter: 0,
  pictures: [],
  select_picture: none,
};

type Increment = { type: 'INCREMENT' };
type Decrement = { type: 'DECREMENT' };
type SelectPicture = { type: "SELECT_PICTURE"; payload: Option<String> };
type CloseModal =  { type : "CLOSE_MODAL"};

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });
export const selectPicture = (previewFormat: String | null ): SelectPicture => ({
  type: "SELECT_PICTURE",
  payload: previewFormat ? some(previewFormat) : none,
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
        select_picture: none,
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
  if(isSome(state.select_picture)){
    const selectedPreviewFormat = state.select_picture.value;
    return state.pictures.find((picture) => picture.previewFormat === selectedPreviewFormat) || null;
  }
  return null;
};

export default compose(liftState, reducer);
