import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import '../../styles/post.css'
import dummyImage from '../Global/images/dummy-post-card.jpg';

export default ({ post: { Title, Body, Cover, Id } }) => {
    var strDesc = Body.substring(0, 30);
    return (        

            <Card className="card-post">
                <Card.Img variant="top" src={Cover} />
                <Card.Body>
                    <Card.Title>{Title}</Card.Title>
                    <Card.Text>
                        {strDesc}
                    </Card.Text>
                    <Link to={"/" + Id}>Ver más</Link>
                </Card.Body>
            </Card>

    );
};