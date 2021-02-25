import React from "react";
import { dataSize } from "./../utils/constants";

function Header({ handleData, searchInTable }) {
  const filtredTable = (evt) => {
    searchInTable(evt.target.value);
  };

  return (
    <>
      <div>
        <button
          className="btn btn-outline-primary m-3"
          onClick={() => handleData(dataSize.small)}
        >
          {dataSize.small} записей
        </button>
        <button
          className="btn btn-outline-secondary m-3"
          onClick={() => handleData(dataSize.big)}
        >
          {dataSize.big} записей
        </button>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Введите данные для фильтрации таблицы"
          onChange={filtredTable}
        />
      </div>
    </>
  );
}

export default Header;
