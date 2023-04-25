import React from "react"
import Button from '@mui/material/Button'

import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { addToCart } from "../actions"

export const Shop = () => {

    const [data, setData] = useState([])
    useEffect(() => {
	const fetchData = async () => {
	    const response = await fetch('cd.json')
	    const jsonData = await response.json()
	    console.log(jsonData)
	    setData(jsonData)
	}
	fetchData()
    }, [])

    const dispatch = useDispatch()
    const items = data.map((item) => (
        <div className="shop_item" key={item.id}>
            <img src={item.imageUrl} width="120px" height="120px" alt="{item.title}" />
            <p className="shop_itemName">{item.title}</p>
            <p className="shop_artist">{item.artist}</p>
            <p className="shop_description">{item.description}</p>
            <p className="shop_itemName">${item.price}</p>

            <Button variant="contained" color="primary" size="small"
                onClick={() => {
                    dispatch(addToCart(item.id, item.title, item.price, item.imageUrl))
                }}
            >
            Add to Cart
            </Button>
        </div>
    ))
    return (<div className="shop">{items}</div>)
}
