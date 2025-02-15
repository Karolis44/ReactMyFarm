export default function Sq({ sq, move }) {

    return (

        <div

            className={sq.ClassName}
            onClick={_ => move(sq.id)}
        >
            
            {sq.digit}
        </div>

    );
}