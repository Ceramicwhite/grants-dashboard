import { useState } from "react";
import styles from "./Input.module.css";
import { validateStacksAddress } from "@stacks/transactions";

export function isValidURL(string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

export function isValidEmail(string) {
  if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(string)) {
    return true;
  }
  return false;
}

export function isValidStxAddress(string) {
  return validateStacksAddress(string);
}

const Input = (props) => {
  const {
    name,
    label,
    labelSize,
    labelColor,
    description,
    maxChar,
    pageWidth,
    placeholder,
    height,
    image,
    paddingBottom,
  } = props;

  console.log("height", height);

  const [value, setValue] = useState("");

  function setColor(field, color) {
    field.style.outlineColor = color;
    field.style.borderColor = color;
  }

  function handleChange(event) {
    let field = event.target;
    const { name, value } = field;

    if (!(value.length > maxChar)) {
      setValue(value);
    }

    if (value.length == undefined || value.length == "") {
      setColor(field, "red");
    } else {
      switch (name) {
        case "wishlistGithub":
        case "referenceLink":
          if (isValidURL(value)) {
            setColor(field, "#3182ce");
          } else {
            setColor(field, "red");
          }
          break;
        case "email":
          if (isValidEmail(value)) {
            setColor(field, "#3182ce");
          } else {
            setColor(field, "red");
          }
          break;
        case "stxAddress":
          if (isValidStxAddress(value)) {
            setColor(field, "#3182ce");
          } else {
            setColor(field, "red");
          }
          break;
        default:
          setColor(field, "#3182ce");
          break;
      }
    }
  }

  let width;

  switch (pageWidth) {
    case "full":
      width = "750px";
      break;
    case "half":
      width = "360px";
      break;
    default:
      width = "750px";
      break;
  }

  return (
    <div style={{ maxWidth: width }} className={styles.fieldWrapper}>
      <div className={styles.title}>
        <label style={{ color: labelColor, fontSize: labelSize }}>
          {label}
        </label>
        {maxChar && (
          <div className={styles.progressWrapper}>
            <p>{maxChar - value.length} characters</p>
            <div className={styles.progressBar}>
              <div
                style={{ width: `${(value.length / maxChar) * 100}%` }}
                className={styles.filler}
              />
            </div>
          </div>
        )}
      </div>

      {height == undefined ? (
        <div style={{ position: "relative", paddingBottom }}>
          <input
            autoComplete="false"
            name={name}
            style={{ width, height }}
            onChange={(event) => handleChange(event)}
            className={styles.input}
            placeholder={placeholder ? placeholder : "Type here..."}
            value={value}
          />
          <div className={styles.inputImage}>{image ?? <image />}</div>
        </div>
      ) : (
        <textarea
          name={name}
          style={{ width, height }}
          onChange={(event) => handleChange(event)}
          className={styles.input}
          placeholder={placeholder ? placeholder : "Type here..."}
          value={value}
        />
      )}

      {description && (
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
