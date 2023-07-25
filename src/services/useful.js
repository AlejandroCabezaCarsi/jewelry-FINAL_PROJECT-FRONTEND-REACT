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
  
      default:
        console.log("Unknown format");
    }
  };
  