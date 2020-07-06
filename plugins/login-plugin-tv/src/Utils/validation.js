import * as Yup from "yup";

const message = "Incorrect username or password.";

const validationSchema = Yup.object().shape({
  username: Yup.string().label("Username").required(message),
  password: Yup.string().label("Password").required(message),
});

export default validationSchema;
