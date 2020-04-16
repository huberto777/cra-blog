import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import AuthTemplate from 'templates/AuthTemplate';
import Heading from 'components/Heading/Heading';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { Link, Redirect } from 'react-router-dom';
import { routes } from '../../routes';
import AuthContext from '../../context/AuthContext';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 20px 0 0 0;
  height: 40px;
  width: 300px;
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 20px 0 0 0;
  height: 40px;
  width: 300px;
`;

const Error = styled.span`
  color: red;
  font-weight: ${({ theme }) => theme.light};
`;

function Login() {
  const { onLoginAttempt, accessToken, errorMessage } = useContext(AuthContext);
  return (
    <>
      {accessToken && <Redirect to={routes.home} />}
      <AuthTemplate>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (values.email.length < 3) {
              errors.email = 'Login must have min. 3 characters';
            }
            if (!values.password) {
              errors.password = 'Password is required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              onLoginAttempt(values);
              setSubmitting(false);
            }, 1000);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            isSubmitting,
            /* and other goodies */
          }) => {
            return (
              <>
                {errorMessage ? <h3 style={{ color: 'red' }}>{errorMessage}</h3> : null}
                <Heading>Login</Heading>
                <StyledForm>
                  <StyledInput
                    name="email"
                    placeholder="email"
                    type="text"
                    onChange={handleChange}
                    value={values.email}
                  />
                  {errors.email && touched.email && <Error>{errors.email}</Error>}
                  <StyledInput
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                  {errors.password && touched.password && <Error>{errors.password}</Error>}
                  <StyledButton type="submit" disabled={isSubmitting} cancel>
                    login in
                  </StyledButton>
                  <StyledLink to={routes.register}>I want my account</StyledLink>
                </StyledForm>
              </>
            );
          }}
        </Formik>
      </AuthTemplate>
      )
    </>
  );
}

export default Login;
