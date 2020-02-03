import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ err: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        this.setState({ err });
      });
    }

    state = {
      err: null
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({err: null});
    }

    render() {
      return(
        <>
          <Modal 
            isActive={!!this.state.err}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.err ? this.state.err.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }
}

export default withErrorHandler;