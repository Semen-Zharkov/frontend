import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import './seachForDocumentation.css';

const SeachForDocumentation=({onClick})=>{
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const datas= [{name: 'datapk'}, {name:'data1250'}]
    const apiUrl = process.env.REACT_APP_API_URL;
    const apiUrlFront = process.env.REACT_APP_API_FRONT_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();
    const handleNameClick = (event) =>{
        onClick(event)
    }
    const copyTextToClipboard = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          console.log('Текст успешно скопирован в буфер обмена!');
        } catch (err) {
          console.error('Ошибка:', err);
        }
      };

    const fetchData = async () => {
        try {
            // Отправка запроса на выход пользователя
            const response = await fetch(`${apiUrl}/docks/my`, {
                method: 'GET',
                credentials: 'include', // Убедитесь, что куки прикрепляются к запросу
            });
            // setIsLoggedIn(false);
            // Проверка успешности выполнения запроса на выход
            if (response.ok) {
                setData(await response.json());
                // Выполните здесь необходимые действия после выхода пользователя (например, перенаправление на страницу входа)
            } else {
                console.error('Logout request failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []); // Вызовите fetchData только при монтировании компонента

    return (
        <form className="dropdown-container" action="#" method="POST" onSubmit={handleSubmit(fetchData)}>
            <div className="dropdown">
                <button onClick={toggleDropdown}>Открыть список</button>
                {isOpen && data.length > 0 && (
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>
                                {item['name']}
                                <button onClick={() => copyTextToClipboard(`${apiUrlFront}/request_test?documentation=${item['name']}`)}>URL для теста</button>
                                <button onClick={() => copyTextToClipboard(`${apiUrlFront}/request_answer_questions?documentation=${item['name']}`)}>URL для вопроса</button>
                            </li>
                        ))}

                    </ul>
                )}
            </div>
        </form>
    );
}
export default SeachForDocumentation;