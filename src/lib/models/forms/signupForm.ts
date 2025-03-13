import ILoginForm from "./loginForm";

export default interface ISignupForm extends ILoginForm{
    email: string,
    confirmPassword: string,
}