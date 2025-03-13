import IFormState from "./IFormState";
import { TDeliveryMedium } from "./TDeliveryMedium";

export default interface ISignupFormState extends IFormState {
    message: string;
    formData: FormData;
    destination?: string,
    medium?: TDeliveryMedium,
    arePasswordsDifferent?: boolean,
}
