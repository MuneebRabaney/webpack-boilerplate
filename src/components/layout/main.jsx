import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.div`
  background-color: yellow;
`;

class Main extends Component {
  constructor() {
    super();
  }

  handleOnDivClick() {
    console.log('im clicked');
  }

  render() {
    return (
      <Container onClick={this.handleOnDivClick}>
        <span>hi from container</span>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    exampleReducer: state,
  };
}

export default connect(mapStateToProps)(Main);
