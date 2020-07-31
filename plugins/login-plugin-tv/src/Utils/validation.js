import * as Yup from "yup";

const message = "Incorrect email or password.";
const invalidEmailMessage = "Invalid email";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email(invalidEmailMessage)
    .required(message),
  password: Yup.string().label("Password").required(message),
});

export default validationSchema;
