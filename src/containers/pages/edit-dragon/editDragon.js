import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as actions from "../../../store/actions/";
import { MDBBtn, MDBRow, MDBIcon, MDBTooltip, MDBInput } from 'mdbreact';
import { history } from '../../../history'
import Menu from "../../../components/menu/menu";
import FooterPage from "../../../components/footer/footer";

const EditDragon = props => {
  const [dragonDetails, setDragonDetails] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [wasDeleted, setWasDeleted] = useState(false)


  useEffect(() => {
    setDragonDetails({
      ...props.location.state
    });
    setWasDeleted(false)
  }, []);

  useEffect(() => {
    if (wasDeleted) {
      props.history.goBack();
    }
  }, [wasDeleted])


  const formatDate = date => {
    return new Date(date).toDateString();
  };

  const changeHandler = (event) => {
    const { id, value } = event.target;
    setDragonDetails({ ...dragonDetails, [id]: value });

  };

  const goBackHandler = () => {
    history.push('/home')
  };

  const saveDragonHandler = () => {
    props.saveDragon(dragonDetails);
    setIsEdit(false);
    alert('Alteração feita com sucesso!')
    history.push('/home')
  }

  const deleteDragonHandler = () => {
    props.deleteDragon(dragonDetails.id);
    setWasDeleted(true);
    alert("Dragão deletado com sucesso!");
    history.push('/home')
  }
  const editDragonHandler = () => {
    setIsEdit(!isEdit);
  };
  const editMode = () => {
    return (
      <>
        <Menu></Menu>
        <MDBInput
          type="text"
          id="name"
          label="Nome"
          value={dragonDetails.name}
          containerClassName="flex-nowrap mb-3"
          onChange={changeHandler}
          size="lg"
          outline
          background
        />
        <MDBInput
          type="text"
          id="type"
          label="Tipo"
          value={dragonDetails.type}
          containerClassName="flex-nowrap mb-3"
          onChange={changeHandler}
          size="lg"
          outline
          background
        />

      </>
    );
  };
  const viewMode = () => {
    return (
      <>
        <Menu></Menu>
        <MDBInput
          label="ID do Dragão"
          hint={dragonDetails.id}
          containerClassName="flex-nowrap mb-3"
          disabled
          size="lg"
          type="text"
          outline
          background

        />
        <MDBInput
          label="Nome do Dragão"
          hint={dragonDetails.name}
          containerClassName="flex-nowrap mb-3"
          disabled
          size="lg"
          type="text"
          outline
          background
        />
        <MDBInput
          label="Tipo do Dragão"
          hint={dragonDetails.type}
          containerClassName="flex-nowrap mb-3"
          disabled
          size="lg"
          type="text"
          outline
          background
        />
        <MDBInput
          label="Data de Criação:"
          hint={formatDate(dragonDetails.createdAt)}
          containerClassName="flex-nowrap mb-3"
          disabled
          size="lg"
          type="text"
          outline
          background
        />
      </>
    );
  };

  const setDisplayMode = () => {
    switch (isEdit) {
      case true:
        return editMode();
      case false:
        return viewMode();
      default:
        return viewMode();
    }
  };

  return (
    <div>
      <Menu></Menu>
      <img width="110rem" style={{ marginTop: "80px" }} src="https://i1.sndcdn.com/avatars-000339898322-9sq0en-t500x500.jpg" className="rounded mx-auto d-block" alt="dragao" />
      {setDisplayMode()}
      {/* Botoes */}
      <MDBRow center className='d-flex justify-content-center mb-4'>
        <span onClick={goBackHandler} >
          <MDBTooltip placement="bottom">
            <MDBBtn href="#" gradient="blue">
              <MDBIcon icon="arrow-left" size="2x" />
            </MDBBtn>
            <div>Voltar</div>
          </MDBTooltip>
        </span>
        {!isEdit && <span onClick={editDragonHandler}>
          <MDBTooltip placement="bottom">
            <MDBBtn href="#" gradient="purple">
              <MDBIcon icon="pen" size="2x" />
            </MDBBtn>
            <div> Editar Dragão</div>
          </MDBTooltip>
        </span>}
        {isEdit && <span onClick={saveDragonHandler}>
          <MDBTooltip placement="bottom">
            <MDBBtn href="#" gradient="purple">
              <MDBIcon icon="save" size="2x" />
            </MDBBtn>
            <div>Salvar</div>
          </MDBTooltip>
        </span>}
        {!isEdit && <span onClick={deleteDragonHandler}>
          <MDBTooltip placement="bottom">
            <MDBBtn href="#" color="danger" outline>
              <MDBIcon icon="trash-alt" size="2x" />
            </MDBBtn>
            <div>Escluir Dragão</div>
          </MDBTooltip>
        </span>}
      </MDBRow>
      <div>
        {props.error && <p>{props.error}</p>}
      </div>

      <MDBRow center className="fixed-bottom">
          <FooterPage></FooterPage>
      </MDBRow>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    successMessage: state.dragon.successMessage,
    error: state.dragon.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDragon: (dragonDetails) => dispatch(actions.saveDragon(dragonDetails)),
    deleteDragon: (dragonId) => dispatch(actions.deleteDragon(dragonId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditDragon);
