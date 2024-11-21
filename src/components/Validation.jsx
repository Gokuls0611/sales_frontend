export const validatePhoneNumber = (number) => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };

export const validateEmail = (mail) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(mail)
  }
