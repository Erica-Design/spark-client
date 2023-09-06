interface CheckProps {
    isChecked?: boolean | "";
}


const Check = ({ isChecked = false }: CheckProps) => {
    return <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="check">
            <path id="Vector" d="M12 3L5.125 10L2 6.81818" stroke={`${isChecked ? "black" : "#c4c4c4"}`} strokeLinecap="square" />
        </g>
    </svg>;
}

export default Check;
