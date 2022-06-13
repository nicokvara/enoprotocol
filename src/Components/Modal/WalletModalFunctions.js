import toast from "react-hot-toast";

/*
  const [Author, setAuthor] = useRecoilState(AuthorPK);

  const DefineAuthor = () => {
    window.solana.connect();
    window.solana.on("connect", () => {
      setAuthor(window.solana.publicKey.toString());
    });
  };
  */

export const Connect = async handleClose => {
  try {
    await window.solana.connect();
    handleClose();
  } catch (error) {
    console.log(error);
    if (window.solana === undefined) {
      toast.error("Install Phantom Wallet and try again.", {
        duration: 2500,
        position: "bottom-right"
      });
      console.log("Phantom is not installed or can't be found");
    }
  }
};
export const Install = () => {
  window.open("https://phantom.app/", "_blank");
};

export const DefineAuthor = () => {};

export const ConnectAndDefine = () => {};
