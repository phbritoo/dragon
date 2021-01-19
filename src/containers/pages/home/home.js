import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import AddDragon from "../add-dragon/addDragon";
import * as actions from "../../../store/actions/";
import { MDBBtn, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBCard, MDBCardBody, MDBCardText } from 'mdbreact';
import Menu from "../../../components/menu/menu";
import FooterPage from "../../../components/footer/footer";
import './home.css'

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
        <>
          <MDBRow >
            <MDBCol>
              <MDBCard wide className="card" key={dragon.id}>
                <MDBCardImage
                  className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded'
                  tag='div'
                >
                  <h2 className='h2-responsive mb-2'>{dragon.name}</h2>
                  <p>
                    <MDBIcon icon='calendar-alt' /> {formatDate(dragon.createdAt)}
                  </p>
                </MDBCardImage>
                <MDBCardBody cascade className='text-center' onClick={onClickDragonHandler.bind(this, dragon)}>
                  <MDBCardText style={{ color: "#83508B" }} >
                    <strong className="h5">ID: </strong>
                    <strong className="h5">{dragon.id}</strong>
                  </MDBCardText>
                  <MDBCardText style={{ color: "#83508B" }} >
                    <strong className="h5">Tipo: </strong>
                    <strong className="h5">{dragon.type}</strong>
                  </MDBCardText>

                  <a
                    href='#'
                    onClick={onClickDragonHandler.bind(this, dragon)}
                    className='mt-1 d-flex justify-content-end align-items-center'
                  >
                    <h5>
                      Detalhes{' '}
                      <MDBIcon
                        icon='chevron-right'
                        className='ml-2'
                        size='sm'
                      >

                      </MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </>
      )
    });
  }

  return (
    <>
      <Menu></Menu>
      <MDBRow center> 
        <span style={{ marginTop: "80px" }} onClick={addDragonHandler}>
          <MDBBtn color="secondary"  >
            <MDBIcon icon="plus" size="2x" className="mr-2" />
            <strong className="h5 text-center">   Criar Dragão</strong>
          </MDBBtn>
        </span>
      </MDBRow>
      <>
        {isAddingNew && <AddDragon/>}
      </>
      <>
        {props.error && <p>{props.error}</p>}
      </>
      <div className="container">
        {list}
      </div>
      <FooterPage></FooterPage>
    </>
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
