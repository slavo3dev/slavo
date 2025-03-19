export interface NavigationProps {
	categories: string[];
    userInfo?: any;
  }


export interface DropDownMenuProps {
    label: string;
    items: string[];
    onSelect: (item: string) => void;
    className?: string; 
}