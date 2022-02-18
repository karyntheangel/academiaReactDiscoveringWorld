import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { DataContext } from "../context/DataContext";
import EntryForm from "./EntryForm";

const EntryModal = () => {
  const { showModal, setShowModal, setSelEntry, selEntry } =
    useContext(DataContext);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{selEntry.id ? "Edit Post" : "New Post"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EntryForm/>
      </Modal.Body>

  
    </Modal>
  );
};

export default EntryModal;
