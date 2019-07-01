import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import '../../styles/post.css'
import dummyImage from '../Global/images/dummy-post-card.jpg';

export default ({ post: { Title, Body, Cover, Id, Description } }) => {
    //var strDesc = Body.substring(0, 30);
    return (

        <Card className="card-post">
            <Link to={"/" + Id}>
                <Card.Img variant="top" src={Cover} />
            </Link>
            <Card.Body>
                <Card.Title>{Title}</Card.Title>
                <Card.Text>
                    {Description}
                </Card.Text>
                <Link to={"/" + Id}>Ver más</Link>
            </Card.Body>
        </Card>
    );
};