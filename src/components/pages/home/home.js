import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import AddDragon from "../add-dragon/addDragon";
import * as actions from "../../../store/actions/";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCard, MDBCardBody, MDBCardText } from 'mdbreact';
import Menu from "../../../containers/menu/menu";

const Home = props => {

  const [isAddingNew, setIsAddingNew] = useState(false)

  const onClickDragonHandler = event => {
    props.history.push({ pathname: `/dragon/${event.id}`, state: event });
  };

  const formatDate = date => {
    return new Date(date).toDateString();
  };

  const addDragonHandler = () => {
    setIsAddingNew(!isAddingNew);
  }
  let list = <p>Loading</p>;
  if (!props.loading) {
    list = props.dragonsList.map(dragon => {
      return (
        <Fragment>
          <MDBContainer key={dragon.id}>
            <MDBRow center>
              {/* <MDBCol md="0" sm="6"> */}
              <MDBCard className="text-center m-3" style={{ width: "22rem", cursor: "pointer", backgroundColor: "#F5F5F5" }} >
                <hr style={{ backgroundColor: "purple", height: 1 }} />
                <MDBCardBody  onClick={onClickDragonHandler.bind(this, dragon)}>
                  <img width="160rem" src="https://i1.sndcdn.com/avatars-000339898322-9sq0en-t500x500.jpg" className="rounded mx-auto d-block" alt="dragao" />
                  <MDBCardText className='mt-4' style={{ color: "#83508B" }}>
                    <strong className="h4">{dragon.name}</strong>
                  </MDBCardText>
                  <MDBCardText style={{ color: "#83508B" }} >
                    <strong className="h6">ID: </strong>
                    <strong className="h6">{dragon.id}</strong>
                  </MDBCardText>
                  <MDBCardText style={{ color: "#83508B" }} >
                    <strong className="h6">Tipo: </strong>
                    <strong className="h6">{dragon.type}</strong>
                  </MDBCardText>
                  <MDBCardText style={{ color: "#83508B" }} >
                    <strong className="h6">Data: </strong>
                    <strong className="h6">{formatDate(dragon.createdAt)}</strong>
                  </MDBCardText>
                </MDBCardBody>
                <hr style={{ backgroundColor: "purple", height: 1 }} />
              </MDBCard>
              {/* </MDBCol> */}
            </MDBRow>
          </MDBContainer>
        </Fragment>
      )
    });
  }

  return (
    <Fragment>
      <Menu></Menu>
      <MDBRow className='d-flex justify-content-center' style={{ marginTop: "30px", cursor: "pointer" }} >
        <MDBCol className='mb-3 mt-5'  >
          <span onClick={addDragonHandler}>
            <MDBBtn size="lg" color="secondary" fixed="top" >
              <MDBIcon icon="plus" size="2x" className="mr-2" style={{ }}/>
              <strong className="h5 text-center">   Criar Dragão</strong>
            </MDBBtn>
          </span>
        </MDBCol>
      </MDBRow>
      <div>
        {isAddingNew && <AddDragon />}
      </div>
      <div>
        {props.error && <p>{props.error}</p>}
      </div>
      {list}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    dragonsList: state.dragonList.dragons,
    loading: state.dragonList.loading,
    error: state.dragonList.error,
    wasCreated: state.dragon.wasCreated,
    wasUpdate: state.dragonList.wasUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetDragonsList: () => dispatch(actions.getDragonsList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
