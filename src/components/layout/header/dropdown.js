import {BsChevronDoubleDown, BsChevronDoubleUp} from "react-icons/bs";
import {useRef, useState} from "react";
import './headerStyles/dropdown.css';
import {useOutClick} from "../../../Utils-and-Hooks/useOutClick";

function Dropdown({options, categoryValue, setCategoryValue}) {

    const ref = useRef();

    const optionShow = 'options-show';
    const optionHide = 'options-hide';

    const [optionsShowState, setOptionShowState] = useState(optionHide);

    useOutClick(ref, null, setOptionShowState)

    const handleDropdown = () => {
        if (optionsShowState === optionHide) {
            setOptionShowState(optionShow);
        } else {
            setOptionShowState(optionHide);
        }
    };

    const handleOption = (currentCategory) => {
        setCategoryValue(currentCategory);
        setOptionShowState(optionHide);
    };

    return (

        <div
            ref={ref}
            className={optionsShowState !== optionShow ? "hover select container" : "select container"}
            onClick={handleDropdown}
        >
            {
                optionsShowState === optionHide &&
                <BsChevronDoubleDown
                    className="icon"
                />
            }
            {
                optionsShowState === optionShow &&
                <BsChevronDoubleUp
                    className="icon"
                />
            }

            {categoryValue}
            <section className={optionsShowState}>
                {options.map((category) =>
                    <div
                        key={category}
                        className="option container"
                        onClick={() => handleOption(category)}
                    >
                        {category}
                    </div>)}
            </section>
        </div>

    );
}

export default Dropdown;