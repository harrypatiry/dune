import React from 'react'
import { useGetOnePostQuery } from '../services/appApi'
import { useParams } from 'react-router-dom'
import { Col, Container, Row, Spinner } from 'react-bootstrap'

export default function SingleArticlePage() {
  const { id } = useParams()
  const { isLoading, isError, data: article } = useGetOnePostQuery(id)

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

  return (
    <Container style={{ margin: "0 auto", minHeight: "100vh"}}>
        <div style={{ margin: "0 auto", paddingTop: "10px"}}>
          <h1>{article.title}</h1>
          <p>By {article.creator.email}</p>
          <p>{article.category}</p>
          <p>{article.created_at}</p>
          <div style={{ margin: "0 auto", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}></div>
          <div style={{ paddingTop: "10px" }} dangerouslySetInnerHTML={{__html: article.content}}/>
        </div>
    </Container>
  )
}
