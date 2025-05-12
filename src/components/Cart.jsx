import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Image, Row, Col } from 'react-bootstrap';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import { useTranslation } from 'react-i18next';

const Cart = () => {
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="p-4 text-center">
                <h2>{t('your_cart_is_empty')}</h2>
                <Link to="/" className="btn btn-primary mt-3">{t('continue_shopping')}</Link>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="mb-4">{t('shopping_cart')}</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>{t('product')}</th>
                        <th>{t('price')}</th>
                        <th>{t('quantity')}</th>
                        <th>{t('total')}</th>
                        <th>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td>
                                <Row className="align-items-center">
                                    <Col md={2}>
                                        <Image src={item.thumbnail} alt={item.title} thumbnail style={{ maxHeight: 50 }} />
                                    </Col>
                                    <Col md={10}>
                                        <h6>{item.title}</h6>
                                        <small className="text-muted">{item.category}</small>
                                    </Col>
                                </Row>
                            </td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline-secondary"
                                        onClick={() => dispatch(decrementQuantity(item.id))}
                                    >
                                        -
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button
                                        size="sm"
                                        variant="outline-secondary"
                                        onClick={() => dispatch(incrementQuantity(item.id))}
                                    >
                                        +
                                    </Button>
                                </div>
                            </td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                >
                                    {t('remove')}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="text-end mt-4">
                <h4>{t('total')}: ${totalAmount.toFixed(2)}</h4>
                <div className="d-flex gap-3 justify-content-end mt-3">
                    <Link to="/" className="btn btn-outline-secondary">{t('continue_shopping')}</Link>
                    <Button variant="success">{t('proceed_to_checkout')}</Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;