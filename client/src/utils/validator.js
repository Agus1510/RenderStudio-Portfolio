export default function validator(specification, input) {
  const error = {};

  if (specification === "login") {
    if (!input.email) {
      error.email = "Email required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)
    ) {
      error.email = "Invalid Email";
    }

    if (!input.password) {
      error.password = "Password required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.password)
    ) {
      error.password =
        "Minimum 8 characters, at least one uppercase, one lowercase and one number";
    }
  } else if (specification === "register") {
    if (!input.name) {
      error.name = "Nombre requerido";
    } else if (!/[\w ]{4,}$/.test(input.name)) {
      error.name = "Nombre invalido (minimo 4 caracteres)";
    }

    if (!input.username) {
      error.username = "Usuario requerido";
    } else if (!/[\w $&#@]{4,}$/.test(input.username)) {
      error.username =
        "Invalid username (minimum 4 characters). Only these special characters are allowed: [$ & # @]";
    }

    if (!input.email) {
      error.email = "Email required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)
    ) {
      error.email = "Invalid Email";
    }

    if (!input.password) {
      error.password = "Password required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.password)
    ) {
      error.password =
        "Minimum 8 characters, at least one uppercase, one lowercase and one number";
    }

    if (!input.confirmPassword) {
      error.confirmPassword = "Password required";
    } else if (input.confirmPassword !== input.password) {
      error.confirmPassword = "Password does not match";
    }
  } else if (specification === "forgot") {
    if (!input.password) {
      error.password = "Password required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.password)
    ) {
      error.password =
        "Minimum 8 characters, at least one uppercase, one lowercase and one number";
    }

    if (!input.confirmPassword) {
      error.confirmPassword = "Password required";
    } else if (input.confirmPassword !== input.password) {
      error.confirmPassword = "Password does not match";
    }
  }

  return error;
}
