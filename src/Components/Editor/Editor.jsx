import React, { useEffect, useState, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import axios from "axios";
import { atom, useRecoilState } from "recoil";
// import dynamic from "next/dynamic";
// import Spinner from "../../../public/Assets/Animations/Spinner.jsx";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Error from "./Error";
import TextareaAutosize from "react-textarea-autosize";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import Image from "next/image";
import Pay from "../../Functions/Pay";
import SOLIcon from "../../../public/Assets/SOLIcon.svg";

// Styles  𐂂
const SRow = styled(Col)``;

// const EditorPlaceholder = styled.span`
//   position: absolute;
//   left: 25%;
//   cursor: text;
// `;

const InfoText = styled.p`
  font-family: 'IBM Plex Mono', monospace;
  margin: 20px auto 0px auto;
  margin-bottom: 0;
  min-width: 697px;
  max-width: 697px;
  padding-bottom: 24px;
  background: rgba(248, 249, 250, 1);
  padding: 8px 16px;
  border-radius: 6px;
  margin-bottom: 24px;
`;

const Form = styled.form`
  border: 1px solid #CED4DA;
  border-radius: 6px;
  min-width: 697px;
  max-width: 697px;
  margin: 24px auto 32px auto;
  padding: 19px;
`;

const BoldText = styled.span`
  font-family: "Space Mono", monospace;
  font-weight: bold;
`;

// Title Input 𐂂
const TInput = styled(TextareaAutosize)`
  // Title Input 𐂂

  display: block;
  margin: 0px auto 0px auto;
  width: 100%;
  box-sizing: border-box;


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

  width: 100%;
  box-sizing: border-box;

  overflow-wrap: break-word;

  resize: none;

  border-width: 0px;
  border-bottom: 1px solid #E9ECEF;
  padding-bottom: 28px;

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
  width: 57px;
  margin: 0px auto 0px 15px;

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
  min-width: 697px;
  max-width: 697px;
  margin: 24px auto 3px auto;
`;

const SLabel = styled.div`
  border-right: 1px solid rgba(33, 37, 41, 0.16);
  padding-right: 20px;
`

const PDiv = styled.div`
  width: 394px;
  display: flex;
  align-items: center;
  border: 1px solid #f6f6f5;
  padding-left 12px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-top: 7px;
  border-radius: 5px;
`

// export const redactorPlaceholderFix = () => {
//   const nodes = document.querySelectorAll('.ce-paragraph')
//   nodes.forEach((el, i) => {
//     if (nodes.length === 0 || i === nodes.length - 1) {
//       el.dataset.placeholder = 'Write something...'
//     }
//   })
// }

// const handleContentChange = async () => {
//   redactorPlaceholderFix()
// }

// Spawns the Editor 𐂂
const editor = new EditorJS({
  holder: "editorjs",
  placeholder: "Write something...",
  // onChange: handleContentChange,
  

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
    const content = JSON.parse(localStorage.getItem('content'));

    if (content && content.blocks.length > 0) {
      editor.render(content)
    }

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
const AuthorState = atom({
  key: "AuthorState", // unique ID (with respect to other atoms/selectors)
  default: null // default value (aka initial value)
});
const DefAuthorState = atom({
  key: "DefineAuthorState", // unique ID (with respect to other atoms/selectors)
  default: null // default value (aka initial value)
});

function CEditor() {
  // Useform boilerplate 𐂂
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  // Request 𐂂
  const Key = "XQaLAlXqrl5Xzf95iFy+1JC1sR+QNGqf";

  // Meta Data 𐂂
  const [Title, setTitle] = useState(null);
  const [Description, setDescription] = useState(null);
  const [Price, setPrice] = useState(null);
  const [checkPayLink, setCheckPayLink] = useState(null);
  const [payStatus, setPayStatus] = useState(false);
  const [payData, setPayData] = useState(null);
  const [articleId, setArticleId] = useState();
  // const [isShowPlaceholder, setIsShowPlaceholder] = useState(true);

  // Editor State 𐂂
  const [EState, setEState] = useState(null);

  // Fire Events 𐂂
  const [Fire, setFire] = useRecoilState(FirePostRequest);
  const [SaveContent, setSaveContent] = useRecoilState(SaveContentState);
  const [isTyping, setIsTyping] = useRecoilState(isTypingState);
  const [DefineAuthorState, setDefineAuthor] = useRecoilState(DefAuthorState);
  const [Author, setAuthor] = useRecoilState(AuthorState);
  let toastId;
  // Refs 𐂂
  const formRef = useRef();

  // Save the editor's current state as a string 𐂂
  const SaveEditor = () => {
    editor.save().then(outputData => {
      setEState(
        btoa(unescape(encodeURIComponent(JSON.stringify(outputData.blocks))))
      );
      localStorage.setItem(
        'content',
        JSON.stringify(outputData)
      );
    });
  };

  // Connect Phantom and get the author's public key 𐂂
  const DefineAuthor = async () => {
    setDefineAuthor(false);
    const resp = await window.solana.connect();
    setAuthor(resp.publicKey.toString());
  };

  const SaveMeta = data => {
    localStorage.setItem('meta', JSON.stringify({
      title: data.title,
      description: data.description,
      price: data.price
    }));

    setTitle(data.title);
    setDescription(data.description);
    setPrice(data.price);
  };

  const MakeRequest = () => {
    editor.save()
    localStorage.setItem('postData', JSON.stringify({
      content: EState,
      title: Title,
      description: Description,
      price: Price
    }));

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
          toastId = toast.loading(
            <span>Content is being published.</span>,
            {
              position: "bottom-right",
              style: {
                margin: "-7px 0px 0px 0px"
              }
            }
          );
          setCheckPayLink(`https://${response.data.cost_deposit_status}`)
          setPayData({
            wallet: response.data.cost_deposit_address,
            sum: response.data.cost_data.total_sum
          })
          setArticleId(response.data.article_id)
        } else {
          toast.error("Couldn't post please try again.", {
            position: "bottom-right",
            duration: 3000
          });
        }
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (payStatus) {
        toast.dismiss(toastId);
        toast.success(
          "Content was published. You are now being sent to the preview page.",
          {
            duration: 1500,
            position: "bottom-right",
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
                  "minting-in-progress/" + articleId
                ))
            );
          }, 1300);
        });

        clearInterval(interval)
      } else {
        axios.get(checkPayLink)
          .then(res => {
            setPayStatus(res.data.status);
          })
          .catch(err => console.log(err))
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [checkPayLink, payStatus]);

  useEffect(() => {
    if (payData && Author !== null) {
      Pay(
        payData.wallet,
        payData.sum
      );
    }
  }, [payData])
  const hiddenButtonRef = useRef(null)

  // Save editor state and meta data 𐂂
  useEffect(() => {      
    if (SaveContent === true) {
      // if (formRef.current.requestSubmit) {
      // formRef.current.requestSubmit();
      // }
      hiddenButtonRef.current.click();
      SaveEditor();
      setSaveContent(false);
    }
  }, [SaveContent]);

  // Once evrything is saved trigger a POST request 𐂂
  useEffect(() => {
    if (DefineAuthorState || (Fire === true && Author === null)) {
      DefineAuthor();
    }
    if (Fire === true && Author !== null) {
      MakeRequest();
      setFire(false);
    }
  }, [Fire, Author, DefineAuthorState]);

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

  useEffect(() => {
    const meta = JSON.parse(localStorage.getItem('meta'));

    if (meta) {
      setValue('title', meta.title)
      setValue('description', meta.description)
      setValue('price', meta.price)
    }
  }, [])

  return (
    <SRow>
      <InfoText>
        <BoldText>Please note</BoldText>, the token creation fee for this article is 0.0119862 SOL. 
        The fees include creation of token metadata and master edition mint. 
        The eno.xyz interface fee is SOL 0.
      </InfoText>
      <Form ref={formRef} onSubmit={handleSubmit(SaveMeta)}>
        <TInput
          placeholder="Give this article a short title"
          autoComplete="off"
          name="title"
          {...register("title", {
            required: true,
            maxLength: 100
          })}
        />
        {errors.title && (
          <Error msg="Description is required. Not longer than 100 Latin characters. No emojis." />
        )}
        <DInput
          placeholder="Brifly describe your article. Description and the title are availible to readers before unlocking the article."
          autoComplete="off"
          {...register("description", {
            required: true,
            maxLength: 200
          })}
        />
        {errors.description && (
          <Error msg="Description is required. Not longer than 200 Latin characters. No emojis." />
        )}
        <SDiv>
          <PDiv>
            <SLabel>Set a Consumption Price in SOL</SLabel>
            <PInput
              placeholder="0.0014"
              autoComplete="off"
              {...register("price", {
                required: false,
                maxLength: 15,
                // min: 0.0001
              })}
              type="number"
              onWheel={e => e.target.blur()}
              // min="0.0001"
              step="any"
            />
            <Image alt="SOL" src={SOLIcon} width={12} height={12} />
            {errors.price && (
              <Error msg="Minum price 0.0001. Price should be a number, if you are feeling generous it can be 0." />
            )}
          </PDiv>
        </SDiv>
        <input type="submit" style={{ display: 'none' }} ref={hiddenButtonRef} />
      </Form>
      <InfoText>
        Start typing the article content below. This part will only be accessible to readers 
        who unlock your content by paying the consumption fee
      </InfoText>
      {/* {isShowPlaceholder &&
        <EditorPlaceholder onClick={() => setIsShowPlaceholder(false)}>Write something...</EditorPlaceholder>
      } */}
    </SRow>
  );
}

export default CEditor;
