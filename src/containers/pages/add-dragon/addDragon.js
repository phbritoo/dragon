import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';
import { updateObject } from "../../../shared/utility";
import * as actions from "../../../store/actions";
import { MDBInput, MDBBtn, MDBIcon, MDBRow } from 'mdbreact';
import Menu from "../../../components/menu/menu";
import FooterPage from "../../../components/footer/footer";


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
      alert("Dragão cadastrado com sucesso!");
    }
    event.preventDefault();
    document.getElementById('form').style.display = 'none'
  }

  const changeHandler = event => {
    const { id, value } = event.target;
    setNewDragon({ ...newDragon, [id]: value });
  };

  return (

    <Fragment>
      <Menu></Menu>
      <form id="form" onSubmit={submitHandler} style={{ margin: "-20px" }}>
        <MDBInput
          label="Nome"
          type="text"
          id="name"
          style={{ margin: "0 auto" }}
          placeholder="Nome:"
          background
          group
          validate
          required
          onChange={changeHandler}
        />
        <MDBInput
          type="text"
          id="type"
          style={{ margin: "0 auto" }}
          placeholder="Tipo:"
          onChange={changeHandler}
          label="Tipo"
          validate
          required
          background
          group
        />
        <div className="text-center mt-0" style={{ margin: "0 auto" }}>
          <MDBBtn type="submit" gradient="purple">
            <strong className="h5 text-center" > Salvar</strong>
            <MDBIcon icon="save" className="ml-2" size="2x" />
          </MDBBtn>
        </div>

      </form>
      {props.error && <p>{props.error}</p>}
      <MDBRow center className="fixed-bottom">
        <FooterPage></FooterPage>
      </MDBRow>
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
