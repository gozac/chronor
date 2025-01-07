import React from "react";

export default function Filter({ users, onFilterChange }) {
  return (
    <select onChange={(e) => onFilterChange(e.target.value)}>
      <option value="">All Users</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
