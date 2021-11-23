import * as React from "react";
import {
    useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/auth";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import LoadingButton from '../components/LoadingButton';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const auth = useAuth();
    const { error } = auth;

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        let formData = new FormData(event.currentTarget);
        let username = formData.get("email");
        let password = formData.get("password");

        auth.signin(username, password, () => {
            setLoading(false);
            navigate("/hot-market", { replace: true });
        });
    }

    return (
        <div>
            <h4 className="text-center">Please login to enter the app!</h4>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <LoadingButton variant="primary" type="submit" loading={loading}>
                    Login
                </LoadingButton>
            </Form>
        </div>
    );
};

export default LoginPage;
