import styles from './style.module.css'

const AlbumItem = ({ album }) => {
    return (
        <div className={styles.content}>
            <h2>Title: {album.title}</h2>
        </div>
    )
}

export default AlbumItem;
