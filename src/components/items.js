import React, {useState} from 'react';
import uuid from 'uuid';

import {createItem, deleteItem, updateItem} from "../api";
import '../App.scss';

export default function Items(props) {
    const [item, setItem] = useState({
        id: uuid.v4(),
        item: ''
    });
    const [edit, setEdit] = useState(false);

    const handleItemChange = e => {
        const propName = e.target.dataset.prop;
        setItem({
            ...item,
            [propName]: e.target.value
        });
    };

    const saveItem = async e => {
        if (e.key === 'Enter') {
            let res = edit ? await updateItem({
                ...item
            }) : await createItem({
                ...item
            });
            console.log(res.data);
            props.fetchItems().then().catch();
            setTimeout(() => {
                setItem({
                    id: uuid.v4(),
                    item: ''
                });
            }, 100)
        }
    };

    const handleSaveItemOnClick = async e => {
        let res = edit ? await updateItem({
            ...item
        }) : await createItem({
            ...item
        });
        console.log(res.data);
        props.fetchItems().then().catch();
        setTimeout(() => {
            setItem({
                id: uuid.v4(),
                item: ''
            });
        }, 100)
    };

    const strikeThrough = (e) => {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('done');
        }
    };

    const handleClear = () => {
        const ul = document.querySelector('ul');
        ul.innerHTML = '';
    };

    const handleDeleteItem = async e => {
        try {
            const id = e.currentTarget.dataset.id;
            const item = await deleteItem(id);
            const res = await props.fetchItems();
        } catch (ex) {
            alert('Could not delete the item!');
        }
    };

    const handleEditItem = async e => {
        try {
            const {id} = e.currentTarget.dataset;
            console.log(id);
            setEdit(true);
            setItem({
                ...props.items[id]
            });
        } catch (ex) {
            alert('Could not edit the item!');
        }
    };

    const renderedItems = Object.values(props.items).map(item => <div className="li-wrapper" key={item.id} >
            <li>{item.shoppingItem}</li>
            <div className="div">
                <i className="fa fa-trash"
                   data-id={item.id}
                   onClick={handleDeleteItem}/>

                <i className="fas fa-edit"
                   data-id={item.id}
                   onClick={handleEditItem}/>
            </div>
    </div>);

    return (
        <div className="wrapper">
            <header>
                <h1><i className="fas fa-shopping-basket fa_custom"></i> Shopping List</h1>

                <div className="borderBottom">
                    <div className="borderColor1"></div>
                    <div className="borderColor2"></div>
                    <div className="borderColor3"></div>
                </div>
            </header>
            <input autoFocus
                   type="text"
                   name=""
                   id="userinput"
                   placeholder="enter items"
                   onKeyDown={saveItem}
                   onChange={handleItemChange}
                   data-prop="shoppingItem" />

                <button id="enter"
                        onClick={handleSaveItemOnClick}
                        onChange={handleItemChange}>
                        Enter
                </button>

                <button id="clear"
                        onClick={handleClear}>
                        Clear List
                </button>

                <section>
                    <div className="background-list" id="ulHook">
                        <ul onClick={strikeThrough}>
                            {renderedItems}
                        </ul>
                    </div>
                </section>
        </div>
    );
}
