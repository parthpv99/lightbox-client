export default function validateEditProfile(values) {
  let errors = {};

  if (!values.fname.trim()) {
    errors.fname = "Firstname is required.";
  } else if (!/^[A-Za-z]+$/.test(values.fname.trim())) {
    errors.fname = "Firstname is not valid.";
  }

  if (!values.lname.trim()) {
    errors.lname = "Lastname is required.";
  } else if (!/(?=.[A-Za-z]+)/.test(values.lname.trim())) {
    errors.lname = "Lastname is not valid.";
  }

  if (!values.title.trim()) {
    errors.title = "Title is required.";
  } else if (!/(?=.[A-Za-z]+)/.test(values.title.trim())) {
    errors.title = "Title is not valid.";
  } else if (values.title.trim().length > 75) {
    errors.title = "Title too long";
  }

  if (!values.semester) {
    errors.semester = "Semester is required.";
  }

  if (!values.branch) {
    errors.branch = "Branch is required.";
  }

  return errors;
}
