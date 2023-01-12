import { useState } from 'react';
import CryptoJS from "crypto-js";
import FormPlainText from '../components/FormPlainText';

const ciphers = [
  'DES',
  '3DES',
  'AES',
  'Rabbit',
];

function Home() {
  const [inputEncrypt, setInputEncrypt] = useState('');
  const [outputEncrypt, setOutputEncrypt] = useState('');
  const [inputDecrypt, setInputDecrypt] = useState('');
  const [outputDecrypt, setOutputDecrypt] = useState('');
  const [keyEncrypt, setKeyEncrypt] = useState('');
  const [keyDecrypt, setKeyDecrypt] = useState('');
  const [cypher, setCypher] = useState('');

  const handleChange = ({target}) => {
    if (target.name === 'inputEncryption') {
      setInputEncrypt(target.value);
    }
    else if (target.name === 'inputDecryption') {
      setInputDecrypt(target.value);
    }
    else if (target.name === 'keyEncryption') {
      setKeyEncrypt(target.value);
    }
    else if (target.name === 'keyDecryption') {
      setKeyDecrypt(target.value);
    }
  };

  const handleClick = ({target}) => {
    if (cypher) {
      cypher.classList.remove('selected');
    }
    target.classList.add('selected');
    console.log(target.parentElement);
    setCypher(target);
  };

  const encryptClick = () => {
    let ciphertext = 'Select a cipher first';
    if (cypher) {
      switch (cypher.innerHTML) {
        case 'AES':
          ciphertext = CryptoJS.AES.encrypt(inputEncrypt, keyEncrypt).toString();
          break;
        case 'DES':
          ciphertext = CryptoJS.DES.encrypt(inputEncrypt, keyEncrypt).toString();
          break;
        case '3DES':
          ciphertext = CryptoJS.TripleDES.encrypt(inputEncrypt, keyEncrypt).toString();
          break;
        case 'Rabbit':
          ciphertext = CryptoJS.Rabbit.encrypt(inputEncrypt, keyEncrypt).toString();
          break;
        default:
          break;
      }
    }
    setOutputEncrypt(ciphertext);
  };

  const decryptClick = () => {
    let bytes = null;
    switch (cypher.innerHTML) {
      case 'AES':
        bytes = CryptoJS.AES.decrypt(inputDecrypt, keyDecrypt);
        break;
      case 'DES':
        bytes = CryptoJS.DES.decrypt(inputDecrypt, keyDecrypt);
        break;
      case '3DES':
        bytes = CryptoJS.TripleDES.decrypt(inputDecrypt, keyDecrypt);
        break;
      case 'Rabbit':
        bytes = CryptoJS.Rabbit.decrypt(inputDecrypt, keyDecrypt);
        break;
      default:
        break;
    }
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText);
    if (originalText) {
      setOutputDecrypt(originalText);
    } else {
      setOutputDecrypt('Check the input and the key or make sure the correct cipher is selected');
    }
  };

  return (
    <div className="App">
        <h2 className="title">Cryptography Translator</h2>

        <div>
          <h3 className='cipher-title'>Select the cipher</h3>

          <div className="ciphers">
          { ciphers.map((item, index) => (
            <button
              key={index}
              type="button"
              className="cipher"
              onClick={ handleClick }
            >
              {item}
            </button>
          )) }
          </div>
        </div>

        <div className="forms">
          <FormPlainText
            title="Encryption"
            change={ handleChange }
            state={ outputEncrypt }
            click={ encryptClick }
          />

          <FormPlainText
            title="Decryption"
            change={ handleChange }
            state={ outputDecrypt }
            click={ decryptClick }
          />
        </div>

    </div>
  );
}

export default Home;
