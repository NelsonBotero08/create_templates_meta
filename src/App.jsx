import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faBold, faItalic, faCode, faStrikethrough } from '@fortawesome/free-solid-svg-icons';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [variables, setVariables] = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [lastVariableNumber, setLastVariableNumber] = useState(0);
  const [variableSequenceError, setVariableSequenceError] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef(null);

  const applyFormat = (format) => {
    const cursorStart = textareaRef.current.selectionStart;
    const cursorEnd = textareaRef.current.selectionEnd;
    const selectedText = value.substring(cursorStart, cursorEnd);
    let newValue = value.substring(0, cursorStart);
    switch (format) {
      case 'bold':
        newValue += `*${selectedText}*`;
        setIsBold(!isBold);
        break;
      case 'italic':
        newValue += `_${selectedText}_`;
        setIsItalic(!isItalic);
        break;
      case 'strikethrough':
        newValue += `~${selectedText}~`; 
        setIsStrikethrough(!isStrikethrough);
        break;
      case 'code':
        newValue += "```" + selectedText + "```"
        setIsCode(!isCode);
        break;
      default:
        break;
    }
    newValue += value.substring(cursorEnd);
    setValue(newValue);
    textareaRef.current.focus();
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    setCharacterCount(newValue.length);
    setInputText(newValue); // Update inputText with the current value
  };

  useEffect(() => {
    setLastVariableNumber(Math.max(...variables, 0));
  }, [variables]);

  useEffect(() => {
    const regex = /\{\{(\d+)\}\}/g;
    const matchedVariables = [];
    const unmatchedPatterns = [];
    let match;
    while ((match = regex.exec(value)) !== null) {
      const variableNumber = parseInt(match[1]);
      if (!isNaN(variableNumber) && variableNumber > 0) {
        matchedVariables.push(variableNumber);
      } else {
        unmatchedPatterns.push(match[0]);
      }
    }
    setVariables([...new Set(matchedVariables)]);

    const expectedSequence = [...Array(matchedVariables.length + 1).keys()].slice(1);
    const missingVariables = expectedSequence.filter(x => !matchedVariables.includes(x));

    if (missingVariables.length > 0) {
      setVariableSequenceError(true);
    } else {
      setVariableSequenceError(false);
    }

  }, [value]);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
    setIsPickerVisible(false);
  };

  useEffect(() => {
    if (selectedEmoji !== null) {
      const cursorPosition = textareaRef.current.selectionStart;
      const newValue = value.substring(0, cursorPosition) + selectedEmoji + value.substring(cursorPosition);
      setValue(newValue);
      setCharacterCount(newValue.length);
      setSelectedEmoji(null);
    }
  }, [selectedEmoji]);

  useEffect(() => {
    if (isPickerVisible) {
      textareaRef.current.focus();
    }
  }, [isPickerVisible]);

  useEffect(() => {
    setInputText(value);
  }, [value]);

  const handleAddVariable = () => {
    let nextVariable = 1;
    for (nextVariable = 1; nextVariable <= variables.length + 1; nextVariable++) {
      if (!variables.includes(nextVariable)) {
        const newVariable = `{{${nextVariable}}}`;
        setValue(value + newVariable);
        setVariableSequenceError(false);
        return;
      }
    }

    const expectedSequence = [...Array(variables.length + 1).keys()].slice(1);
    const missingVariables = expectedSequence.filter(x => !variables.includes(x));

    if (missingVariables.length > 0) {
      setVariableSequenceError(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const textAreaValue = event.target.value;
      const cursorPosition = event.target.selectionStart;

      const lines = textAreaValue.split('\n');
      const currentLineNumber = textAreaValue.substr(0, cursorPosition).split('\n').length;
      const textBeforeCursor = lines[currentLineNumber - 1];

      if (textBeforeCursor.trim() !== '') {
        const newValue = textAreaValue.substring(0, cursorPosition) + '\n' + textAreaValue.substring(cursorPosition);
        setValue(newValue);
        event.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      } else {
        if (cursorPosition === textAreaValue.length) {
          event.target.setSelectionRange(cursorPosition, cursorPosition);
        }
      }
    }
  };

  const parseTextToHtml = (text) => {
    // Reemplaza saltos de línea con etiquetas <br>
    let htmlText = text.replace(/\n/g, "<br>");
  
    // Reemplaza *texto* con <strong>texto</strong>
    htmlText = htmlText.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
    // Reemplaza _texto_ con <em>texto</em>
    htmlText = htmlText.replace(/_(.*?)_/g, "<em>$1</em>");
    // Reemplaza ~texto~ con <strike>texto</strike>
    htmlText = htmlText.replace(/~(.*?)~/g, "<strike>$1</strike>");
    // Reemplaza ```texto``` con <code>texto</code>
    htmlText = htmlText.replace(/```(.*?)```/g, "<code>$1</code>");
  
    return htmlText;
  };
  

  return (
    <>
      <div className="container">
        <article className="article--contain__template">
          <section className="section__create--template">
            <h2 className="title__create--template">
              Ingresar Texto para la plantilla
            </h2>
            <div className="div__create--template">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="textarea__create--template"
                name=""
                id="textarea__create"
                rows="8"
                cols="30"
                maxLength="1072"
                onClick={() => textareaRef.current.focus()}>
              </textarea>
              <div className="character-counter" id="character-counter">
                {characterCount}/1072
              </div>
            </div>
            <div className="div__variables">
              <div className="adicionales__text">
                <button onClick={() => setIsPickerVisible(!isPickerVisible)}>
                  <FontAwesomeIcon className="emojis" icon={faSmile} />
                </button>
                <button onClick={() => applyFormat('bold')} style={{ fontWeight: isBold ? 'bold' : 'normal' }}>
                  <FontAwesomeIcon icon={faBold} />
                </button>
                <button onClick={() => applyFormat('italic')} style={{ fontStyle: isItalic ? 'italic' : 'normal' }}>
                  <FontAwesomeIcon icon={faItalic} />
                </button>
                <button onClick={() => applyFormat('strikethrough')} style={{ textDecoration: isStrikethrough ? 'line-through' : 'none' }}>
                  <FontAwesomeIcon icon={faStrikethrough} />
                </button>
                <button onClick={() => applyFormat('code')}>
                  <FontAwesomeIcon icon={faCode} />
                </button>
              </div>
              <button
                className="btn__add--variable"
                onClick={handleAddVariable}
              >
                Agregar Variable
              </button>
            </div>
            <div className={isPickerVisible ? "visibility" : "noVisibility"}>
              <Picker data={data} onEmojiSelect={(emoji) => handleEmojiSelect(emoji)} />
            </div>
            {variableSequenceError && (
              <div className="error-message">
                <p>
                  ¡Error! Ha generado variables saltándose los consecutivos.{" "}
                  {variables.map((variable) => `{{${variable}}}`).join(", ")}
                </p>
              </div>
            )}
            <section className="section__label--input">
              {variables.length > 0 && (
                <div className="mensaje__variables">
                  <p>Para ayudarnos a revisar tu plantilla de mensaje, añade un ejemplo para cada variable en el texto del cuerpo. No uses información real de los clientes. La API revisa las plantillas y los parámetros de las variables para proteger la seguridad y la integridad de los servicios.</p>
                </div>
              )}
              {variables
                .sort((a, b) => a - b)
                .map((variable, index) => (
                  <div className="div__label--input" key={variable}>
                    <label htmlFor={`variable-${variable}`}>{`{{${variable}}}`}</label>
                    <input id={`variable-${variable}`} placeholder={`introduce contenido para ${variable}`} type="text" />
                  </div>
                ))}
            </section>
          </section>
          <section className="section__create--template2">
                <h2 className="title__create--template">Vista Previa</h2>
                <div className="view_preview">
                  <div
                  className="preview"
                  dangerouslySetInnerHTML={{ __html: parseTextToHtml(inputText) }}
                  />
                </div>
              
          </section>
        </article>
      </div>
    </>
  );
}

export default App;
