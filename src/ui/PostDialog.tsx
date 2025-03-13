import IPost from "@/lib/models/IPost";
import WithId from "@/lib/models/WithId";
import Dialog from "./Dialog";
import { DataList } from "@chakra-ui/react";

interface IProps {
    post: WithId<IPost>,
    close(): any,
}

export default function PostDialog(props: IProps) {
    const { title, content } = props.post;
    
    return (
        <Dialog close={props.close}>
            <DataList.Root>
                <DataList.Item>
                    <DataList.ItemLabel>Title</DataList.ItemLabel>
                    <DataList.ItemValue>{title}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel>Content</DataList.ItemLabel>
                    <DataList.ItemValue>{content}</DataList.ItemValue>
                </DataList.Item>
            </DataList.Root>
        </Dialog>
    )
}