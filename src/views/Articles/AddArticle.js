import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from 'components/Input/Input';
import Heading from 'components/Heading/Heading';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import plusIcon from 'assets/icons/plus.svg';
import iksIcon from 'assets/icons/iks.svg';
import { Formik, Form } from 'formik';
import slugs from 'slugs';

const StyledWrapper = styled.div`
  border-left: 10px solid ${({ theme }) => theme.add};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 10px 30px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: white;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-top: 20px;
`;

const StyledTextarea = styled(Input)`
  margin-top: 20px;
  height: 30vh;
`;

const Error = styled.span`
  color: red;
  font-weight: ${({ theme }) => theme.light};
`;

const AddArticle = ({ create, onToggle, onCreate }) => (
  <StyledWrapper create={create}>
    <Heading>Add User</Heading>
    <Formik
      initialValues={{
        title: '',
        content: '',
      }}
      validate={(values) => {
        const errors = {};
        if (values.title.length < 3 || values.title.length > 50) {
          errors.title = 'The filed must have between 3 to 50 characters';
        }
        // if (!values.title.unique) {
        //   errors.title = 'The title has been already taken';
        // }
        if (values.content.length < 10) {
          errors.content = 'The filed must have min. 10 characters';
        }
        return errors;
      }}
      onSubmit={(values) => {
        onCreate(values);
      }}
    >
      {({ values, errors, touched, isSubmitting, handleChange }) => (
        <StyledForm>
          <StyledInput
            type="text"
            placeholder="title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title && touched.title && <Error>{errors.title}</Error>}
          <StyledTextarea
            type="text"
            as="textarea"
            placeholder="content"
            name="content"
            value={values.content}
            onChange={handleChange}
          />
          {errors.content && touched.content && <Error>{errors.content}</Error>}
          <ButtonIcon type="submit" icon={plusIcon} disabled={isSubmitting} />
          <ButtonIcon icon={iksIcon} cancel onClick={onToggle} />
        </StyledForm>
      )}
    </Formik>
  </StyledWrapper>
);

AddArticle.propTypes = {
  onCreate: PropTypes.func.isRequired,
  create: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default AddArticle;
