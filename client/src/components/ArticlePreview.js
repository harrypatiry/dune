import React from 'react'
import { Button, ButtonGroup, Card, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDeletePostMutation } from '../services/appApi'

export default function ArticlePreview({ article, currentUserPost }) {
    const {title, content, _id} = article
    const [deleteArticle, { isLoading }] = useDeletePostMutation()

    const handleDelete = () => {
        deleteArticle(_id)
    }
  return (
    <Container style={{ marginTop: "10px", padding: '0px'}}>
        <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <div>
                    <p dangerouslySetInnerHTML={{__html: content?.substring(0, 50) + '...'}} />
                </div>
                <ButtonGroup>
                    <LinkContainer to={`/articles/${_id}`}>
                        <Button variant="dark">View</Button>
                    </LinkContainer>
                    {currentUserPost && (
                        <>
                            <ButtonGroup>
                                <LinkContainer to={`/articles/${_id}/edit`}>
                                    <Button variant='outline-dark'>Edit</Button>
                                </LinkContainer>
                                <Button variant='outline-danger' onClick={handleDelete}>
                                    {isLoading ? "Deleting..." : "Delete"}
                                </Button>
                            </ButtonGroup>
                        </>
                    )}
                </ButtonGroup>
            </Card.Body>
        </Card>
    </Container>
  )
}
