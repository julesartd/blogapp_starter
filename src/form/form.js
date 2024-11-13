import './form.scss'
import {API_URL} from "../../utils";

const form = document.querySelector('form')
const errorsContainer = document.getElementById('errors');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const entries = formData.entries();
    const article = Object.fromEntries(entries);

    if (isValidArticle(article)) {
        const json = JSON.stringify(article);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: json
        });

        location.assign('/');
    }

})


const isValidArticle = (article) => {
    let errors = []

    if (!article.author || !article.title || !article.content) {
        errors.push("Tous les champs sont obligatoires");
    }

    if (article.title.length < 3) {
        errors.push("Le titre doit être supérieur à 3 caractères");
    }

    if (article.content.length < 5) {
        errors.push("Le contenu de l'article doit être supérieur à 5 caractères");
    }

    if (errors.length >= 1) {
        let errorsHTML = '';
        errors.forEach(error => {
            errorsHTML += `<li>${error}</li>`
        })
        errorsContainer.innerHTML = errorsHTML;
        return false;
    }

    errorsContainer.innerHTML = '';
    return true;
}