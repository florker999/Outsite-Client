import { LuBike, LuPlane } from "react-icons/lu";
import Form from "./Form";
import { ITrophyForm, Trophy } from "./TrophiesGallery";

interface IProps {
    formAction(formData: FormData): any,
    disabled?: boolean
}

export default function NewTrophyForm(props: IProps) {
    return (
        <Form<ITrophyForm>
            title={"New trophy"}
            submitButtonTitle="Create"
            formAction={props.formAction}
            disabled={props.disabled}
            fields={[
                {
                    key: 'title',
                    title: 'Title'
                },
                {
                    key: 'description',
                    title: 'Description'
                },
                {
                    key: 'iconType',
                    title: 'Icon',
                    type: 'radio',
                    choices: [
                        {
                            value: 'plane',
                            element: <Trophy icon={<LuPlane />} />
                        },
                        {
                            value: 'bike',
                            element: <Trophy icon={<LuBike />} />
                        }
                    ]
                }
            ]}
        />
    )
}