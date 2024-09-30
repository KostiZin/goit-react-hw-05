import { Field, Form, Formik } from "formik";
import s from "./SearchForm.module.css";
import toast, { Toaster } from "react-hot-toast";

const SearchForm = ({ handleChangeQuery }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    values.query === ""
      ? toast.error("Please, type the name of a movie")
      : handleChangeQuery(values.query);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <Field className={s.input} name="query" placeholder="Type here..." />
          <button className={s.btn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchForm;
