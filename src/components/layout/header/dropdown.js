import {BsChevronDoubleDown, BsChevronDoubleUp} from "react-icons/bs";
import {useRef, useState} from "react";
import './headerStyles/dropdown.css';
import {useOutClick} from "../../../Utils-and-Hooks/useOutClick";

function Dropdown({options, categoryValue, setCategoryValue}) {

    const ref = useRef();

    const optionShow = 'options-show';
    const optionHide = 'options-hide';

    const [optionsShow, setOptionShow] = useState(optionHide);

    useOutClick(ref, null ,setOptionShow)

    const handleDropdown = () => {
        if (optionsShow === optionHide) {
            setOptionShow(optionShow);
        } else {
            setOptionShow(optionHide);
        }
    };

    const handleOption = (currentCategory) => {
        setCategoryValue(currentCategory);
        setOptionShow(optionHide);
    };

    return (

            <div
                ref={ref}
                className={optionsShow !== optionShow ? "hover select container" : "select container"}
                 onClick={handleDropdown}
            >
                {optionsShow === optionHide && <BsChevronDoubleDown className="icon"/>}

                {categoryValue}
                <section className={optionsShow}>
                    {options.map((category, index) =>
                        <div
                            key={category}
                            className="option container"
                            onClick={() => handleOption(category)}
                        >
                            {optionsShow === optionShow && index === 0 && <BsChevronDoubleUp className="icon"/>}
                            {category}
                        </div>)}
                </section>
            </div>

    );
}

export default Dropdown;