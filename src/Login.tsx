import React, {useState, FormEvent} from "react";
import axios from 'axios';
import {Button, Container, FormGroup, Form, Row, Col} from 'reactstrap';


interface SetToken {
    setToken: React.Dispatch<React.SetStateAction<string>>;
}
  

const Login: React.FC<SetToken> = ({setToken}) => {
    
    const[userName, setUserName] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { username: userName, password: password });
            setToken (response.data.token);
        }
        catch(error) {
           console.error('error happened:', error);

        }

    }
    return (
    
        <Container className="d-flex justify-content-center align-items-center vh-100">
            
            <Row className="p-4 borderd rounded shadow bg-light">
                <h2>Login</h2>
                <Form  onSubmit={handleSubmit}>
                    <FormGroup>
                        <Col md={12}className="mx-auto">  
                            <input  
                                className="form-control" 
                                type="text" 
                                placeholder="Username" 
                                value={userName} 
                                onChange={(e)=> setUserName(e.target.value)} 
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={12} className="mx-auto">
                            <input  
                                className="form-control" 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </Col> 
                    </FormGroup> 
                    <FormGroup>         
                        <Col className="mx-auto">
                            <Button color="primary" type="submit">Login</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Row>
            
       </Container> 
    );
        
}
 export default Login;