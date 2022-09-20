export default function validateChat(values) {
    let errors = {};

    if (!values.chat.trim()) {
        errors.chat = "Chat text is required.";
    }

    return errors;
}
