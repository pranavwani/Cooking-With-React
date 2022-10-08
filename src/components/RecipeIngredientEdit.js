import React from 'react';

export default function RecipeIngredientEdit(props) {
  const { id, name, amount, handleIngredientChange, handleIngredientRemove } =
    props;

  const handleChange = (change) => {
    handleIngredientChange(id, change);
  };

  return (
    <>
      <input
        className="recipe-edit__input"
        type="text"
        value={name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <input
        className="recipe-edit__input"
        type="text"
        value={amount}
        onChange={(e) => handleChange({ amount: e.target.value })}
      />
      <button
        className="btn btn--danger"
        onClick={() => handleIngredientRemove(id)}
      >
        &times;
      </button>
    </>
  );
}
