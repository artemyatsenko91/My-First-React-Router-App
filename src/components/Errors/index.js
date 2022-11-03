const Error = (props) => {
    return <div>Error: {props ? props.err : '404'}</div>;
}

export default Error;