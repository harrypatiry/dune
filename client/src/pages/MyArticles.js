import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import ArticlePreview from '../components/ArticlePreview'
import { useGetAllUserPostsQuery } from '../services/appApi'

export default function MyArticles() {
  const {data: userArticles, isLoading, isError} = useGetAllUserPostsQuery()

  if(isError) {
    return (
      <div>
        <h1 className="text-center">An error has occurred</h1>
      </div>
    )
  }

  if(isLoading) {
    return (
      <div className='d-flex justify-content-center py-3'>
        <Spinner animation='border'></Spinner>
      </div>
    )
  }

  if(userArticles.length === 0) {
    return (
      <div>
        <h1 className="text-center">You haven't posted anything</h1>
      </div>
    )
  }

  return (
    <Container style={{ margin: "0 auto", paddingTop: "10px"}}>
      <h1 className="text-center">My Articles</h1>
      <Row>
        <Col md={9} className="d-flex justify-content-center flex-wrap gap-4">
          {userArticles.map((article, idx) => (
          <ArticlePreview key={idx} article={article} currentUserPost={true}/>
          )).reverse()}
        </Col>
      </Row>
    </Container>
  )
}
