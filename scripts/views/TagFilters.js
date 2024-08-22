export class TagFilters {

    constructor(recipeSearch) {

        this.recipeSearch = recipeSearch;

    }

    get view() {

        const view = document.createElement('div');
        view.classList.add('filters');

        const dropdownSelectors =  document.createElement('div');
        dropdownSelectors.classList.add('dropdown-selectors');

        let tags = this.recipeSearch.tagList.ingredients;
        const ingredientsDropdown = this.createDropdown('Ingredients', 'ingredients', tags);
        dropdownSelectors.appendChild(ingredientsDropdown);

        tags = this.recipeSearch.tagList.appliances;
        const appliancesDropdown = this.createDropdown('Appareils', 'appliances', tags);
        dropdownSelectors.appendChild(appliancesDropdown);

        tags = this.recipeSearch.tagList.ustensils;
        const ustensilsDropdown = this.createDropdown('Ustensiles', 'ustensils', tags);
        dropdownSelectors.appendChild(ustensilsDropdown);

        view.appendChild(dropdownSelectors);


        const count = document.createElement('div');
        count.classList.add('recipe-counter');
        count.textContent = this.recipeSearch.filteredRecipes.length + ' recettes';

        view.appendChild(count);

        const list = this.createTagList(this.recipeSearch.activeTags);
        list.classList.add('tags');

        view.appendChild(list);

        return view;

    }

    render() {
        const viewSelector = document.querySelector('.filters');
        const renderedView = this.view;
        viewSelector.replaceWith(renderedView);
    };

    createDropdown(name, type, tags) {

        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        const filterButton = document.createElement('div');
        filterButton.classList.add('filter-button');

        const filterText = document.createElement('span');
        filterText.textContent = name;
        filterButton.appendChild(filterText);

        filterButton.addEventListener('click', () => {
            dropdown.classList.toggle('active');
        });
        dropdown.appendChild(filterButton);

        const filterDropdown = document.createElement('div');
        filterDropdown.classList.add('filter-dropdown', type + '-filter');

        const filterSearch = document.createElement('div');
        filterSearch.classList.add('filter-search');


        // Creating the input field for tag search
        const input = document.createElement('input');
        input.type = 'text';
        input.id = type + '-input';

        input.addEventListener('input', () => {

            if(input.value.length > 0) {
                filterSearch.classList.add('filled');
            } else {
                filterSearch.classList.remove('filled');
            };

            const filteredTags = tags.filter((item) =>
                item.includes(input.value)
            )
            const listSelector = document.querySelector('.' + type + '-filter ul');
            listSelector.innerHTML = '';
            listSelector.replaceWith(this.createTagList(filteredTags));
        })

        filterSearch.appendChild(input);

        // Creating a button that clears the previous field
        const clearButton = document.createElement('button');
        clearButton.classList.add('clear-button');

        clearButton.addEventListener('click', () => {
            input.value = '';
            filterSearch.classList.remove('filled');
            const listSelector = document.querySelector('.' + type + '-filter ul');
            listSelector.innerHTML = '';
            listSelector.replaceWith(this.createTagList(tags));
        });

        filterSearch.appendChild(clearButton);

        filterDropdown.appendChild(filterSearch);

        const list = this.createTagList(tags);
        filterDropdown.appendChild(list);

        dropdown.appendChild(filterDropdown);

        return dropdown;
    }

    createTagList(tags) {

        const tagList = document.createElement('ul');

        tags.forEach(tag => {
            const li = document.createElement('li');
            li.textContent = tag;
            tagList.appendChild(li);

            if (this.recipeSearch.activeTags.includes(tag)) {
                li.classList.add('active');
            }


            li.addEventListener('click', (event) => {
                this.recipeSearch.toggleTag(event.target.textContent);
                this.render();
            });

        })

        return tagList;
    }

}