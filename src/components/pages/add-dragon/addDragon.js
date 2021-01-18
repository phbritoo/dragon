import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';
import { updateObject } from "../../../shared/utility";
import * as actions from "../../../store/actions";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';


const AddDragon = props => {
  const [newDragon, setNewDragon] = useState({
    name: "",
    type: "",
    createdAt: new Date().toString(),
    histories: []
  });

  const submitHandler = event => {
    if (newDragon.name.length > 0 && newDragon.type.length > 0) {
      const creationDate = new Date().toString();
      const histories = [];
      const newDragonUpdate = updateObject(newDragon, { createdAt: creationDate, histories: histories })
      setNewDragon({ ...newDragonUpdate });
      props.createDragon(newDragon)
    }
    event.preventDefault();
    alert("Dragão cadastrado com sucesso!");
  }

  const changeHandler = event => {
    const { id, value } = event.target;
    setNewDragon({ ...newDragon, [id]: value });
  };

  return (

    <Fragment>
      <MDBContainer>
        <MDBRow className='d-flex justify-content-center'>
          <MDBCol >
            <form onSubmit={submitHandler} >
              <MDBInput
                label="Nome"
                type="text"
                id="name"
                placeholder="Nome:"
                background
                group
                validate
                onChange={changeHandler}
              />
              <MDBInput
                type="text"
                id="type"
                placeholder="Tipo:"
                onChange={changeHandler}
                label="Tipo"
                validate
                background
                group
              />
              <div className="text-center">
                <MDBBtn type="submit" gradient="purple">
                  <strong className="h5 text-center" > Salvar</strong>
                  <MDBIcon icon="save" className="ml-3" size="2x" />
                </MDBBtn>
              </div>

            </form>
          </MDBCol>
        </MDBRow>
        <MDBRow className='d-flex justify-content-center'>
          <MDBCol md='3' className='mt-4 text-white'>
            {props.error && <p>{props.error}</p>}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Fragment>

  );
}

const mapStateToProps = state => {
  return {
    error: state.dragon.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createDragon: (newDragon) => dispatch(actions.createDragon(newDragon))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDragon);
