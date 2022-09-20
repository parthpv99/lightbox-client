export default function validateStartProject(values) {
  let errors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required.";
  } else if (!/(?=.[A-Za-z]+)/.test(values.title)) {
    errors.title = "Title is not valid.";
  } else if (values.title.trim().length < 5) {
    errors.title = "Title is too short";
  } else if (values.title.trim().length > 50) {
    errors.title = "Title is too long";
  }

  if (!values.description.trim()) {
    errors.description = "Project Description is required";
  } else if (values.description.trim().length < 10) {
    errors.description = "Project Description too short";
  }

  if (!values.requirementDescription.trim()) {
    errors.requirementDescription =
      "Project Requirement Description is required";
  } else if (values.requirementDescription.trim().length < 10) {
    errors.requirementDescription =
      "Project Requirement Description too short";
  }

  return errors;
}
