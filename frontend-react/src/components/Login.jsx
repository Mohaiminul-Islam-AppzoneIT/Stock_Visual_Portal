import { useContext, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../authProvider';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', formData);
      console.log(response.data);
      localStorage.setItem("accessToken", response.data.access)
      localStorage.setItem("refreshToken", response.data.refresh)

      console.log("logdedin")
      setErrors({});
      setSuccess(true);
      setIsLoggedIn(true)
      navigate('/')
    } catch (error) {
      setErrors('Invalid Credentials');
      console.error('Login error', error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-2">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-white" style={{ backgroundColor: '#1e1e1e' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login to our Portal</p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c" style={{ color: '#ccc' }}>
                            Your Username:
                          </label>
                          <input
                            type="text"
                            id="form3Example3c"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control"
                            style={{ backgroundColor: '#2c2c2c', color: '#fff' }}
                          />
                          {errors && <small className="text-danger">{errors}</small>}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4c" style={{ color: '#ccc' }}>
                            Password:
                          </label>
                          <input
                            type="password"
                            id="form3Example4c"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            style={{ backgroundColor: '#2c2c2c', color: '#fff' }}
                          />
                          {errors && <small className="text-danger">{errors}</small>}
                        </div>
                      </div>

                      {success && <div className="alert alert-success">Login Successful</div>}

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        {loading ? (
                          <button type="submit" className="btn btn-success btn-lg" disabled>
                            <FontAwesomeIcon icon={faSpinner} spin className="me-2 bg-success" />
                            Logging in...
                          </button>
                        ) : (
                          <button type="submit" className="btn btn-success btn-lg">
                            Login
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                      className="img-fluid"
                      alt="Phone image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
