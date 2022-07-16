import { useSelector } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap'
import noimage from '../Assets/noimage.png'
import { useState } from "react";
import { Button } from "react-bootstrap";
import { LoadMore, noError } from "../redux/actions";
import { useDispatch } from 'react-redux';
import Book from "./Book";
import Modal from 'react-bootstrap/Modal';


export default function Books() {
    const items = useSelector(state => state.response)

    const totalitems = useSelector(state => state.totalItems)

    const totalitemsout = () => {
        return(
            <p style={{textAlign: 'center', marginTop: '20px'}}>Total items: {totalitems}</p>
        )
        }

    const LMbutton = () => {
        return(
            <div style={{marginTop: '20px', marginBottom: '20px', textAlign: 'center'}}>
            <Button variant="outline-secondary" onClick={HandleLM}>Load more</Button>
            </div>
        )
    }

    const LM = () => {
        if (currentLength >= totalitems || currentLength % 10 !== 0){
            return false
        } else {
            return true
        }
    }


    let currentLength = 0
    if (items !== undefined) {
        currentLength = items.length
    }


    const query = useSelector(state => state.query)
    const dispatch = useDispatch();
    const HandleLM = () => {
        try{
        dispatch(LoadMore(query, currentLength))
        } catch {
            console.log("LOAD ERROR")
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [authors, setAuthors] = useState();
    const [categories, setCategories] = useState();
    const [description, setDescription] = useState();
    const [link, setLink] = useState();

    const showBook = (image, title, authors, categories, description, link) => {
        setImage(image);
        setTitle(title);
        setAuthors(authors);
        setCategories(categories);
        setDescription(description);
        setLink(link);

        handleShow();


    }

    const book = () => {
        return(
            <Modal show={show} onHide={handleClose}  dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <img className = 'bookimg' src ={image} width='150px'/><br/>
                                <small>Author:</small> <i>{authors}</i><br/>
                                <small>Category:</small> <u>{categories}</u>
                            </Col>
                            <Col>
                                {description}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <a className="btn btn-primary" href={link} role="button" target="_blank">
                        Go to book
                    </a>
                </Modal.Footer>
            </Modal>
        )
    }

    const placeholder = () => {
        return(
            <div className = 'holder'>
                    Your books will be here
            </div>
        )
    }

    const nothing = () => {
        return(
            <div className = 'holder'>
                    Nothing found!
            </div>
        )
    }
    const error = useSelector(state => state.error)

    const [showError, setShowError] = useState(false);
    const handleCloseError = () => {
        if(showError === true){
            dispatch(noError());
            setShowError(false);
        };}
    const handleShowError = () => {
        if(showError === false){
            setShowError(true);
        };}

    const ErrorMessage = () => {
        return(
            <Modal show={showError} onHide={handleCloseError}  dialogClassName="modal-90w"  centered>
                <Modal.Header closeButton>
                    <Modal.Title>CONNECTION ERROR!!!</Modal.Title>
                </Modal.Header>
            </Modal>
        )

    }


    return(       
        <>
        {totalitems === 0 && nothing()}
        {totalitems === undefined && placeholder()}
        {items !== undefined && totalitemsout()}
        <div className = "flex-container">
            {items !== undefined && items.map(res => {
            let image
            let title
            let authors
            let categories
            let id
            let description
            let link
            if (res !== undefined){
                id = res.id + res.etag
                link = res.volumeInfo.canonicalVolumeLink
                
                if (res.volumeInfo.imageLinks !== undefined ){
                    image = res.volumeInfo.imageLinks.thumbnail
                    } else {
                        image = noimage
                    }

                
                if (res.volumeInfo.title.length > 105) {
                    title = res.volumeInfo.title.slice(0, 102) + '...'
                    } else {
                        title = res.volumeInfo.title
                    }

                 
                if (res.volumeInfo.authors !== undefined ){
                    if (res.volumeInfo.authors.length > 1){
                        authors = res.volumeInfo.authors.join(', ')
                    } else {
                        authors = res.volumeInfo.authors
                    }} 

                
                if (res.volumeInfo.categories !== undefined ){
                    if (res.volumeInfo.categories.length > 1){
                        categories = res.volumeInfo.categories[0]
                    } else {
                        categories = res.volumeInfo.categories
                    }}

                if (res.volumeInfo.description !== undefined ){
                    if (res.volumeInfo.description.length > 500) {
                        description = res.volumeInfo.description.slice(0, 500) + '...'
                        } else {
                            description = res.volumeInfo.description
                        }
                
                    } else {
                        description = ''
                    }
                
                } else {
                    console.log("API ERROR")
                }
                

            return (
                <div className="flex-item" onClick={() => {showBook(image, title, authors, categories, description, link)}} key={id}>
                        
                                <div className="card-header"><img src={image} width='80px'/></div>
                        
                                <div className="card-body"><small>{categories}</small><br/><b>{title}</b><br/><i>{authors}</i></div>
                </div>
                )
                })}
        </div>
        <div>
        {items !== undefined && LM() && LMbutton()}
        {book()}
        {ErrorMessage()}
        {error && handleShowError()}
        </div>
        </>
    );

}