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

        // Going through all the recipes one by one
        for (let index = 0; index < this.recipes.length; index++) {
            const recipe = this.recipes[index];

            // Initialising the search check as false
            let isFilteredByString = false;
            let isFilteredByTag = false;

            // Filtering by search string first
            if (this.searchString == '') {
                // Search string is empty, so recipe get a fast pass
                isFilteredByString = true;
            } else {
                // The string is found in the recipe name or instructions
                if (recipe.name.toLowerCase().includes(this.searchString) || recipe.description.toLowerCase().includes(this.searchString)) {
                    isFilteredByString = true;
                } else {
                    // Checking if the string is found amongst the ingredients
                    for (let j = 0; j < recipe.ingredients.length; j++) {
                        if (recipe.ingredients[j].ingredient.toLowerCase().includes(this.searchString)) {
                            isFilteredByString = true;
                        };
                    };
                };
            };

            // Filtering the recipe by tags
            if (!this.activeTags.length) {
                // The recipe is displayed as there are no active tags
                isFilteredByTag = true;
            } else {

                // Initialising match counter for tags
                let matchCounter = 0;

                // Going through the active tags one by one
                for (let i = 0; i < this.activeTags.length; i++) {
                    const tag = this.activeTags[i];

                    // Checking if the appliance matches the current tag
                    if (recipe.appliance.toLowerCase() == tag) {
                        matchCounter++;
                        continue;
                    };

                    // Checking if one of the ustensils matches the current tag
                    for (let j = 0; j < recipe.ustensils.length; j++) {
                        if (recipe.ustensils[j].toLowerCase() == tag) {
                            matchCounter++;
                            continue;
                        };
                    };

                    // Checking if one of the ingredients matches the current tag
                    for (let j = 0; j < recipe.ingredients.length; j++) {
                        if (recipe.ingredients[j].ingredient.toLowerCase() == tag) {
                            matchCounter++;
                            continue;
                        };
                    };
                };

                if (matchCounter == this.activeTags.length) { // All tags matched...
                    isFilteredByTag = true; // ... recipe is flagged as filtered
                }

            };

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

        };

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

        if (this.filteredRecipes.length) { // Filtered recipe list is not empty, displaying cards for recipe

            this.filteredRecipes.forEach((recipe) => {
                const recipeCard = new RecipeCard(recipe);
                recipeListSection.appendChild(recipeCard);
            })

        } else { // No filtered recipes, displaying message

            const message = document.createElement('p');
            message.textContent = '« Aucune recette ne contient « ' + this.searchString + ' » vous pouvez chercher « tarte aux pommes », « poisson », etc';
            recipeListSection.appendChild(message);

        }

        const recipeListSelector = document.querySelector('.recipes');
        recipeListSelector.replaceWith(recipeListSection);

    }

}