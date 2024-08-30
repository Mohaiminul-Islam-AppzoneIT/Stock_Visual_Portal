import { useState } from "react";
import axios from 'axios'
import { faSpider, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
        try{
          const response = await axios.post('http://127.0.0.1:8000/api/v1/register/',formData)
          console.log(response.data);
          setErrors({});
          setSuccess(true)
        }catch(error){
          setErrors(error.response.data)
          console.error('registation error',error.response.data)
      }finally{
        setLoading(false)
      }
    };




    return (
      <>
        <section className="mb-2">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-white" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Sign up
                        </p>
                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label
                                className="form-label"
                                htmlFor="form3Example1c"
                                style={{ color: "#ccc" }}
                              >
                                Your Name:
                              </label>
                              <input
                                type="text"
                                id="form3Example1c"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                style={{ backgroundColor: "#2c2c2c", color: "#fff" }}
                              />
                            <small>{errors.username && <div className="text-danger">{errors.email}</div>}</small>
                            </div>
                          </div>
  
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label
                                className="form-label"
                                htmlFor="form3Example3c"
                                style={{ color: "#ccc" }}
                              >
                                Your User Name:
                              </label>
                              <input
                                type="username"
                                id="form3Example3c"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="form-control"
                                style={{ backgroundColor: "#2c2c2c", color: "#fff" }}
                              />
                              <small>{errors.username && <div className="text-danger">{errors.username}</div>}</small>
                            
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label
                                className="form-label"
                                htmlFor="form3Example3c"
                                style={{ color: "#ccc" }}
                              >
                                Your Email
                              </label>
                              <input
                                type="email"
                                id="form3Example3c"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                style={{ backgroundColor: "#2c2c2c", color: "#fff" }}
                              />
                              <small>{errors.username && <div className="text-danger">{errors.email}</div>}</small>

                            </div>
                          </div>
  
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label
                                className="form-label"
                                htmlFor="form3Example4c"
                                style={{ color: "#ccc" }}
                              >
                                Password: 
                              </label>
                              <input
                                type="password"
                                id="form3Example4c"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                style={{ backgroundColor: "#2c2c2c", color: "#fff" }}
                              />
                              <small>{errors.username && <div className="text-danger">{errors.password}</div>}</small>
                            </div>
                          </div>
  
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label
                                className="form-label"
                                htmlFor="form3Example4cd"
                                style={{ color: "#ccc" }}
                              >
                                Repeat your password:
                              </label>
                              <input
                                type="password"
                                id="form3Example4cd"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-control"
                                style={{ backgroundColor: "#2c2c2c", color: "#fff" }}
                              />
                              <small>{errors.username && <div className="text-danger">{errors.password}</div>}</small>
                            </div>
                          </div>
  
                          <div className="form-check d-flex justify-content-center mb-3">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              name="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onChange={handleChange}
                              id="form2Example3c"
                              style={{ backgroundColor: "#2c2c2c", color: "#fff" }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="form2Example3"
                              style={{ color: "#ccc" }}
                            >
                              I agree to all statements in{" "}
                              <a href="#!" style={{ color: "#4caf50" }}>Terms of service</a>
                            </label>
                          </div>
                        {success && <div className="alert alert-success">Registation Successfull</div>}
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            {loading ?(
                                <button
                                type="submit"
                                className="btn btn-success btn-lg"
                                disabled
                              >
                                <FontAwesomeIcon icon={faSpinner} spin className="me-2 bg-success"/>
                                Please Wait.....
                              </button>
                            ):(
                              <button
                                type="submit"
                                className="btn btn-success btn-lg"
                              >
                                Register
                              </button>
                            )
                          }
                            
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
  
  export default Register;
