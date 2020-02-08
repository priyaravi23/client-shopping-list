import React, {useState, useEffect} from 'react';
import Items from "./components/items";
import {listItems} from "./api";

export default function App() {
    const [items, setItems] = useState({});
    const fetchItems = async () => {
        const res = await listItems();
        console.log(res.data);
        setItems(res.data);
    };
    const cb = () => {
        fetchItems().then().catch();
    };
    useEffect(cb, [true]);
    return (<div>
        <Items fetchItems={fetchItems} items={items}/>
    </div>);
}