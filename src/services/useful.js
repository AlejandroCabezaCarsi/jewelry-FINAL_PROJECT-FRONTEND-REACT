export const checkError = (name, value) => {
    switch (name) {
      case "email":
      case "e-mail":
      case "correo":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return "El formato de e-mail es incorrecto";
        }
  
        return "";
  
      case "password":
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)){
          return "La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener al menos 8 caracteres.";

        }

        return "";
        
      case "newPassword":
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)){
          return "La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener al menos 8 caracteres.";

        }
      
        return "";
      case "oldPassword":
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)){
          return "La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener al menos 8 caracteres.";

        }
      
        return "";
      case "delete":
        if(!/\bELIMINAR\b/.test(value)){
          return "Debes de escribir ELIMINAR en mayúscula";

        }
      
        return "";
      case "creditCard":
        if(!/^(?:\d{13,19})$/.test(value)){
          return "La tarjeta de crédito debe tener entre 13 y 19 caracteres";

        }
      
        return "";
  
      default:
        console.log("Unknown format");
    }
  };
  