import React, { useEffect, useState } from 'react';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

import Logo from '../../assets/images/logo-blue.png';
import { loginActions } from '../../store/actions';
import ActionForm from '../../components/Form/ActionForm';
import FormLogin, { validationSchema, initialErrors } from './componens/FormLogin';
import { defaultDiscardObject } from '../../helpers';
import { getUserCountry, getUserIp } from './middleware'

const LoginForm = ({ loginActs, history, error, initialValues }) => {

  const [userIp, setUserIp] = useState('');
  const [userCountry, setUserCountry] = useState('');

  const getNameBrowserAndOs = async () => {
    const ip = await getUserIp();
    setUserIp(ip);
    const country = await getUserCountry(ip);
    setUserCountry(country);
  };

  useEffect(() => {
    getNameBrowserAndOs();
  }, []);

  const onLogin = (data) => {
    //loginActs.requestLogin(data.username, data.password, userIp, userCountry);
    debugger
    history.push('/')
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh', background: '#e9ecef' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Image src={Logo} style={{ paddingLeft: 35, paddingRight: 35 }} size="medium" verticalAlign="middle" />
        <Segment stacked>
          <ActionForm
            onSubmit={onLogin}
            initialValues={initialValues}
            validationSchema={validationSchema}
            initialErrors={initialErrors}
            submit={'Iniciar sesison'}
            className="modal-form-clearance"
            withRoute={false}
            validateOnChange={false}
            confirmMessageProps={defaultDiscardObject}
          >
            <FormLogin />
          </ActionForm>
          {error && <Message error content={error} />}
          <Message>
            ¿Registrar Nuevo? <a href='/#'>registre</a>
          </Message>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

LoginForm.propTypes = {
  history: PropTypes.shape({}),
  initialValues: PropTypes.shape({}),
};

const mapStateToProps = ({ login }) => {
  const error = login.get("error") || "";
  return {
    error,
  };
};

const mapDispatchToProps = dispatch => ({
  loginActs: bindActionCreators(loginActions, dispatch),
});

const withCompose = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);
export default withCompose(LoginForm);
