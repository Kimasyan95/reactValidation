import { useState, useEffect } from "react";

const useInput = (initialValue, inputName, data, setData, validations) => {
  const [isDirty, setDirty] = useState(false);

  const initial = localStorage.getItem(inputName)
    ? localStorage.getItem(inputName)
    : initialValue;

  // для redux
  useEffect(() => {
    setData((data) => ({
      ...data,
      [inputName]: localStorage.getItem(inputName),
    }));
  }, []);

  const [value, setValue] = useState(initial);

  const onChange = (e) => {
    setValue(e.target.value);
    setData((data) => ({ ...data, [e.target.name]: e.target.value })); // для redux
    localStorage.setItem(inputName, e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  const valid = useValidation(value, validations);

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValid, setInputValid] = useState(false);

  const symbols = "!;:'><.,][}{&*)(%$#@";
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "required":
          if (value.length < 1) {
            setErrorMessage("Поле обязтаельное");
            setEmpty(true);
          } else {
            setErrorMessage("");
            setEmpty(false);
          }

          break;
        case "symbols":
          value.split("").forEach((el) => {
            symbols.includes(el)
              ? setErrorMessage("Поле не должно содержать символы")
              : setErrorMessage("");
          });
          break;
        case "phone":
          value.replace(/[^\d]/g, "").length < 11 &&
          value.replace(/[^\d]/g, "").length > 0
            ? setErrorMessage("Введите корректный номер")
            : setErrorMessage("");
          break;
        case "email":
          if (!emailRegex.test(value) && value.length > 0) {
            setErrorMessage("Введите корректный E-mail");
          }
          break;
        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (errorMessage || isEmpty) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [errorMessage, isEmpty]);

  return {
    isEmpty,
    errorMessage,
    inputValid,
  };
};

export { useInput, useValidation };
