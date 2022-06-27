import React, { useState } from 'react'
import { Col, Container, Dropdown, Form, ListGroup, Row, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ArticlePreview from '../components/ArticlePreview'
import MainArticle from '../components/MainArticle'
import { useGetAllPostsQuery } from '../services/appApi'
import './Home.css'

export default function Home() {
  const {data: articles, isLoading, isError} = useGetAllPostsQuery()
  const sidebarArticles = articles?.slice(0, 4) || [];
  const [filterValue, setFilterValue] = useState('');

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

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value)
  }
  
  let filteredArticles = articles.filter(function(item){
    if(item.category === filterValue){
      return item
    } else if(filterValue === 'Filters' || filterValue === '' || filterValue === undefined) {
      return item
    } 
  })

  return (
    <Container style={{ paddingTop: "10px", minHeight: "100vh"}}>
      <div className='banner'>
        <h1 className='banner-title'>DUNE</h1>
      </div>
      <Row>
        <MainArticle article={articles[articles.length - 1]}/>
        <div>
        <Dropdown>
          <Form.Select value={filterValue} onChange={handleFilterChange} aria-label="Default select example">
            <option>Filters</option>
            <option value="programming">Programming</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
          </Form.Select>
        </Dropdown>
        </div>
        <Col md={9} className='blog-main py-4'>
          {filteredArticles.map((article, idx) => <ArticlePreview article={article} key={idx}/>).reverse()}
        </Col>
        <Col md={3} className='blog-sidebar py-4'>
          <ListGroup variant="flush">
            <h2>Latest Posts</h2>
            {sidebarArticles.map((article, idx) => {
              return (
                <LinkContainer to={`/articles/${article._id}`} key={idx}>
                  <ListGroup.Item>{article.title}</ListGroup.Item>
                </LinkContainer>
              )
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}
