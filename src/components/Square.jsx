export default function Square({ value, onClick, isDisabled }) {
  return (
    <button disabled={isDisabled} className="square" onClick={onClick}>
      {value}
    </button>
  );
}
