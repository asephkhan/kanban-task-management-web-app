import './Button.css'

const Button = ({text}) => {

    
    return (
        <div className='button__container'>
            <button type='submit' className="button" onClick={() => console.log("clicked")}>{text}</button>
        </div>
    )
}

export default Button