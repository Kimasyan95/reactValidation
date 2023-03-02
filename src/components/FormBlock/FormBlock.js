import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Inputmask from "inputmask";

import "./formBlock.scss";

import { useInput } from "../hooks/validation.hook";

const FormBlock = (props) => {
  const [data, setData] = useState({});
  const [globalDirty, setGlobalDirty] = useState(false);

  const name = useInput("", "name", data, setData, {
    required: true,
    symbols: true,
  });
  const surname = useInput("", "surname", data, setData, { symbols: true });
  const sex = useInput("", "sex", data, setData, { required: true });
  const phone = useInput("", "phone", data, setData, { phone: true });
  const email = useInput("", "email", data, setData, {
    required: true,
    email: true,
  });
  const date = useInput("", "date", data, setData, { required: false });
  const country = useInput("", "country", data, setData, { required: false });
  const address = useInput("", "address", data, setData, { required: false });

  const accessibility = Math.round(Math.random());

  const validattion = email.inputValid && name.inputValid && sex.inputValid;

  useEffect(() => {
    Inputmask({
      mask: "+7 (###) ###-##-##",
      placeholder: "_",
      clearMaskOnLostFocus: false,
    }).mask(".form__phone");
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    setGlobalDirty(true);

    if (validattion) {
      setGlobalDirty(false);

      if (accessibility) {
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({
            ...data,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then(props.onModalOpen("Успешно отправлено!"));
      } else {
        props.onModalOpen("Что-то пошло не так, попробуйте повторить");
      }
    }
  };

  const addresStyle =
    country.value !== "Выбрать из списка"
      ? { display: "block" }
      : { display: "none" };

  return (
    <div className="form__wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={onSubmit} className="form">
              <h1 className="text-center mb-4">Введите свои данные</h1>
              <div className="row">
                <div className="col-lg-6">
                  <Form.Group className="form__group mb-3">
                    <Form.Label>Имя</Form.Label>
                    <Form.Label className="form__error">
                      {name.isDirty || globalDirty ? name.errorMessage : null}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Иван"
                      value={name.value}
                      onChange={name.onChange}
                      onBlur={name.onBlur}
                    />
                  </Form.Group>
                  <Form.Group className="form__group mb-3">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Label className="form__error">
                      {surname.isDirty || globalDirty
                        ? surname.errorMessage
                        : null}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="surname"
                      placeholder="Иванов"
                      value={surname.value}
                      onChange={surname.onChange}
                      onBlur={surname.onBlur}
                    />
                  </Form.Group>
                  <Form.Group className="form__group mb-3">
                    <Form.Label>Пол</Form.Label>
                    <Form.Check
                      type="radio"
                      name="sex"
                      label="Муж"
                      value="Муж"
                      checked={sex.value === "Муж" ? true : false}
                      onChange={sex.onChange}
                    />
                    <Form.Check
                      type="radio"
                      name="sex"
                      label="Жен"
                      value="Жен"
                      checked={sex.value === "Жен" ? true : false}
                      onChange={sex.onChange}
                    />
                    {globalDirty && sex.errorMessage ? (
                      <Form.Label className="form__error form__error_static">
                        {sex.errorMessage}
                      </Form.Label>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="form__group mb-3">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Label className="form__error">
                      {phone.isDirty || globalDirty ? phone.errorMessage : null}
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder=""
                      inputMode="tel"
                      className="form__phone"
                      value={phone.value}
                      onChange={phone.onChange}
                      onBlur={phone.onBlur}
                    />
                  </Form.Group>
                </div>
                <div className="col-lg-6">
                  <Form.Group className="form__group mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Label className="form__error">
                      {email.isDirty || globalDirty ? email.errorMessage : null}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="example@email.com"
                      value={email.value}
                      onChange={email.onChange}
                      onBlur={email.onBlur}
                    />
                  </Form.Group>
                  <Form.Group className="form__group mb-3">
                    <Form.Label>Дата рождения</Form.Label>
                    <Form.Control
                      min="1950-01-01"
                      max="3000-01-01"
                      type="date"
                      name="date"
                      value={date.value}
                      onChange={date.onChange}
                    />
                  </Form.Group>
                  <Form.Group className="form__group mb-3">
                    <Form.Label>Страна</Form.Label>
                    <Form.Select
                      name="country"
                      onChange={country.onChange}
                      value={country.value}
                    >
                      <option>Выбрать из списка</option>
                      <option value="Россия">Россия</option>
                      <option value="США">США</option>
                      <option value="Австралия">Австралия</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="form__group form__address mb-3"
                    style={addresStyle}
                  >
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="example str"
                      value={address.value}
                      onChange={address.onChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-12">
                  <Button
                    type="submit"
                    className="form__button btn btn-primary"
                  >
                    Отправить
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBlock;
