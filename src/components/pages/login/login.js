import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon, MDBTooltip, MDBBox } from 'mdbreact';


const Login = props => {
  const credentials = { username: "", password: "" };

  const [formData, setFormData] = useState(credentials);

  useEffect(() => {
    if (props.isLoggedIn) {
      props.history.push('/home');
    }
  }, [props.history, props.isLoggedIn]);


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
      {/* <MDBContainer> */}
      <MDBRow className='d-flex justify-content-center'>
        <MDBCol className='text-white'>
          <form onSubmit={submitHandler} >
            <p className="h3 text-center">
              <strong className='font-weight-bold'>
                BEM VINDO
                 </strong>
            </p>
            <MDBInput
              label="LOGIN"
              icon="user"
              id="username"
              size="lg"
              background
              outline
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
              outline
              group
              type="password"
              validate
              error="wrong"
              success="right"
              onChange={changeHandler}
              value={formData.password}
            />
            {/* <div className="text-center"> */}
            <MDBBox display="flex" justifyContent="center">
                <MDBTooltip placement="bottom">
                <MDBBtn type="submit" size="sm" className="ml-5 p-3" flat gradient="purple">
                  <span className="h5 text-center" > Entrar</span>
                  <MDBIcon icon="dragon" className="ml-3" size="2x" />
                </MDBBtn>
                <div> Dica: admin/admin</div>
              </MDBTooltip>
            </MDBBox>
          </form>
        </MDBCol>
      </MDBRow>
      <MDBRow center className='white-text'>
        {props.error && <p>{props.error}</p>}
      </MDBRow>
      {/* </MDBContainer> */}
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
