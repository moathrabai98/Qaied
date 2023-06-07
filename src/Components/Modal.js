import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";

const Backdrop = () => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        zIndex: "10",
        background: "rgba(0, 0, 0, 0.75)",
      }}
    ></div>,
    document.getElementById("backdrop-root")
  );
};

export const RemoveModal = props => {

  return ReactDOM.createPortal(
    <React.Fragment>
      <Backdrop />
      <div className="row">
        <div className="offset-md-2 offset-lg-4">
          <Modal.Dialog
            className="mb-5"
            style={{
              position: "fixed",
              top: "30vh",
              overflow: "hidden",
              zIndex: "100",
            }}
          >
            <Modal.Header>
              <Modal.Title style={{color:"white"}}>
              "  هل انت متأكد من حذف 
                <strong> "{props.productName}</strong>
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <label className="form-label"></label>

              <Button
                variant="secondary"
                className="mt-4 me-2"
                onClick={props.close}
              >
                إالغاء
              </Button>
              <Button
                variant="danger"
                className="mt-4"
                onClick={props.remove}
               
              >
                حذف
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById("modal-root")
  );
};

