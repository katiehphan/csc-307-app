import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th> {/* Added ID Column */}
        <th>Name</th>
        <th>Job</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody({ characterData, removeCharacter }) {
  const rows = characterData.map((row) => (
    <tr key={row.id}> {/* Using row.id instead of index */}
      <td>{row.id}</td> {/* Display User ID */}
      <td>{row.name}</td>
      <td>{row.job}</td>
      <td>
        <button onClick={() => removeCharacter(row.id)}>Delete</button> {/* Use ID for deletion */}
      </td>
    </tr>
  ));

  return <tbody>{rows}</tbody>;
}

function Table({ characterData, removeCharacter }) {
  return (
    <table>
      <TableHeader />
      <TableBody characterData={characterData} removeCharacter={removeCharacter} />
    </table>
  );
}

export default Table;
