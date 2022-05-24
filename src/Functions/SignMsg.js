import bs58 from 'bs58';

async function SignMsg (publicKey, signMessage, msg) {
  try {
    // `publicKey` will be null if the wallet isn't connected
    if (!publicKey) {
      console.error("Wallet not connected!")
      return false
    }
    // `signMessage` will be undefined if the wallet doesn't support it
    if (!signMessage) {
      console.error("Wallet does not support message signing!")
      return false
    }

    // Encode anything as bytes
    const message = new TextEncoder().encode(msg)

    // Sign the bytes using the wallet
    const signature = await signMessage(message)
    
    // console.log(`Message signature: ${bs58.encode(signature.signature)}`)
    return bs58.encode(signature.signature)
  } catch (error) {
    console.log(`Signing failed: ${error?.message}`)
    return false
  }
}

export default SignMsg;