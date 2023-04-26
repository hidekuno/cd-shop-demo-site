import React from "react"
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

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
        <Box sx={{
                 "padding": "1rem",
                 "border-bottom": "1px solid #d0d0d0",
                 "box-shadow": "1px 1px 3px #b1b1b1"
             }}>
          <img src={item.imageUrl} width="120px" height="120px" alt="{item.title}" />
          <p className="shop_item">{item.title}</p>
          <p className="shop_artist">{item.artist}</p>
          <p className="shop_description">{item.description}</p>
          <p className="shop_price">${item.price}</p>

          <Button variant="contained" color="primary" size="small"
                  onClick={() => {
                      dispatch(addToCart(item.id, item.title, item.price, item.imageUrl))
            }}>
            Add to Cart
          </Button>
        </Box>
    ))
    return (
        <Container sx={{
                       "overflow-x": "scroll",
                       "display": "flex",
                       "gap": "1rem",
                   }}>
          {items}
        </Container>)
}
