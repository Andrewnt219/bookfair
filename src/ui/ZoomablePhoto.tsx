import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDialog } from '../utils';

export interface ZoomablePhotoProps {
  src: string;
  alt?: string;
}

export const ZoomablePhoto = ({ src, alt }: ZoomablePhotoProps) => {
  const dialog = useDialog();

  return (
    <div>
      <button
        type="button"
        onClick={dialog.open}
        title="Zoom image"
        className="border-0 bg-transparent p-0"
      >
        <img className="square-img" alt={alt} src={src} />
      </button>

      <Modal size="lg" centered show={dialog.isOpen} onHide={dialog.close}>
        <Modal.Body>
          <img className="w-100" alt={alt} src={src} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={dialog.close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
