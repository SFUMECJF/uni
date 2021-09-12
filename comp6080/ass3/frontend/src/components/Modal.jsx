/**
 * Holds all Modal and things associated with modal
 */
import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Given a title string and content element,
 * will show a modal to the user that overlaps everything
 * @param {Objectr} props requires title, content element and bool show
 * @returns JSXElement modal
 */
export function CustomModal (props) {
  const [show, setShow] = useState(props.show);
  const title = props.title;
  const content = props.content;

  // handle close function toggle
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <ModalTitle>{title}</ModalTitle>
        </Modal.Header>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button id='modalCloseButton' className='btn-secondary' onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

CustomModal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  show: PropTypes.bool.isRequired,
}
