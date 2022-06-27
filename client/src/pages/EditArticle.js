import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { EditorState, convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useUpdatePostMutation } from '../services/appApi';
import './EditArticle.css'
import { useSelector } from 'react-redux';
import draftToHtml from 'draftjs-to-html';

export default function EditArticle() {
    const { id } = useParams()
    const posts = useSelector((state) => state.post)
    const postToEdit = posts.find((post) => post._id == id)

    const [updateArticle, { isLoading, isSuccess }] = useUpdatePostMutation()

    const [title, setTitle] = useState(postToEdit.title)
    const [category, setCategory] = useState()

    const contentDataState = ContentState.createFromBlockArray(convertFromHTML(postToEdit.content))
    const editorDataState = EditorState.createWithContent(contentDataState)
    const [editorState, setEditorState] = useState(editorDataState)
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault();
        const rawContentState = convertToRaw(editorState.getCurrentContent())
        const content = draftToHtml(rawContentState)

        if(!title || !content){
          return alert('title and content are required')
        }
        updateArticle({id, title, content, category})
    }
    
    const handleEditorChange = (state) => {
        setEditorState(state)
    }

    if(isLoading){
        return (
            <div className="py-4">
                <h1 className='text-center'>Updating Article</h1>
            </div>
        )
    }

    if(isSuccess) {
        setTimeout(() => {
            navigate('/')
        }, 2000)
        return (
            <div>
                <h1 className='text-center'>Article Updated</h1>
            </div>
        )
    }
        
        return (
    <Container style={{ paddingTop: "10px", minHeight: "100vh" }}>
        <Form onSubmit={handleUpdate}>
            <h2 className='text-center'>Edit Article</h2>
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
                Update Article
            </Button>
        </Form>
    </Container>
  )
}
