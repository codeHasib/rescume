"use client";

import { Delete, Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";

export function DeleteModal({ petId, handleDelete, petName }) {
  return (
    <Modal>
      <Button variant="danger">Remove Listing</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <Delete></Delete>
              </Modal.Icon>
            </Modal.Header>
            <Modal.Body>
              <p>
                This delete can be undone. Are you sure you want to remove{" "}
                <strong className="text-white">{petName}</strong>?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(petId)}
                variant="danger"
                className="w-full"
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
