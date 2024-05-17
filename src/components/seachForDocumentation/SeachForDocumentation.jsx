import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import './seachForDocumentation.css';
import { useAuth } from '../../scripts/usersMe';
import { RemovingDocumentation } from '../../scripts/removingDocumentation';

const SeachForDocumentation = ({ onClick }) => {
    const { userData } = useAuth(); // Состояние isLoggedIn
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;
    const apiUrlFront = process.env.REACT_APP_API_FRONT_URL;
    const { register, reset, handleSubmit } = useForm();

    const copyTextToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Ошибка:', err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Отправка запроса при загрузке страницы
                const response = await fetch(`${apiUrl}/docks/my`, {
                    method: 'GET',
                    credentials: 'include', // Убедитесь, что куки прикрепляются к запросу
                });
                if (response.ok) {
                    setData(await response.json());
                } else {
                    console.error('Проблема поиска');
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchData();
    }, [apiUrl]);

    const removingDoc = (doc_name) => {
        RemovingDocumentation(doc_name);
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown">
                {isOpen && data.length > 0 ? (
                    <ul className='documentation-list'>
                        {data.map((item, index) => (
                            <li key={index} className='documentation-list-item'>
                                <h3 className='title'>{item['name']}</h3>
                                <p className='description'>{item['description']}</p>
                                <button className='btn-add' onClick={() => copyTextToClipboard(`${apiUrlFront}/request_documentation?documentation=${item['name']}`)}>
                                    Получить ссылку
                                </button>
                                {/* <button onClick={() => removingDoc(item['name'])}>Удалить документацию</button> */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>Вы не добавили ни одной документации</div>
                )}
            </div>
        </div>
    );
};

export default SeachForDocumentation;