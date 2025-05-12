import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Row, Col, InputGroup, Form, ListGroup, Spinner } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useTranslation } from 'react-i18next';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
                const data = await response.json();
                const foundProduct = data.products.find(p => p.id === parseInt(id));

                if (!foundProduct) {
                    navigate('/not-found');
                } else {
                    setProduct(foundProduct);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const getStockStatus = (availabilityStatus) => {
        if (availabilityStatus === 'Out of Stock') return { text: t('out_of_stock'), variant: 'danger' };
        if (availabilityStatus === 'Low Stock') return { text: t('low_stock').replace('{stock}', product.stock), variant: 'warning' };
        return { text: t('in_stock'), variant: 'success' };
    };

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            category: product.category,
            quantity: quantity
        }));
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">{t('loading')}</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center text-danger">
                <h2>{t('error_loading_product')}</h2>
                <p>{error}</p>
                <Button onClick={() => window.location.reload()}>{t('try_again')}</Button>
            </div>
        );
    }

    if (!product) return null;

    const stockStatus = getStockStatus(product.availabilityStatus);
    const discountedPrice = product.price * (1 - product.discountPercentage / 100);

    return (
        <div className="p-4">
            <Button variant="link" onClick={() => navigate(-1)} className="mb-3">
                {t('back_to_products')}
            </Button>

            <Card>
                <Row className="g-0">
                    <Col md={6}>
                        <img
                            variant="top"
                            src={product.images[0]}
                            className="w-100"
                        />
                    </Col>
                    <Col md={6}>
                        <Card.Body className="h-100 d-flex flex-column p-4">
                            <Card.Title className="h1 mb-3">{product.title}</Card.Title>

                            <div className="d-flex gap-2 mb-2">
                                <Badge bg="info">{product.category}</Badge>
                                <Badge bg="secondary">{product.brand}</Badge>
                            </div>
                            <div className="d-flex mb-3 gap-1">
                                <span>
                                    {Array.from({ length: Math.round(product.rating) }).map((_, index) => (
                                        <FaStar key={index} color="gold" />
                                    ))}
                                </span>
                                <span>({product.reviews.length})</span>
                            </div>

                            <div className="mb-4">
                                <div className="d-flex align-items-center gap-3">
                                    <h2 className="text-danger mb-0">
                                        ${discountedPrice.toFixed(2)}
                                    </h2>
                                    <del className="text-muted h4">${product.price.toFixed(2)}</del>
                                    <Badge bg="warning" text="dark">
                                        {product.discountPercentage}% OFF
                                    </Badge>
                                </div>
                            </div>

                            <ListGroup className="mb-4">
                                <ListGroup.Item>
                                    <strong>{t('description')}:</strong> {product.description}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>{t('availability')}:</strong>{' '}
                                    <Badge bg={stockStatus.variant}>
                                        {stockStatus.text}
                                    </Badge>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>{t('shipping')}:</strong> {product.shippingInformation}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>{t('return_policy')}:</strong> {product.returnPolicy}
                                </ListGroup.Item>
                            </ListGroup>

                            <div className="mb-4">
                                <h5>{t('quantity')}:</h5>
                                <InputGroup className="w-50">
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className={`rounded-0 ${isRTL ? 'rounded-end' : 'rounded-start'}`}
                                    >
                                        -
                                    </Button>
                                    <Form.Control
                                        type="number"
                                        value={quantity}
                                        min="1"
                                        onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                                        className="text-center"
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className={`rounded-0 ${isRTL ? 'rounded-start' : 'rounded-end'}`}
                                    >
                                        +
                                    </Button>
                                </InputGroup>
                            </div>

                            <div className="d-flex gap-3 mt-auto">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="flex-grow-1"
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                >
                                    {t('buy_now')}
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    size="lg"
                                    className="flex-grow-1"
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                >
                                    {t('add_to_cart')} ({quantity})
                                </Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ProductDetails;