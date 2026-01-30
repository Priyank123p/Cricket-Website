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
            description: "Premium Willow",
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
            title: "Accessories",
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
                    <span className="subtitle">Our Products</span>
                    <h2 className="section-title">Explore Collections</h2>
                    <div className="header-line mx-auto"></div>
                </div>

                <Row className="g-4 justify-content-center">
                    {collections.map((item) => (
                        <Col key={item.id} xs={12} md={6} lg={4}>
                            <Link to={item.link} className="text-decoration-none">
                                <Card className="collection-card h-100 border-0">
                                    <div className="card-bg" style={{ backgroundColor: item.accentColor }}></div> {/** Changed to accentColor for better subtle bg tint */}
                                    <div className="card-content-wrapper">
                                        <div className="card-image-box">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="collection-product-img"
                                            />
                                        </div>
                                        <div className="card-info text-center mt-3">
                                            <h4 className="fw-bold mb-2">{item.title}</h4>
                                            <p className="description mb-3">{item.description}</p>
                                            <div className="shop-btn-wrapper">
                                                <span className="shop-btn-link" style={{ color: item.accentColor }}>
                                                    Shop Now <ArrowRight size={18} className="arrow-icon ms-1" />
                                                </span>
                                            </div>
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