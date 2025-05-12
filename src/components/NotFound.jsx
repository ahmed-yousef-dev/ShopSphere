import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className="p-4 text-center">
            <h2>{t('404_page_not_found')}</h2>
            <p>{t('page_does_not_exist')}</p>
            <Link to="/" className="btn btn-primary">
                {t('return_to_home')}
            </Link>
        </div>
    );
};

export default NotFound;