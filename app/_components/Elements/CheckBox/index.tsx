import styles from './checkbox.module.scss';

export interface SelectedCheckbox {
  checked: boolean;
  value: string | number;
  name: string;
}

interface Props {
  label: string;
  value: string | number;
  category: string;
  changeHandler: ({ checked, value, name }: SelectedCheckbox) => void;
}

export const CheckBox = ({ label, value, category, changeHandler }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected: SelectedCheckbox = {
      checked: event.target.checked,
      value: value,
      name: label,
    };
    changeHandler(selected);
  };

  return (
    <label className={styles.checkbox_group}>
      <input
        className={styles.checkbox}
        type="checkbox"
        value={value}
        name={category}
        onChange={onChange}
      />
      <span className={styles.checkbox_text}> {label}</span>
    </label>
  );
};
