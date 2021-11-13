import React, { useEffect, useState, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import axios from "axios";
import { atom, useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Error from "./Error";
import TextareaAutosize from "react-textarea-autosize";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import Pay from "../../Functions/Pay";

// Styles  𐂂
const SRow = styled(Col)``;

// Title Input 𐂂
const TInput = styled(TextareaAutosize)`
  // Title Input 𐂂

  display: block;
  margin: 120px auto 0px auto;
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
const DInput = styled(TextareaAutosize)`
  // Description Input 𐂂
  display: block;

  margin: 24px auto 0px auto;

  min-width: 650px;
  max-width: 650px;

  overflow-wrap: break-word;

  resize: none;

  border-width: 0px;

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

  margin: 24px auto 0px 6px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: gray !important;
    opacity: 0.3 !important;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  -moz-appearance: textfield; /* Firefox */
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
  placeholder: "Write something...",

  tools: {
    image: SimpleImage,

    header: {
      class: Header,
      shortcut: "CMD+SHIFT+H",
      inlineToolbar: true,

      config: {
        placeholder: "Enter a header",
        levels: [2, 3, 4],
        defaultLevel: 2
      }
    }
  }
});

editor.isReady
  .then(() => {
    console.log("Editor.js is ready to work!");
    /** Do anything you need after editor initialization */
  })
  .catch(reason => {
    console.log(`Editor.js initialization failed because of ${reason}`);
  });

// Recoil Atoms 𐂂
const isTypingState = atom({
  key: "isTypingState", // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});
const FirePostRequest = atom({
  key: "FirePostRequest", // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});
const SaveContentState = atom({
  key: "SaveContentState", // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});

function CEditor({ fee }) {
  // Useform boilerplate 𐂂
  const {
    register,
    handleSubmit,
    formState: { errors }
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
    editor.save().then(outputData => {
      setEState(
        btoa(unescape(encodeURIComponent(JSON.stringify(outputData.blocks))))
      );
    });
  };

  // Connect Phantom and get the author's public key 𐂂
  const DefineAuthor = () => {
    window.solana.connect();
    window.solana.on("connect", () => {
      setAuthor(window.solana.publicKey.toString());
    });
  };

  const SaveMeta = data => {
    setTitle(data.title);
    setDescription(data.description);
    setPrice(data.price);
  };

  const MakeRequest = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/add_article/`, {
        api_key: Key,
        content: EState,
        metadata: [
          {
            author: Author,
            title: Title,
            description: Description,
            price: Price
          }
        ]
      })
      .then(function(response) {
        if (response.status === 200) {
          toast.success(
            "Content was published. The token will show up in your wallet briefly.",
            {
              duration: 1500,
              position: "top-right",
              style: {
                margin: "-7px 0px 0px 0px"
              }
            }
          );
          new Promise(resolve => {
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
            duration: 3000
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
      Pay(window.solana.publicKey, 0.00000000001).then(res => {
        if (res) {
          MakeRequest();
        }
      });
      setFire(false);
    }
  }, [Fire, Author]);

  // Detects if user is typing 𐂂
  const HideButton = () => {
    setIsTyping(true);
  };

  useEffect(() => {
    new Promise(resolve => {
      setTimeout(() => {
        resolve(setIsTyping(false));
      }, 250);
    });
  }, [isTyping]);

  return (
    <SRow>
      <form ref={formRef} onSubmit={handleSubmit(SaveMeta)}>
        <TInput
          placeholder="Give this article a short title"
          autocomplete="off"
          name="title"
          {...register("title", {
            required: true,
            maxLength: 120
          })}
        />
        {errors.title && (
          <Error msg="Description is required. Not longer than 120 Latin characters. No emojis." />
        )}
        <DInput
          placeholder="Brifly describe your article. Description and the title are availible to readers before unlocking the article."
          autocomplete="off"
          {...register("description", {
            required: true,
            maxLength: 250
          })}
        />
        {errors.description && (
          <Error msg="Description is required. Not longer than 250 Latin characters. No emojis." />
        )}
        <SDiv>
          <label>Consumption Price SOL </label>
          <PInput
            placeholder="0.0014"
            autocomplete="off"
            {...register("price", {
              required: true,
              maxLength: 15,
              min: 0.0
            })}
            type="number"
            onWheel={e => e.target.blur()}
            min="0"
            step="any"
          />
          {errors.price && (
            <Error msg="Please add a price. Price should be a number, if you are feeling generous it can be 0." />
          )}
        </SDiv>
      </form>
    </SRow>
  );
}

export default CEditor;
