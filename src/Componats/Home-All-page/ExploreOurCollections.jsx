import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './ExploreOurCollections.css';

// Importing Images
import BatImg from '../../Img/Collection-IMG/Plain-Cricket-Bat-PNG-File.png';
import BallImg from '../../Img/Courser/pngimg.com - cricket_PNG95.png';
import AccessoriesImg from '../../Img/Collection-IMG/ring-chevron-bat-grip_2.jpg';

const ExploreOurCollections = () => {
    const collections = [
        {
            id: 1,
            title: "Cricket Bats",
            image: BatImg,
            link: "/product",
            description: "Kashmir Willow",
            bgColor: "#f8f9fa",
            accentColor: "#dc3545"
        },
        {
            id: 2,
            title: "Cricket Balls",
            image: BallImg,
            link: "/cricket-balls",
            description: "Match Ready",
            bgColor: "#f8f9fa",
            accentColor: "#0d6efd"
        },
        {
            id: 3,
            title: "Accessorie",
            image: AccessoriesImg,
            link: "/accessories",
            description: "Essential Gear",
            bgColor: "#f8f9fa",
            accentColor: "#fd7e14"
        }
    ];

    return (
        <section className="collections-section">
            <Container>
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">Explore Our Collections</h2>
                    <div className="header-line mx-auto"></div>
                </div>

                <Row className="g-4 justify-content-center">
                    {collections.map((item) => (
                        <Col key={item.id} md={6} lg={3}>
                            <Link to={item.link} className="text-decoration-none">
                                <Card className="collection-card h-100 border-0">
                                    <div className="card-bg" style={{ backgroundColor: item.bgColor }}></div>
                                    <div className="card-content-wrapper">
                                        <div className="card-image-box">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="collection-product-img"
                                            />
                                        </div>
                                        <div className="card-info text-center mt-3">
                                            <h4 className="fw-bold mb-1">{item.title}</h4>
                                            <p className="text-muted small mb-3">{item.description}</p>
                                            <span className="shop-btn-link" style={{ color: item.accentColor }}>
                                                Shop Now <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default ExploreOurCollections;