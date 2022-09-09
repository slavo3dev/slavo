import { FC } from 'react'

type Props = {
    children: React.ReactNode | any;
};


export const Layout: FC<Props> = (props) => {
  return (
     <div className="container">
        {props.children}
    </div>
  )
}

