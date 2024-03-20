import Square from "./Square";

export default function Rows({ squares, handleClick }) {
  const renderSquares = () => {
    return Array.from({ length: 3 }, (_, row) => (
      <div className="row" key={row}>
        {Array.from({ length: 3 }, (_, col) => {
          const index = row * 3 + col;
          return (
            <Square
              key={index}
              value={squares[index]}
              onClick={() => handleClick(index)}
            />
          );
        })}
      </div>
    ));
  };

  return <div className="rows">{renderSquares()}</div>;
}
