import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function MainArticle({article}) {
    const {title, content, _id} = article
  return (
    <Row className='pb-4'>
        <Col md={6} className='main-article'>
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{__html: content?.substring(0, 200)}}/>
            <LinkContainer to={`/articles/${_id}`}>
                <Button variant="outline-dark">Read More</Button>
            </LinkContainer>
        </Col>
    </Row>
  )
}
