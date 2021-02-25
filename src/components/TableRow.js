import React from "react";
import { tableName } from "../utils/constants";

function TableRow(props) {
  const { id, firstName, lastName, email, phone } = tableName;

  return props.items.length > 0 ? (
    <table className="table table-bordered table-striped border border-secondary ">
      <thead className="thead-dark">
        <tr className="cursor-pointer">
          <th scope="col" onClick={() => props.requestSort(id)}>
            <div
              className={`position-relative ${
                props.getClassNamesFor(id)
                  ? props.getClassNamesFor(id)
                  : "arrow-hidden"
              }`}
            >
              {id}
            </div>
          </th>

          <th scope="col" onClick={() => props.requestSort(firstName)}>
            <div
              className={`position-relative ${
                props.getClassNamesFor(firstName)
                  ? props.getClassNamesFor(firstName)
                  : "arrow-hidden"
              }`}
            >
              {firstName}
            </div>
          </th>

          <th scope="col" onClick={() => props.requestSort(lastName)}>
            <div
              className={`position-relative ${
                props.getClassNamesFor(lastName)
                  ? props.getClassNamesFor(lastName)
                  : "arrow-hidden"
              }`}
            >
              {lastName}
            </div>
          </th>

          <th scope="col" onClick={() => props.requestSort(email)}>
            <div
              className={`position-relative ${
                props.getClassNamesFor(email)
                  ? props.getClassNamesFor(email)
                  : "arrow-hidden"
              }`}
            >
              {email}
            </div>
          </th>

          <th scope="col" onClick={() => props.requestSort(phone)}>
            <div
              className={`position-relative ${
                props.getClassNamesFor(phone)
                  ? props.getClassNamesFor(phone)
                  : "arrow-hidden"
              }`}
            >
              {phone}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.items[props.page].map((item, index) => (
          <tr className="border border-secondary" key={index}>
            <th scope="row">{item.id}</th>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;
}

export default TableRow;
