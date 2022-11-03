const LoadingStatus = ({ status, error, children }) => {
    return (
        <>
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>Error: {error}</h2>}
            {status === 'resolved' &&  children }
        </>
    )
}

export default LoadingStatus;