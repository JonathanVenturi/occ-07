import { recipes } from '../data/recipes.js';
import { RecipeSearch } from './models/RecipeSearch.js';
import { TagFilters } from './views/TagFilters.js';




function init() {

    const recipeList = new RecipeSearch(recipes);
    recipeList.renderList();

    const tagFilters = new TagFilters(recipeList);
    tagFilters.render();


    const mainSearchForm = document.querySelector('.search-form');
    const mainInputField = document.getElementById('search-input');
    const mainClearButton = document.getElementById('clear-search');

    mainSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    mainInputField.addEventListener('input', (event) => {

        event.preventDefault();

        if (!mainInputField.value.length) {
            mainSearchForm.classList.remove('filled');

        };

        if(mainInputField.value.length > 0) {
            mainSearchForm.classList.add('filled');
        };

        if (!mainInputField.value.length || mainInputField.value.length > 2) {
            recipeList.search(mainInputField.value);
            tagFilters.render();
        };

    });

    mainClearButton.addEventListener('click', (event) => {
        event.preventDefault();
        mainInputField.value = '';
        mainSearchForm.classList.remove('filled');
        recipeList.search('');
        tagFilters.render();
    });

}

init();
