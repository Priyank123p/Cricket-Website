import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Truck, BadgeCheck, RefreshCcw, Headset } from 'lucide-react';
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
    const features = [
        {
            icon: <Truck size={40} />,
            title: "FREE SHIPPING",
            description: "Get the Free delivery of all products all over India."
        },
        {
            icon: <BadgeCheck size={40} />,
            title: "BRANDED QUALITY",
            description: "MJ Sports deals with only best quality products."
        },
        {
            icon: <RefreshCcw size={40} />,
            title: "EXCHANGE",
            description: "Products can be exchanged hassle free as per MJ Sports exchange policy."
        },
        {
            icon: <Headset size={40} />,
            title: "CUSTOMER SUPPORT",
            description: "We are always available to give the best customer support."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <div className="features-section">
            <Container>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <Row className="g-4">
                        {features.map((feature, index) => (
                            <Col key={index} md={6} lg={3}>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                                    className="feature-card"
                                >
                                    <div className="feature-icon-wrapper">
                                        {feature.icon}
                                    </div>
                                    <div className="feature-content">
                                        <h5 className="feature-title">
                                            {feature.title}
                                        </h5>
                                        <p className="feature-description">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </motion.div>
            </Container>
        </div>
    );
};

export default Features;
