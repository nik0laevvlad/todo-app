import { TodoItem } from '../types';

interface Props {
  item: TodoItem;
  completeTask: (selectedTodo: TodoItem) => void;
  deleteTask: () => void;
  show: () => void;
}

export const ListItem = ({ item, completeTask, deleteTask, show }: Props) => {
  return (
    <div className='task'>
      <label className='task_label'>
        <input
          className='task_checkbox'
          type='checkbox'
          checked={item.completed}
          onChange={() => completeTask(item)} />
        <h6 className='task_text' style={{
          textDecoration: item.completed ? 'line-through' : 'none',
        }}>
          {item.text}
        </h6>
      </label>
      <button className='task_edit' onClick={() => show()} />
      <button className='task_delete' onClick={() => deleteTask()} />
    </div>
  );
};
