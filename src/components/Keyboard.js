import { useEffect, useState, useRef } from "react";
import data from "../data";
const Keyboard = () => {
  const textAreaRef = useRef(null);
  const [selectedLetter, setSelectedLetter] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [textAreaValueNumber, setTextAreaValueNumber] = useState(0);
  const [initialData, setData] = useState(data);

  const handleChange = (e) => {
    const { value, name } = e.target;
    const objIndex = initialData.findIndex((obj) => obj.item == name);
    const newState = [...initialData];
    newState[objIndex].value = value;

    setData(newState);
  };

  // change text area
  const handlechangeTextArea = (e) => {
    setTextAreaValue(e.target.value);
    // calcTotal();
  };

  // handle click keys
  const handleClickKeys =
    ({ item, value }) =>
    (e) => {
      setTextAreaValue(textAreaValue.concat(item));
      setSelectedLetter([...selectedLetter, { item, value }]);
    };

  const calcTotal = () => {
    let total = 0;
    let newSelectedLetters = [];
    try {
      if (textAreaValue) {
        for (let i = 0; i < [...textAreaValue].length; i++) {
          let letter = data.find((l) => l.item === [...textAreaValue][i]);
          total += parseInt(letter.value);
          console.log(total)
          newSelectedLetters.push(letter);
        }
      }
      setSelectedLetter(newSelectedLetters);
      setTextAreaValueNumber(total);
    } catch (error) {
      alert("يرجى استعمال احرف عربية غير مشكولة");
    }
  };
  useEffect(() => {
    calcTotal();
  }, [textAreaValue.length]);
  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  function getSumOfDigits(num) {
    return String(num)
      .split('')
      .reduce((accumulator, digit) => {
        return accumulator + Number(digit);
      }, 0);
  }
  return (
    <div className="app_container">
      <textarea
        ref={textAreaRef}
        className="screen"
        value={textAreaValue}
        onChange={handlechangeTextArea}
        rows={5}
        cols={5}
      />

      <p className="screen_number"> {textAreaValueNumber} :المجموع</p>

      <p className="screen_number"> {getSumOfDigits(textAreaValueNumber)} :بالاختزال</p>

      <div className="left_side">
        <div className="letters_container">
        {initialData?.filter(item => item.group === 1).map(({ name ,item, value }) => {
          if (name !== "space") {
            return (
                <>
              {item === "ي" || item=="ق" || item ==='غ' ? <br/> :null}
              <div key={item} className="letter_container">
              
                <p className="letter_input">{item}</p>
                <br/>
                <input
                  className="letter_input"
                  value={value}
                  type="number"
                  name={item}
                  onChange={handleChange}
                />
              </div>
              </>
            );
          }
        })}
        </div>
      </div>
      <div className="keyboard">
        {initialData?.map(({ name, item, value }) => {
          if (name === "space") {
            return (
              <div className="keyboard_row">
                <br />
                <button
                  key={"space"}
                  className={"keyboard_key key_space"}
                  onClick={handleClickKeys({ item, value })}
                >
                  {item}
                </button>
              </div>
            );
          }
          return (
            <button
              key={item}
              className={"keyboard_key"}
              onClick={handleClickKeys({ item, value })}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
