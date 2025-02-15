export default function Circle({ sq, move }) {

  return (

      <div

          className={sq.originalClassName}
          onClick={_ => move(sq.id)}
      >
          {sq.digit}
      </div>

  );
}