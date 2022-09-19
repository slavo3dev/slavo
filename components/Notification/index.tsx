import ReactDOM from 'react-dom';
import { FC } from 'react';
import classes from './notification.module.css';

interface Props
{ 
    title: string, 
    message: string,
    status: string
}


export const Notification: FC<Props> = ( { title, message, status } ) => {
 

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}


