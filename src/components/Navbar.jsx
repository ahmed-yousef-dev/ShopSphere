import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';

const NavigationBar = () => {

    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const isRTL = currentLang === 'ar';

    const cartItems = useSelector(state => state.cart);
    const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Navbar bg="light" expand="lg" className="px-4">
            <Navbar.Brand as={Link} to="/" className={isRTL ? 'ms-auto' : 'me-auto'}>
                {t('brand_name')}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={isRTL ? 'ms-auto' : 'me-auto'}>
                    <Nav.Link as={Link} to="/">{t('products')}</Nav.Link>
                    <Nav.Link as={Link} to="/cart">
                        {t('cart')}
                        {cartItemCount > 0 && (
                            <Badge bg="danger" className="ms-1" style={{ fontSize: '0.75rem' }}>
                                {cartItemCount}
                            </Badge>
                        )}
                    </Nav.Link>                </Nav>
                <Nav className={isRTL ? 'me-auto' : 'ms-auto'}>
                    <NavDropdown title={t('language')} id="language-dropdown">
                        <NavDropdown.Item onClick={() => changeLanguage('en')}>
                            {t('english')}
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeLanguage('ar')}>
                            {t('arabic')}
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeLanguage('fr')}>
                            {t('french')}
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
