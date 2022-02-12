import { TodoItem } from "../interface";
import { FormCheck } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";

interface Props {
  item: TodoItem;
  completeTask: (selectedTodo: TodoItem) => void;
}

export const ListItem = ({item, completeTask}: Props) => {

  return (
    <FormCheck>
      <FormCheckInput checked={item.completed} onChange={() => completeTask(item)}/>
      <FormCheckLabel>
        <div style={{textDecoration: item.completed ? 'line-through' : 'none'}}>{item.text}</div>
      </FormCheckLabel>
    </FormCheck>
  )
}