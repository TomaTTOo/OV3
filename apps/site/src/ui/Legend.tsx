import styles from './Legend.module.css';

export type LegendMark = 'capacity' | 'over' | 'capacityOnLight' | 'overOnLight' | 'capacityLine';
type Props = { items: readonly { label: string; mark: LegendMark }[]; centred?: boolean };

/** What each colour or line of a picture means, in words: colour is never the only signal. */
export function Legend({ items, centred = false }: Props) {
  return (
    <p className={centred ? `${styles.legend} ${styles.centred}` : styles.legend}>
      {items.map((item) => (
        <span key={item.label} className={`${styles.key} ${styles[`${item.mark}Text`] ?? ''}`}>
          <span className={`${styles.mark} ${styles[item.mark]}`} />
          {item.label}
        </span>
      ))}
    </p>
  );
}
