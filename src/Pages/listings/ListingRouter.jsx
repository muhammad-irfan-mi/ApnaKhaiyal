import { useLocation } from 'react-router-dom';
import ListingType from './ListingType';
import PostAdForm from './PostAdForm';

const ListingRouter = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    return category && type ? (
        <PostAdForm category={category} adType={type} />
    ) : (
        <ListingType />
    );
};

export default ListingRouter;
