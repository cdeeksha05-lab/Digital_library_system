function PrimaryButton({

    text,

    color,

    onClick

}){

    return(

        <button

            className={`btn btn-${color} action-btn`}

            onClick={onClick}

        >

            {text}

        </button>

    )

}

export default PrimaryButton;