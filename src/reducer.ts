import { Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import {Picture} from './types/picture.type';
import { state } from 'fp-ts';
import fakeDatas from './fake-datas.json';
import { Option, some, none, isSome } from 'fp-ts/Option';
import { Actions } from './types/actions.type';
import { cmdFetch } from './commands';
import { fetchCatsRequest } from './actions';
import { Success, Loading, Failure } from './types/api.type';
import { failure, loading, success } from './api';

export type State = {
  counter: number,
  pictures: Picture[],
  select_picture: Option<String>;
  apiState: Success | Loading | Failure;
};

export const defaultState : State = {
  counter: 0,
  pictures: [],
  select_picture: none,
  apiState : loading(),
};

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      const newCompteur = state.counter + 1;
      return loop({ 
        ...state, 
        counter: newCompteur,
        pictures: fakeDatas.slice(0,newCompteur)
      },
      cmdFetch(fetchCatsRequest(newCompteur))
    );
    case 'DECREMENT':
      if(state.counter<=3){ return state }
      else { 
        const newCompteur = state.counter - 1;
        return loop({ 
          ...state, 
          counter: newCompteur,
          pictures: fakeDatas.slice(0, newCompteur),
        },
        cmdFetch(fetchCatsRequest(newCompteur))
      ); 
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
    case 'FETCH_CATS_REQUEST':
      return loop(
        {
        ...state,
        apiState: loading()
      },
      cmdFetch(fetchCatsRequest(state.counter)));
    case 'FETCH_CATS_COMMIT':
      return {
        ...state,
        apiState: success(action.payload),
        pictures: action.payload
      };
    case 'FETCH_CATS_ROLLBACK':
      return {
        ...state,
        apiState: failure(action.error.message)
      };
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
