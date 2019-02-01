import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ErrorAction } from '../../store/ducks/error';

import CloseIcon from '../../assets/images/close.svg';

import Container from './styles';

const ErrorBox = ({ error: { message, visible }, hideError }) =>
  visible && (
    <Container>
      <p>{message}</p>
      <button type="button" onClick={hideError}>
        <img src={CloseIcon} alt="Fechar" />
      </button>
    </Container>
  );

ErrorBox.propTypes = {
  hideError: PropTypes.func.isRequired,
  error: PropTypes.shape({
    visible: PropTypes.bool,
    message: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  error: state.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ErrorAction, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorBox);