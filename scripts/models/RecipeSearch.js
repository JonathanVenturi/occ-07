import { RecipeCard } from '../views/RecipeCard.js'

export class RecipeSearch {

    constructor(recipes) {

        this.recipes = recipes;

        // Iniatialise tag lists with empty arrays
        this.tagList = { ingredients: [], appliances: [], ustensils: [] };
        this.activeTags = [];

        // Filter with empty string by default to populate tags
        this.searchString = '';
        this.filter();

    }

    search(searchString) {
        this.searchString = searchString.toLowerCase();
        this.filter();
    }

    filter() {

        // Reinitialise filtered recipes and tags
        this.filteredRecipes = [];
        this.tagList = { ingredients: [], appliances: [], ustensils: [] };

        this.recipes.forEach((recipe) => {

            // Checking if the recipe has the correct tags
            const isFilteredByTag = this.activeTags.every(tag => // will return true if no active tags or if either...
                recipe.appliance.toLowerCase() == tag // ... appliance match
                || recipe.ustensils.some(item => item.toLowerCase() == tag) // ... in the ustensils list
                || recipe.ingredients.some(item => item.ingredient.toLowerCase() == tag) // ... in the ingredients
            )

            const isFilteredByString = // Checking for search string
                this.searchString == '' // True if empty string - skip the other checks
                || ( // Otherwise check ...
                    recipe.name.toLowerCase().includes(this.searchString) // ... in recipe name
                    || recipe.description.toLowerCase().includes(this.searchString) // ... recipe description
                    || recipe.ingredients.some(i => i.ingredient.includes(this.searchString)) // ... list of ingredients
                );

            if (isFilteredByTag && isFilteredByString) {

                this.filteredRecipes.push(recipe); // adding to the list of filtered recipes

                // Adding ingredients to the tag list if needed
                recipe.ingredients.forEach(item => {
                    if (!this.tagList.ingredients.includes(item.ingredient.toLowerCase())) {
                        this.tagList.ingredients.push(item.ingredient.toLowerCase());
                    }
                });

                // Adding appliance to the tag list if needed
                if (!this.tagList.appliances.includes(recipe.appliance.toLowerCase())) {
                    this.tagList.appliances.push(recipe.appliance.toLowerCase());
                }

                // Adding ustensils to the list
                recipe.ustensils.forEach(item => {
                    if (!this.tagList.ustensils.includes(item.toLowerCase())) {
                        this.tagList.ustensils.push(item.toLowerCase());
                    }
                });

            };

        });

        this.tagList.ingredients.sort((a, b) => a.localeCompare(b));
        this.tagList.appliances.sort((a, b) => a.localeCompare(b));
        this.tagList.ustensils.sort((a, b) => a.localeCompare(b));

        this.renderList();

    }

    toggleTag(tag) {
        if (!this.activeTags.includes(tag)) {
            this.activeTags.push(tag);
        } else {
            this.activeTags.splice(this.activeTags.indexOf(tag), 1)
        }
        this.filter();
    }

    renderList() {

        const recipeListSection = document.createElement('section');
        recipeListSection.classList.add('recipes');

        this.filteredRecipes.forEach((recipe) => {
            const recipeCard = new RecipeCard(recipe);
            recipeListSection.appendChild(recipeCard);
        })

        const recipeListSelector = document.querySelector('.recipes');
        recipeListSelector.replaceWith(recipeListSection);

    }

}

