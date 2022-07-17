import { TodoItem } from '../types';
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import { Button } from "react-bootstrap";

interface Props {
  item: TodoItem;
  completeTask: (selectedTodo: TodoItem) => void;
  deleteTask: () => void;
  show: () => void;
}

export const ListItem = ({ item, completeTask, deleteTask, show }: Props) => {
  return (
    <div className='task'>
      <FormCheckLabel className='task_label'>
        <FormCheckInput
          className='task_checkbox'
          type='checkbox'
          checked={item.completed}
          onChange={() => completeTask(item)} />
        <h6 className='task_text' style={{
          textDecoration: item.completed ? 'line-through' : 'none',
        }}>
          {item.text}
        </h6>
      </FormCheckLabel>
      <Button className='task_edit' onClick={() => show()} />
      <Button className='task_delete' onClick={() => deleteTask()} />
    </div>
  );
};
