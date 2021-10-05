import React, { useEffect, useState, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import axios from "axios";
import { atom, useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

// Styles  𐂂
const SRow = styled(Col)``;
// Styles 𐂂
// Title Input 𐂂
const TInput = styled.textarea`
  // Title Input 𐂂

  display: block;
  margin: 120px auto -24px auto;
  min-width: 650px;
  max-width: 650px;

  border-width: 0px;

  resize: none;
  overflow: inherit;

  font-size: 1.8em;
  font-weight: 700;

  overflow-wrap: break-word;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: gray !important;
    opacity: 0.3 !important;
  }
`;
// Description Input 𐂂
const DInput = styled.textarea`
  // Description Input 𐂂

  display: block;

  min-width: 650px;
  max-width: 650px;

  overflow-wrap: break-word;

  resize: none;

  border-width: 0px;

  margin: 0px auto 24px auto;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: gray !important;
    opacity: 0.3 !important;
  }
`;
// Price Input 𐂂
const PInput = styled.input`
  border-width: 0px;

  margin: 0px auto 0px 6px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: gray !important;
    opacity: 0.3 !important;
  }
`;
// Price Container 𐂂
const SDiv = styled.div`
  display: block;
  min-width: 650px;
  max-width: 650px;
  margin: 0px auto 24px auto;
`;

// Spawns the Editor 𐂂
const editor = new EditorJS({
  holder: "editorjs",
  placeholder: "This is an empty text block. Fill it in...",
});

editor.isReady
  .then(() => {
    console.log("Editor.js is ready to work!");
    /** Do anything you need after editor initialization */
  })
  .catch((reason) => {
    console.log(`Editor.js initialization failed because of ${reason}`);
  });

// Recoil Atoms 𐂂
const isTypingState = atom({
  key: "isTypingState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
const FirePostRequest = atom({
  key: "FirePostRequest", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
const SaveContentState = atom({
  key: "SaveContentState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

function CEditor() {
  // Useform boilerplate 𐂂
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Request 𐂂
  const Key = "XQaLAlXqrl5Xzf95iFy+1JC1sR+QNGqf";

  // Meta Data 𐂂
  const [Author, setAuthor] = useState(null);
  const [Title, setTitle] = useState(null);
  const [Description, setDescription] = useState(null);
  const [Price, setPrice] = useState(null);

  // Editor State 𐂂
  const [EState, setEState] = useState(null);

  // Fire Events 𐂂
  const [Fire, setFire] = useRecoilState(FirePostRequest);
  const [SaveContent, setSaveContent] = useRecoilState(SaveContentState);
  const [isTyping, setIsTyping] = useRecoilState(isTypingState);

  // Refs 𐂂
  const formRef = useRef();

  // Save the editor's current state as a string 𐂂
  const SaveEditor = () => {
    editor.save().then((outputData) => {
      setEState(btoa(JSON.stringify(outputData.blocks)));
    });
  };

  // Connect Phantom and get the author's public key 𐂂
  const DefineAuthor = () => {
    window.solana.connect();
    window.solana.on("connect", () => {
      setAuthor(window.solana.publicKey.toString());
    });
  };

  const SaveMeta = (data) => {
    setTitle(data.title);
    setDescription(data.description);
    setPrice(data.price);
  };

  const MakeRequest = () => {
    axios
      .post("https://api.cntn.xyz/add_article/", {
        api_key: Key,
        content: EState,
        metadata: [
          {
            author: Author,
            title: Title,
            description: Description,
            price: Price,
          },
        ],
      })
      .then(function (response) {
        if (response.status === 200) {
          toast.success(
            "Content was published. You are now being sent to the preview page.",
            {
              duration: 1500,
              position: "top-right",
              style: {
                margin: "-7px 0px 0px 0px",
              },
            }
          );
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                (window.location.href =
                  window.location.origin +
                  window.location.pathname.replace(
                    "new",
                    "previewer/" + response.data.article_id
                  ))
              );
            }, 1300);
          });
        } else {
          toast.error("Couldn't post please try again.", {
            position: "bottom-right",
            duration: 3000,
          });
        }
      });
  };

  // Save editor state and meta data 𐂂
  useEffect(() => {
    if (SaveContent === true) {
      formRef.current.requestSubmit();
      SaveEditor();
      setSaveContent(false);
    }
  }, [SaveContent]);

  // Once evrything is saved trigger a POST request 𐂂
  useEffect(() => {
    if (Fire === true && Author === null) {
      DefineAuthor();
    }
    if (Fire === true && Author !== null) {
      MakeRequest();
      setFire(false);
    }
  }, [Fire, Author]);

  // Detects if user is typing 𐂂
  const HideButton = () => {
    setIsTyping(true);
  };
  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(setIsTyping(false));
      }, 2500);
    });
  }, [isTyping]);
  return (
    <SRow>
      <form ref={formRef} onSubmit={handleSubmit(SaveMeta)}>
        <TInput
          placeholder="Give this article a short title"
          autocomplete="off"
          {...register("title")}
        />
        <DInput
          placeholder="Brifly describe your article. Description and the title are availible to readers before unlocking the article."
          autocomplete="off"
          {...register("description")}
        />
        <SDiv>
          <label>Consumption Price SOL </label>
          <PInput
            placeholder="0.0014"
            autocomplete="off"
            {...register("price")}
          />
        </SDiv>
      </form>
    </SRow>
  );
}

export default CEditor;
