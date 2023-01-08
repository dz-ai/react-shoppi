import {BsChevronDoubleDown, BsChevronDoubleUp} from "react-icons/bs";
import {useState} from "react";
import './headerStyles/dropdown.css';

function Dropdown({options, categoryValue, setCategoryValue}) {

    const optionShow = 'options-show';
    const optionHide = 'options-hide';

    const [optionsShow, setOptionShow] = useState(optionHide);

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
        <>
            <div className={optionsShow !== optionShow ? "hover select container" : "select container"}
                 onClick={handleDropdown}>
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

        </>
    );
}

export default Dropdown;