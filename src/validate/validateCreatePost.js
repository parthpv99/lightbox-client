export default function validateEditProfile(values) {
  let errors = {};

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  } else if (values.description.trim().length < 10) {
    errors.description = "Description too short.";
  }

  return errors;
}
