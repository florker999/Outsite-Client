import ConfirmSignUpError from "../utils/ConfirmSignUpError";

export default interface IFormState {
    message: string,
    formData: FormData,
    error?: ConfirmSignUpError
}