import { TodoItem } from "../interface";

interface Props {
  item: TodoItem;
}

export const ListItem = ({item}: Props) => {
  return(
    <div>{item.text}</div>
  )
}