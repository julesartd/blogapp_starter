import './index.scss';
import {API_URL} from "../utils";


const fetchArticles = async () => {
    const response = await fetch(API_URL);
    const articles = await response.json();
    console.log(articles);
    return articles;

}

fetchArticles();

