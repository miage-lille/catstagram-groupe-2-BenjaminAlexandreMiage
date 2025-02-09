import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSelectedPicture, picturesSelector } from '../reducer';
import ModalPortal from './modal';
import { Option, some, none, isSome } from 'fp-ts/Option';
import { selectPicture } from '../actions';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;
const Pictures = () => {

  const dispatch = useDispatch();
  const pictures = useSelector(picturesSelector);
  const selectedPicture = useSelector(getSelectedPicture);
  
  return (
    <>
      <Container>
        {pictures.map((pic) => (
          <Image
            key={pic.previewFormat}
            src={pic.previewFormat}
            onClick={() => dispatch(selectPicture(pic.previewFormat))}
          />
        ))}
      </Container>
    
      {selectedPicture && (
        <ModalPortal
          largeFormat={selectedPicture.previewFormat} // Utilise `largeFormat` de ta donnée
          author={selectedPicture.author}
          close={() => dispatch(selectPicture(null))}  // Ferme la modale
        />
      )}

    </>
  );
};

export default Pictures;
