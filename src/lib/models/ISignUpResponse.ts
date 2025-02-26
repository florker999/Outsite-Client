import { TDeliveryMedium } from "./TDeliveryMedium"

export interface ISignUpResponse {
    isUserConfirmed?: boolean,
    confirmation: {
        destination?: string,
        medium?: TDeliveryMedium
    }
}