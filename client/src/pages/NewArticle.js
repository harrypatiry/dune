import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useCreatePostMutation } from '../services/appApi';
import './NewArticle.css'

export default function NewArticle() {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState()
    const [textState, setTextState] = useState(false)
    const [createPost, {isLoading, isSuccess}] = useCreatePostMutation()
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const navigate = useNavigate()
    const handlePublish = (e) => {
        e.preventDefault();
        const rawContentState = convertToRaw(editorState.getCurrentContent())
        const content = draftToHtml(rawContentState);
        if(!title || !content){
            return alert("Please add a title and content before publishing")
        }
        //create article
        createPost({title, content, category});
    }

    
    const handleEditorChange = (state) => {
        setEditorState(state)
        setTextState(true)
    }

    if(isLoading){
        return (
            <div className="py-4">
                <h1 className='text-center'>Publishing Article</h1>
            </div>
        )
    }

    if(isSuccess) {
        setTimeout(() => {
            navigate('/')
        }, 2000)
        return (
            <div>
                <h1 className='text-center'>Article Created</h1>
            </div>
        )
    }
        
        return (
    <Container style={{ margin: "0 auto", paddingTop: "10px"}}>
        <Row>
            <Col md={7}>
            <Form onSubmit={handlePublish}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={title} type="text" placeholder="Your Title" onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>
                <Editor stripPastedStyles={true} editorState={editorState} onEditorStateChange={handleEditorChange} wrapperClassName="wrapper mb-4" editorClassName='editor' toolbarClassName="toolbar" />
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Select category</option>
                    <option value='hardware'>Hardware</option>
                    <option value='software'>Software</option>
                    <option value='programming'>Programming</option>
                </Form.Select><br></br>
                <div>{!title && <p>Please add a title and content before publishing.</p>}</div>
                <Button variant="outline-success" type="submit">
                    Create Article
                </Button>
            </Form>
            </Col>
            <Col md={5}></Col>
        </Row>
    </Container>
  )
}
