import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeList from './RecipeList';
import '../css/app.css';
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (recipeJSON == null || JSON.parse(recipeJSON).length === 0)
      return sampleRecipes;
    else return JSON.parse(recipeJSON);
  });
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const handleRecipeAdd = () => {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: '1',
      cookTime: '',
      instructions: '',
      ingredients: [
        {
          id: uuidv4(),
          name: '',
          amount: '',
        },
      ],
    };

    handleRecipeSelect(newRecipe.id)

    setRecipes([...recipes, newRecipe]);
  };

  const handleRecipeDelete = (id) => {
    if (id !== null && selectedRecipeId === id)
      setSelectedRecipeId(undefined)

    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id);
  };

  const handleRecipeChange = (id, recipe) => {
    const newRecipes = [...recipes]

    const index = newRecipes.findIndex(recipe => recipe.id === id)

    newRecipes[index] = recipe

    setRecipes(newRecipes)
  }

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  };

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
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
        id: uuidv4(),
        name: 'Chicken',
        amount: '2 Pounds',
      },
      {
        id: uuidv4(),
        name: 'Salt',
        amount: '1 Tbs',
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Plain Pork',
    cookTime: '0: 45',
    servings: 5,
    instructions: `1. Put paprika on chicken\n2.Put pork in oven\n3.Eat pork`,
    ingredients: [
      {
        id: uuidv4(),
        name: 'Pork',
        amount: '3 Pounds',
      },
      {
        id: uuidv4(),
        name: 'Paprika',
        amount: '2 Tbs',
      },
    ],
  },
];

export default App;
