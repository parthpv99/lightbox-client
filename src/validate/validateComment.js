export default function validateComment(values) {
  let errors = {};

  if (!values.comment.trim()) {
    errors.comment = "Comment text is required.";
  }

  return errors;
}
