import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeList from './RecipeList';
import '../css/app.css';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';

function App() {
  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (recipeJSON == null || JSON.parse(recipeJSON).length === 0)
      return sampleRecipes;
    else return JSON.parse(recipeJSON);
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const handleRecipeAdd = () => {
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: '1',
      instructions: '1 Tbs',
      ingredients: [
        {
          id: uuidv4(),
          name: 'New',
          amount: '1 Tbs',
        },
      ],
    };

    setRecipes([...recipes, newRecipe]);
  };

  const handleRecipeDelete = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
  };

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    cookTime: '1: 45',
    servings: 3,
    instructions: `1. Put salt on chicken\n2.Put chicken in oven\n3.Eat chicken`,
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds',
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs',
      },
    ],
  },
  {
    id: 2,
    name: 'Plain Pork',
    cookTime: '0: 45',
    servings: 5,
    instructions: `1. Put paprika on chicken\n2.Put pork in oven\n3.Eat pork`,
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Pounds',
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs',
      },
    ],
  },
];

export default App;
