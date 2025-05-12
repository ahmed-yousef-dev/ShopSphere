import { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data.products));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div className="p-4">
            <h2 className="mb-4">{t('products_list')}</h2>
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {currentProducts.map(product => (
                    <Col key={product.id}>
                        <Card className="h-100 d-flex flex-column">
                            <div className="ratio ratio-4x3">
                                <Card.Img
                                    variant="top"
                                    src={product.thumbnail}
                                    className="object-fit-inherit"
                                />
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{product.title}</Card.Title>
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="h5">${product.price}</span>
                                        <Badge
                                            bg={
                                                product.availabilityStatus === "Out of Stock"
                                                    ? "danger"
                                                    : product.availabilityStatus === "Low Stock"
                                                        ? "warning"
                                                        : "success"
                                            }
                                        >
                                            {product.availabilityStatus === "Low Stock"
                                                ? t('low_stock', { stock: product.stock })
                                                : t(product.availabilityStatus.toLowerCase().replace(' ', '_'))}
                                        </Badge>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small mb-3">
                                        <span>{product.category}</span>
                                        <span>{product.brand}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="outline-primary"
                                    className="mt-auto w-100"
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    {t('view_product')}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {products.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        />
                        {Array.from({ length: totalPages }).map((_, index) => {
                            const page = index + 1;
                            return (
                                <Pagination.Item
                                    key={page}
                                    active={page === currentPage}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Pagination.Item>
                            );
                        })}
                        <Pagination.Next
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default ProductsList;