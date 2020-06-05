import React from 'react';
import Input from 'components/Input/Input';
import Heading from 'components/Heading/Heading';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import plusIcon from 'assets/icons/plus.svg';
import iksIcon from 'assets/icons/iks.svg';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
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
// slug: article.slug,
const EditArticle = ({ article, toggleEdit, onUpdate }) => {
  return (
    <StyledWrapper>
      <Heading>Edit Article: {article.title}</Heading>
      <Formik
        initialValues={{  title: article.title, content: article.content }}
        validate={(values) => {
          const errors = {};
          if (values.title.length < 3) {
            errors.title = 'The filed must have min. 3 characters';
          }
          if (values.content.length < 10) {
            errors.content = 'The filed must have min. 10 characters';
          }
          return errors;
        }}
        onSubmit={({ title, content }) => {
          onUpdate({ slug: slugs(title), title, content });
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
            <ButtonIcon onClick={toggleEdit} icon={iksIcon} cancel />
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  );
};

export default EditArticle;
