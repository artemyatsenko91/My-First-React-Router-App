import AlbumItem from './AlbumItem';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Albums = () => {
    const albums = useSelector(state => state.album.albums);
    const { id } = useParams();
    return (
        <div>
            {albums
                .filter(album => album.userId === +id)
                .map((album) => (
                    <AlbumItem
                        key={album.id}
                        album={album}
                    />
                ))
            }
        </div>
    )
}

export default Albums;