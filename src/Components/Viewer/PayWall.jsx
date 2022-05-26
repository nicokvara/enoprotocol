import React, { useEffect, useState, useCallback } from "react";
import Content from "./Content";
import axios from 'axios';
import Pay from "../../Functions/Pay";
import useSWR from "swr";
import { atom, useRecoilState } from "recoil";
import dynamic from "next/dynamic";
import SignMsg from "../../Functions/SignMsg";
import { useRouter } from "next/router";
import { IsAuthorRequest } from '../Previewer/InformationContainer'

// Disabled SSR 𐂂
const Loader = dynamic(() => import("../../../src/Components/Loader.jsx"), {
  ssr: false
});

function PayWall({Payer, SignedAddress, payData, depositStatusLink}) {
  const [Paid, setPaid] = useState(false);
  const [IsAuthor, setIsAuthor] = useRecoilState(IsAuthorRequest);
  const [authorChecked, setAuthorChecked] = useState(false)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [signedAddress, setSignedAddress] = useState(null);
  const [depositStatus, setDepositStatus] = useState(null);

  const router = useRouter();
  const { PID } = router.query;

  // Pay function 𐂂
  useEffect(() => {
    if (Payer !== null && payData && !IsAuthor && authorChecked) {
      Pay(
        payData.cost_deposit_address,
        payData.cost_data.total_sum
      )
    } else if (IsAuthor) {
      setPaid(true);
    }
  }, [Payer, payData, IsAuthor, authorChecked]);

  // Проверяем статус депозита. Если тру значит оплачено
  useEffect(() => {
    if (depositStatus === true) {
      setPaid(depositStatus)
    }
    const interval = setInterval(() => {
      if (!depositStatus && depositStatusLink) {
        axios.get(`https://${depositStatusLink}`)
          .then(res => {
            setDepositStatus(res.data.status)
            if (res.data.status) {
              setPaid(true)
              clearInterval(interval)
            }
          })
          .catch(err => console.log(err))
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [depositStatusLink])

  // Запрашиваем подпись если заплачено
  useEffect(() => {
    if (PID && Paid === true) {
      try {
        window.solana.connect();
        window.solana.on("connect", async () => {
          const signAddress = await SignMsg(window.solana.publicKey.toString(), window.solana.signMessage, PID);
          setSignedAddress(signAddress);
        });
      } catch (error) {
        console.log(error);
      } 
    }
  }, [PID, Paid]);


  // Если заплачено и подпись есть запрашиваем статью
  useEffect(() => {
    if (Payer && signedAddress && PID && Paid) {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/articles/${PID}/`, {
        data: signedAddress,
        _bn: window.solana.publicKey["_bn"]
      })
        .then(res => setData(res.data))
        .catch(err => setError(err))
    }
  }, [Payer, signedAddress, PID, Paid])

  const checkAuthority = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/validate_author/`, {
        article: PID,
        author: window?.solana?.publicKey?.toString()
      })
      .then(res => {
        setIsAuthor(res.data.success);
        setAuthorChecked(true)
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (!IsAuthor) setTimeout(() => checkAuthority(PID, window?.solana?.publicKey?.toString()), 100);
  }, []);

  if (error) return <div>failed to load</div>; // Page loading state 𐂂
  if (!data) return <Loader Title="Loading Viewer" Description="Please wait" />; // Page error state 𐂂

  return (
    <>
      {(Paid !== false && data) && <Content data={data} error={error} payer={Payer} SignedAddress={SignedAddress} />}
      {Paid === false && (
        <Loader
          Title="Payment Authorization Requested"
          Description="Refresh the page to try again"
        />
      )}
    </>
  );
}

export default PayWall;
