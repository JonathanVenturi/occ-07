export class RecipeCard {

    constructor(recipe) {

        const card = document.createElement('article');
        card.classList.add('recipe-card');

        const picture = document.createElement('img');
        picture.classList.add('recipe-picture');
        picture.src = './assets/recipe_photos/' + recipe.image;
        picture.alt = recipe.name;
        card.appendChild(picture);

        const title = document.createElement('h2');
        title.classList.add('recipe-title');
        title.textContent = recipe.name;
        card.appendChild(title);

        const instructions = document.createElement('section');
        instructions.classList.add('recipe-instructions');
        const institle = document.createElement('h3');
        institle.textContent = 'Recette';
        instructions.appendChild(institle);
        const description = document.createElement('p');
        description.textContent = recipe.description.slice(0, 150) + '...';
        instructions.appendChild(description);
        card.appendChild(instructions);

        const ingredients = document.createElement('section');
        ingredients.classList.add('recipe-ingredients');

        const ingtitle = document.createElement('h3');
        ingtitle.textContent = 'Ingredients';
        ingredients.appendChild(ingtitle);

        const inglist = document.createElement('div');
        inglist.classList.add('ingredients-list');


        recipe.ingredients.forEach(ingredient => {

            const div = document.createElement('div');
            div.classList.add('recipe-ingredient');
            const p1 = document.createElement('p');
            p1.classList.add('ingredient');
            p1.textContent = ingredient.ingredient;
            const p2 = document.createElement('p');
            p2.classList.add('quantity');
            p2.textContent =
                (ingredient.quantity ? ingredient.quantity : '')
                + ' '
                + (ingredient.unit ? ingredient.unit : '');
            div.appendChild(p1);
            div.appendChild(p2);
            inglist.appendChild(div);

        });

        ingredients.appendChild(inglist);


        card.appendChild(ingredients);




        const preptime = document.createElement('div');
        preptime.classList.add('recipe-time');
        preptime.textContent = recipe.time + ' min';

        card.appendChild(preptime);

        return card;

    }




}