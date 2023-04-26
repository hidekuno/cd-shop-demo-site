import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import Container from '@mui/material/Container'

import { useSelector, useDispatch } from "react-redux"
import { delToCart } from "../actions"

export const Cart = () => {
    const DUMMY_POINTS = 20

    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => { setOpen(false) }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	setChecked(event.target.checked)
    }

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)
    const totalPrices = cartItems.map((item) => item.totalPrice).reduce((a, b) => a + b, 0)
    const calcTotalPrices = (total, checked) => {
	const result = checked? total - DUMMY_POINTS : total
	return (0 > result)? 0 : result
    }
    const cartClass = {
            margin: "2rem",
            display: "grid",
            justifyContent: "center",
            borderTop: "1px solid #d0d0d0",
            paddingTop:"1rem"
        }

    if (cartItems.length === 0) {
        return <Container sx={cartClass}>There are no items in your cart.</Container>
    }
    const cart = cartItems.map((item) => (
        <Container sx={{
                       display: "flex",
                       alignItems: "center",
                       margin: "0.1rem"
                   }}>
            <img src={item.imageUrl} width="45px" height="45px" alt="{item.title}" />

            <Container sx={{
                           width: "600px",
                           marginLeft: "0.2rem"
                       }}>
                <p className="cart_item">{item.title}</p>
                <p className="cart_price">${item.price}</p>
            </Container>
            <p className="cart_stock">{item.stock}</p>

	    <Button variant="outlined" color="primary" size="small"
                onClick={() => {
                    dispatch(delToCart(item))
                }}
            >
            Delete
            </Button>
        </Container>
    ))
    return (<Container sx={cartClass}>
                <p className="cart_title">In your cart</p>
                <Container>{cart}</Container>
                <Container sx={{
                    marginTop: "1.0rem",
                    fontSize: "1.2rem",
                    color: "red",
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    Total Amount: ${totalPrices}
                    <Button variant="outlined" color="primary" onClick={handleClickOpen} sx={{marginLeft: "2.0rem"}}>
		        Purchase
	            </Button>
	        </Container>
	        <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{"Confirm"}</DialogTitle>
	            <FormGroup sx={{marginLeft: "2.5rem"}}>
		        <FormControlLabel
		            control={<Switch checked={checked} onChange={handleChange} name="points" />}
		            label="Use Points" />
	            </FormGroup>
                    <DialogContent>
		        <DialogContentText
		            sx={{
		                color: 'success.dark',
		                display: 'inline',
		                fontWeight: 'bold',
		                mx: 0.5,
		                fontSize: 16,
		            }}>
		            Total Amount: ${calcTotalPrices(totalPrices,checked)}
		        </DialogContentText>
		        <DialogContentText sx={{marginTop: "1.5rem"}}>
		            Would you like to buy?
		        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
		        <Button onClick={handleClose} >Cancel</Button>
		        <Button onClick={handleClose} >OK</Button>
                    </DialogActions>
	        </Dialog>
            </Container>)
}
