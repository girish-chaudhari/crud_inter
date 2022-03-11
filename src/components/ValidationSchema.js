import * as Yup from "yup";

export const ToDoUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[aA-zZ\s]+$/, "Only numbers are allowed for this field "),

  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "Invalid Email"
    ),

  mobile: Yup.string()
    .required("Mobile no is required")
    .matches(/^[0-9]*$/, "Only numbers are allowed. ")
    .min(10, "the number must be 10 digit"),

  project: Yup.string()
    .required("Project Name is required")
    .matches(/^[A-Z\s]+$/, "Project Name should be in Alphabate"),

  task: Yup.string()
    .required("Task is required")
    .min(3, "minimum length must be 3")
    .max(30, "max length must be 30"),

  start_time: Yup.date()
    .required("start date is required")
    .default(() => new Date()),

  end_time: Yup.date()
    .required("end date is required")
    .when(
      "start_time",
      (start_time, schema) => start_time && schema.min(start_time)
    ),
  // status: Yup.boolean().required("status is required"),
});
