import './index.scss';
import {API_URL} from "../utils";
import {openModal} from "./assets/js/modal";

const articlesContainer = document.querySelector('.articles-container');

const fetchArticles = async () => {
    const response = await fetch(API_URL);
    const articles = await response.json();
    createArticlesDOM(articles);
}

const isValidImageUrl = (url) => {
    try {
        new URL(url);
        return (url.match(/\.(jpeg|jpg|gif|png|svg)$/i) != null);
    } catch (_) {
        return false;
    }
};

const createArticlesDOM = (articles) => {
    const articlesNodes = articles.map(article => {
        const articleNode = document.createElement('div');
        articleNode.classList.add('article');
        const imageUrl = isValidImageUrl(article.image) ? article.image : 'assets/images/default_profile.png';
        articleNode.innerHTML =
            `
                <img src="${imageUrl}" alt="${article.title}">
                <h2>${article.title}</h2>
                <p class="article-author">${article.author}</p>
                <p class="article-content">${article.content}</p>
                <div class="article-actions">
                    <button class="btn btn-danger" data-id="${article.id}">Supprimer</button>
                    <button class="btn btn-primary" data-id="${article.id}">Editer</button>
                </div>
            `;

        return articleNode;
    });

    articlesContainer.innerHTML = '';
    articlesContainer.append(...articlesNodes);

    const deleteButtons = articlesContainer.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async e => {
            const id = e.target.dataset.id;

           const answer = await openModal("Voulez vous vraiment supprimer cet article ?");
           if (answer) {
               await fetch(`${API_URL}/${id}`, {
                   method: 'DELETE'
               });
           }

            await fetchArticles();
        });
    });

    const editButtons = articlesContainer.querySelectorAll('.btn-primary');
    editButtons.forEach(button => {
        button.addEventListener('click', e => {
            const id = e.target.dataset.id;
            location.assign(`/form.html?id=${id}`);
        });
    });
};


fetchArticles();