import './form.scss'
import {API_URL} from "../../utils";

const form = document.querySelector('form');
const errorsContainer = document.getElementById('errors');
const cancelButton = document.querySelector('.btn-secondary');

cancelButton.addEventListener('click', () => {
    const answer = confirm("Voulez-vous vraiment annuler l'article ?");
    if (answer) {
        location.assign('/');
    }
});

let articleId;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const entries = formData.entries();
    const article = Object.fromEntries(entries);

    if (articleId) {
        if (isValidArticle(article)) {
            const json = JSON.stringify(article);
            await fetch(`${API_URL}/${articleId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: json
            });
        }
    } else {
        if (isValidArticle(article)) {
            const json = JSON.stringify(article);
            await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: json
            });
        }
    }
    location.assign('/');
});

const isValidArticle = (article) => {
    let errors = [];

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
            errorsHTML += `<li>${error}</li>`;
        });
        errorsContainer.innerHTML = errorsHTML;
        return false;
    }

    errorsContainer.innerHTML = '';
    return true;
};

const isEditMode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('id');
    return urlParams.has('id');
};

const fetchArticle = async () => {
    const response = await fetch(`${API_URL}/${articleId}`);
    return response.json();
};

const fillForm = (article) => {
    const form = document.querySelector('form');
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.value = article[input.name];
    });
};

const initForm = async () => {
    if (isEditMode()) {
        new URLSearchParams(window.location.search);
        const article = await fetchArticle(articleId);
        fillForm(article);
    }
};

await initForm();