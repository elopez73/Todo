import React, { useState, useEffect, useContext, useCallback } from 'react';
import styles from '../styles/DynamicList.module.css';
import axios from "axios";
import { AuthContext } from "./AuthContext";
const DynamicList = () => {
    const [title, setTitle] = useState('');
    const [item, setItem] = useState('');
    const [items, setItems] = useState([]);
    const [savedLists, setSavedLists] = useState([]);
    const [selectedListIndex, setSelectedListIndex] = useState(-1);
    const { user } = useContext(AuthContext);
    const id = user?.id;
    const api = process.env.REACT_APP_API_SITE;
    const clearList = () => {
        setTitle('');
        setItems([]);
        setSelectedListIndex(-1);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);

    };

    const handleItemChange = (event) => {
        setItem(event.target.value);
    };

    const addItem = () => {
        if (item.trim() !== '') {
            setItems([...items, item]);
            setItem('');
        }
    };

    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const saveList = async (title, items, user_Id, selectedListIndex) => {
        const list_id = savedLists[selectedListIndex]?.list_id;
        const newList = { title, items, user_Id, list_id };
        try {
            const response = await axios.post(`${api}/api/lists/saveList`, newList);
            if (response) {
                fetchSavedLists();
            }
        } catch (error) {
            console.error('Error saving list:', error);
        }
    };
    const deleteList = async (selectedListIndex) => {

        const listId = savedLists[selectedListIndex].list_id;

        if (selectedListIndex !== -1) {
            try {
                await axios.delete(`${api}/api/lists/${listId}/removeList`);
                clearList();
                const updatedSavedLists = savedLists.filter((_, index) => index !== selectedListIndex);
                setSavedLists(updatedSavedLists);
                setSelectedListIndex(-1);
            } catch (error) {
                console.error('Error deleting list:', error);
                alert('Failed to delete list.');
            }
        }
    };
    const fetchSavedLists = useCallback(async () => {
        try {
            const response = await axios.get(`${api}/api/lists/${id}/getList`);

            setSavedLists(response.data);

        } catch (error) {
            console.error('Error fetching saved lists:', error);
        }
    }, [id, api]);
    useEffect(() => {
        if (id) fetchSavedLists();
    }, [fetchSavedLists, id]);

    const loadList = (index) => {
        setSelectedListIndex(index);
        setTitle(savedLists[index].list_name);
        setItems(savedLists[index].items);
        console.log(savedLists[index].items);
        console.log(savedLists[index].items?.item_name);
    };

    const isSavedListSelected = selectedListIndex !== -1;


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>To-Do List</h1>
                <p className={styles.headerSubtitle}>Create, save, and manage your lists</p>
            </header>
            <button onClick={() => deleteList(selectedListIndex)} className={styles.button}>Delete List</button>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <h3>Saved Lists:</h3>
                    <ul className={styles.savedList}>
                        {savedLists.map((list, index) => (
                            <li
                                key={index}
                                className={styles.savedListItem}
                                onClick={() => loadList(index)}
                            >
                                {list.list_name}
                                {isSavedListSelected && selectedListIndex === index && (
                                    <ul className={styles.savedSubList}>
                                        {list.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className={styles.savedSubListItem}>
                                                {item}

                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`${styles.listWrapper} ${isSavedListSelected ? styles.sideWrapper : ''}`}>
                    <button onClick={() => saveList(title, items, id, selectedListIndex)} className={styles.button}>Save List</button>
                    <button onClick={clearList} className={styles.button}>Clear List</button>
                    <div className={styles.header}>
                        <input
                            type="text"
                            placeholder="Enter list title"
                            value={title}
                            onChange={handleTitleChange}
                            className={styles.input}

                        />

                    </div>
                    <h2 className={styles.headerTitle}>{title}</h2>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Add Item:</label>
                        <input
                            type="text"
                            placeholder="Enter item"
                            value={item}
                            onChange={handleItemChange}
                            className={styles.input}
                        />
                        <button className={styles.button} onClick={addItem}>Add</button>
                    </div>
                    <ul className={styles.list}>
                        {items.map((item, index) => (
                            <li key={index} className={styles.listItem}>
                                {item}
                                <button className={styles.button} onClick={() => removeItem(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DynamicList;
