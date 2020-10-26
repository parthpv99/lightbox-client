export default function validateEditProfile(values) {
  let errors = {};

  if (!values.fname) {
    errors.fname = "Firstname is required.";
  } else if (!/^[A-Za-z]+$/.test(values.fname)) {
    errors.fname = "Firstname is not valid.";
  }

  if (!values.lname) {
    errors.lname = "Lastname is required.";
  } else if (!/(?=.[A-Za-z]+)/.test(values.lname)) {
    errors.lname = "Lastname is not valid.";
  }

  if (!values.title) {
    errors.title = "Title is required.";
  } else if (!/(?=.[A-Za-z]+)/.test(values.title)) {
    errors.title = "Title is not valid.";
  }

  if (!values.semester) {
    errors.semester = "Semester is required.";
  }

  if (!values.branch) {
    errors.branch = "Branch is required.";
  }

  return errors;
}
