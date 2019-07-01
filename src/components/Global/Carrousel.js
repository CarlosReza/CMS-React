import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { connect } from 'react-redux';
import './css/Carrousel.css';
import { Link } from 'react-router-dom';

class Carrousel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
            direction: null,
            posts: []
        };
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    render() {
        const { index, direction } = this.state;
        if (this.props.posts == undefined || !this.props.posts.length) {
            return (
                <div>
                    No Posts
              </div>
            )
        }
        return (
            <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
            >
                {
                    this.props.posts.map(post =>
                        <Carousel.Item key={post.Id}>
                            <Link to={"/" + post.Id}>
                                <img
                                    className="img-cover-carrousel"
                                    src={post.Cover}
                                    alt={post.Title}
                                />
                            </Link>
                            <Carousel.Caption>
                                <h3>{post.Title}</h3>
                                <p>{post.Description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                }
                {/* <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="http://lorempixel.com/output/abstract-q-c-1024-250-8.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="http://lorempixel.com/output/abstract-q-c-1024-250-1.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="http://lorempixel.com/output/nature-q-c-1024-250-4.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
                    </Carousel.Caption>
                </Carousel.Item> */}
            </Carousel>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.postsData.posts
    }

}

export default connect(mapStateToProps)(Carrousel);