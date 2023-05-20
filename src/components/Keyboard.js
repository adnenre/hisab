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
          total += letter.value;
          newSelectedLetters.push(letter);
        }
      }
      setSelectedLetter(newSelectedLetters);
      setTextAreaValueNumber(total);
    } catch (error) {
      alert('يرجى استعمال احرف عربية غير مشكولة');
    }
  };
  useEffect(() => {
    calcTotal();
  }, [textAreaValue.length]);
  useEffect(() => {
    textAreaRef.current.focus();
  }, []);
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

      <p className="screen_number"> {textAreaValueNumber}</p>

      <div className="letters_container">
        {initialData?.map(({ item, value }) => (
          <div key={item} className="letter_container">
            <input
              className="letter_input"
              value={value}
              type="number"
              name={item}
              onChange={handleChange}
            />
            <p className="letter_input">{item}</p>
          </div>
        ))}
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
