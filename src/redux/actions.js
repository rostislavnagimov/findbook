import {APIrequest} from '../Components/APIrequest';
import {APILMrequest} from '../Components/APIrequest'
import { NOERROR, SEARCH } from './types'
import { LOAD, LOADMORE, ERROR } from './types';

export function actionSearch(query){
    return{
        type: SEARCH,
        data: query
    }

}
export function Load(query){
    return async dispatch => {
        try {
        const response = await fetch(APIrequest(query));
        const jsonData = await response.json();
        dispatch({
                type: LOAD,
                data: jsonData
            });
    
        } catch {
            dispatch({
                type: ERROR
            });
        }
        
    }}

export function LoadMore(query, currentLength){
    return async dispatch => {
        try {
        const response = await fetch(APILMrequest(query, currentLength));
        const jsonData = await response.json(); 
        dispatch({
                type: LOADMORE,
                data: jsonData
            });
    
        } catch {
            dispatch({
                type: ERROR
            });
        }
        
    }}

export function noError () {
    return{
        type: NOERROR
    }
}

//https://developers.google.com/books/docs/v1/using
//https://github.com/fugr-ru/frontend-javascript-test-2