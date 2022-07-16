import { Container } from 'react-bootstrap';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { actionSearch } from '../redux/actions';
import { Load } from '../redux/actions';
import APIrequest from './APIrequest';



export default function Search() {
    const dispatch = useDispatch();

    
    const [text, setText] = useState('');
    const [category, setCategory] = useState('all');
    const [sorting, setSorting] = useState('relevance');

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleSorting = (e) => {
        setSorting(e.target.value)
    }

    const handleInput = (e) => {
        setText(e.target.value)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = {
            text: text,
            category: category,
            sorting: sorting
        }
        dispatch(actionSearch(query));
        dispatch(Load(query));
        
    
    }
    return(
            <Container fluid className="bgimg">
                <div className="cb">
                    <h1 className='title'>Search for books</h1>

                    <form onSubmit={handleSubmit}>
                        <input className = 'searchinput' placeholder="Harry Potter" type='text' value={text} onChange={handleInput} />
                        <button className='searchbtn' type='submit'>SEARCH</button>
                        <input type='submit' hidden/>
                        <div style={{marginTop: '20px'}}>
                            <span className='bl'>
                            <span className='title'><b>Categories</b></span>
                            <select value={category} onChange={handleCategory} style={{marginLeft: '10px', color: 'black'}}>
                                <option>all</option>
                                <option>art</option>
                                <option>biography</option>
                                <option>computers</option>
                                <option>history</option>
                                <option>medical</option>
                                <option>poetry</option>
                            </select>
                            </span>
                            <span className='bl'>
                            <span className='title'><b>Sorting by</b></span>
                            <select value={sorting} onChange={handleSorting} style={{marginLeft: '10px', color: 'black'}}>
                                <option>relevance</option>
                                <option>newest</option>
                            </select>
                            </span>

                        </div>
                    </form>
                </div>
                    
                
                
            </Container>

            
        )

    }

