import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import WalletModalContent from "./WalletModalContent";
import { atom, useRecoilState } from "recoil";
import Blur from "./Blur";

// Recoil Atoms 𐂂
export const UserPKState = atom({
  key: "UserPK", // unique ID (with respect to other atoms/selectors)
  default: null // default value (aka initial value)
});

export const showState = atom({
  key: "Show", // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});

function WalletModal() {
  // const [show, setShow] = useState(false);
  const [show, setShow] = useRecoilState(showState);


  const [UserPK, setUserPK] = useRecoilState(UserPKState);

  // const isPhantomInstalled = window.solana && window.solana.isPhantom;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async () => {
    if (window.solana && !UserPK) {
      try {
        // Fix it in mobile
        window.solana.connect({ onlyIfTrusted: true });
        window.solana.on("connect", () => {
          setUserPK(window.solana.publicKey.toString());
          handleClose();
        });

        // const resp = await window.solana.connect({ onlyIfTrusted: true });
        // setUserPK(resp.publicKey.toString());
        // handleClose();
      } catch (error) {
        console.log(error);
      }
    }
  }, [window.solana]);

  useEffect(() => {
    try {
      if (UserPK !== null) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <WalletModalContent handleClose={handleClose} />
      </Modal>
      <Blur />
    </>
  );
}

export default WalletModal;
