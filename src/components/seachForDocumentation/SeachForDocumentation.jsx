import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import './seachForDocumentation.css';
import { useAuth } from '../../scripts/usersMe';
import { RemovingDocumentation } from '../../scripts/removingDocumentation';

const SeachForDocumentation = ({ onClick }) => {
    const { userData, isAuthChecked } = useAuth(); // Состояние isLoggedIn
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [popupInform, setPopupInform] = useState(''); // Добавленное состояние для попапа
    const apiUrl = process.env.REACT_APP_API_URL;
    const apiUrlFront = process.env.REACT_APP_API_FRONT_URL;
    const { register, reset, handleSubmit } = useForm();

    const copyTextToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setPopupInform('Ссылка успешно скопирована в буфер обмена');
            setTimeout(() => {
                setPopupInform(''); // Скрыть попап через 2 секунды
            }, 2000);
        } catch (err) {
            console.error('Ошибка:', err);
        }
    };

    const clickLink = (item) => {
        copyTextToClipboard(`${apiUrlFront}/request_documentation?documentation=${item['name']}`);
    };

    let userUrl = 'my';
    if (userData.is_superuser) {
        userUrl = 'all';
    }

    useEffect(() => {
        if (isAuthChecked) {
            const fetchData = async () => {
                try {
                    // Отправка запроса при загрузке страницы
                    const response = await fetch(`${apiUrl}/docks/${userUrl}`, {
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
        }
    }, [isAuthChecked, apiUrl, userUrl]);

    const removingDoc = (doc_name) => {
        RemovingDocumentation(doc_name);
    };

    if (!isAuthChecked) {
        return null;
    }

    return (
        <div className="dropdown-container">
            <div className="dropdown">
                {isOpen && data.length > 0 ? (
                    <ul className='documentation-list'>
                        {popupInform && <div className='document-popup'>{popupInform}</div>}
                        {data.map((item, index) => (
                            <li key={index} className='documentation-list-item'>
                                <h3 className='title'>{item['name']}</h3>
                                <p className='description'>{item['description']}</p>
                                <div className='container-button'>
                                    <button className='btn-add' onClick={() => clickLink(item)}>
                                        Получить ссылку
                                    </button>
                                    <button className="button" onClick={() => removingDoc(item['name'])}>Удалить документацию</button>
                                </div>
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