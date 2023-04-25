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

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { delToCart } from "../actions"

export const Cart = () => {
    const DUMMY_POINTS = 20

    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true)
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

    if (cartItems.length === 0) {
        return <div className="cart">There are no items in your cart.</div>
    }
    const cart = cartItems.map((item) => (
        <div className="cart_item" key={item.id}>
            <img src={item.imageUrl} width="50px" height="50px" alt="{item.title}" />
            <div className="cart_block">
                <p className="cart_itemName">{item.title}</p>
                <p className="cart_price">${item.price}</p>
            </div>
            <p className="cart_stock">{item.stock}</p>

	    <Button variant="outlined" color="primary" size="small"
                onClick={() => {
                    dispatch(delToCart(item))
                }}
            >
            Delete
            </Button>
        </div>
    ))
    return (
        <div className="cart">
            <p className="cart_title">In your cart</p>
            <div>{cart}</div>
            <div className="cart_total">Total Amount: ${totalPrices}</div>
	    <div className="cart_purchage">
	      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
		Purchase
	      </Button>
	    </div>
	    <Dialog open={open} onClose={handleClose}>
              <DialogTitle>{"Confirm"}</DialogTitle>
	      <FormGroup sx={{"margin-left": "2.5rem"}}>
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
		<DialogContentText sx={{"margin-top": "1.5rem"}}>
		  Would you like to buy?
		</DialogContentText>
              </DialogContent>
              <DialogActions>
		<Button onClick={handleClose} >Cancel</Button>
		<Button onClick={handleClose} >OK</Button>
              </DialogActions>
	    </Dialog>
        </div>
    )
}
