import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';


const Login = props => {
  const credentials = { username: "", password: "" };

  const [formData, setFormData] = useState(credentials);

  useEffect(() => {
    if (props.isLoggedIn) {
      props.history.push('/home');
    }
  }, [props.isLoggedIn]);


  const changeHandler = event => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const submitHandler = event => {
    props.onLogin(formData);
    event.preventDefault();
  };

  return (
    <Fragment>
      <MDBContainer>
        <MDBRow className='d-flex justify-content-center'>
          <MDBCol md='6' className='mt-5 text-white'>
            <form onSubmit={submitHandler} >
              <p className="h3 text-center mb-4">
                <strong className='font-weight-bold'>
                  BEM VINDO
                 </strong>
              </p>
              <div>
                <MDBInput
                  label="LOGIN"
                  icon="user"
                  id="username"
                  size="lg"
                  background
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={changeHandler}
                  value={formData.username}
                />
                <MDBInput
                  label="SENHA"
                  icon="lock"
                  id="password"
                  size="lg"
                  background
                  group
                  type="password"
                  validate
                  error="wrong"
                  success="right"
                  onChange={changeHandler}
                  value={formData.password}
                />
              </div>
              <div className="text-center">
                <MDBBtn type="submit" gradient="purple">
                  <strong className="h5 text-center" > Entrar</strong>
                  <MDBIcon icon="dragon" className="ml-3" size="2x" />
                </MDBBtn>
              </div>

            </form>
          </MDBCol>
        </MDBRow>
        <MDBRow center className='d-flex justify-content-center mb-5'>
            {props.error && <p>{props.error}</p>}
        </MDBRow>
      </MDBContainer>
    </Fragment>

  );
};


const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onLogin: (formData) => dispatch(actions.login(formData))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
