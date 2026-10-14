import styles from './Controls.module.css';

type Props<T extends string> = {
  legend: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

/** One choice among a few, as a row of radio buttons. */
export function Choice<T extends string>({ legend, options, value, onChange }: Props<T>) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.label}>{legend}</legend>
      <div className={styles.segments}>
        {options.map((option) => (
          <label
            key={option.value}
            className={option.value === value ? `${styles.segment} ${styles.chosen}` : styles.segment}
          >
            <input
              type="radio"
              name={legend}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
