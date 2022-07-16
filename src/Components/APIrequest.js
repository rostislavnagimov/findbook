import { useSelector } from "react-redux";

export function APIrequest (query) {

const text = query.text;
const category = query.category;
const sorting = query.sorting;
const key = 'AIzaSyCW9R5jS1wh8D_gNTa8gnQ9OjSweaqdGfM'

let request = ''
if(category === 'all'){
    request = 'https://www.googleapis.com/books/v1/volumes?q='+ text + '&orderBy=' + sorting + '&key=' + key;
} else {
    request = 'https://www.googleapis.com/books/v1/volumes?q='+ text + '+subject:' + category + '&orderBy=' + sorting + '&key=' + key;
}
return request;


}

export function APILMrequest(query, currentLength) {

const text = query.text;
const category = query.category;
const sorting = query.sorting;
const key = 'AIzaSyCW9R5jS1wh8D_gNTa8gnQ9OjSweaqdGfM'

let lmrequest = ''
if(category === 'all'){
    lmrequest = 'https://www.googleapis.com/books/v1/volumes?q='+ text + '&orderBy=' + sorting + '&startIndex=' + currentLength + '&maxResults=10' + '&key=' + key;
} else {
    lmrequest = 'https://www.googleapis.com/books/v1/volumes?q='+ text + '+subject:' + category + '&orderBy=' + sorting + '&startIndex=' + currentLength + '&maxResults=10' + '&key=' + key;
}

return lmrequest;


}