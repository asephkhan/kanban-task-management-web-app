import './Button.css'

const Button = ({text, onClick}) => {

    
    return (
        <div className='button__container'>
            <button  className="button" onClick= {onClick}>{text}</button>
        </div>
    )
}

export default Button