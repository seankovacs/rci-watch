import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner'

const LoadingButton = ({loading, onClick, children, ...rest}) => {
    return (
        <Button
            variant="primary"
            disabled={loading}
            onClick={!loading ? onClick : null}
            {...rest}
        >
            {loading ? <Spinner animation="border" variant="light" /> : children}
        </Button>
    );
}

export default LoadingButton;