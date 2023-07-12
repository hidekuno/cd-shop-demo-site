import React, { useRef, useState } from 'react'
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
import TextField from '@mui/material/TextField'

import { useSelector, useDispatch } from "react-redux"
import { delToCart, clearToCart, delPoint, addPoint } from "../actions"

export const Cart = () => {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const [message, setMessage] = useState("")
  const [mailAddr, setMailAddr] = useState("");
  const [mailError, setMailError] = useState(false)
  const mailAddrRef = useRef(null)

  const validate = () => {

    if (mailAddrRef.current) {
      const v = mailAddrRef.current.validity.valid
      setMailError(!v)
      return(v)
    }
    return false
  }
  const initUi = () => {
    setChecked(false)
    setOpen(false)
  }
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => initUi()
  const handleChange = (event) => setChecked(event.target.checked)

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart)
  const userPoint = useSelector((state) => state.point)
  const totalPrices = cartItems.map((item) => item.totalPrice).reduce((a, b) => a + b, 0)
  const calcTotalPrices = (total, checked) => {
    const result = checked? total - userPoint : total
    return (0 > result)? 0 : result
  }
  const calcPoint = (point, total, checked) => {
    const result = checked? (point - total) : point
    return (0 > result)? 0 : result
  }

  const cartClass = {
    margin: "2rem",
    display: "grid",
    justifyContent: "center",
    borderTop: "1px solid #d0d0d0",
    paddingTop:"1rem"
  }
  const dialogClass = {
    textAlign: "center",
    fontWeight: 'bold',
    mx: 0.5,
    fontSize: 16,
  }

  const handleOk = () => {
    if (!validate()) {
      return
    }
    if (checked) {
      dispatch(delPoint(totalPrices))
    } else {
      dispatch(addPoint(Math.floor(totalPrices/10)))
    }
    dispatch(clearToCart())
    initUi()
    setMessage("Thanks for your purchase.(This is a Demo Program.)")
  }
  if (cartItems.length === 0) {
    return (
      <Container sx={cartClass}>
        <Dialog open={message !== ""} onClose={() => setMessage("")}>
          <DialogTitle>Complete</DialogTitle>
          <DialogContent><DialogContentText>{message}</DialogContentText></DialogContent>
          <DialogActions>
            <Button onClick={() => setMessage("")} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
        There are no items in your cart.
      </Container>
    )
  }
  const cart = cartItems.map((item) => (
    <Container key={item.id}
               sx={{
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
              onClick={() => {dispatch(delToCart(item))}}>
            Delete
      </Button>
    </Container>))

  return (
    <Container sx={cartClass}>
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
        <DialogContent>
          <DialogContentText sx={{...dialogClass}}>
            <span style={{ color: '#1976d2'}}> Your Point: ${calcPoint(userPoint,totalPrices,checked)} </span>
            <FormControlLabel sx={{ paddingLeft: "1rem" }} disabled={(0 >= userPoint)}
              control={<Switch checked={checked} onChange={handleChange} name="points" />}
              label="Use Points" />
          </DialogContentText>
          <FormGroup sx={{marginLeft: "0.5rem"}}>
            <TextField id="email-address"
                       label="Email"
                       margin="dense"
                       sx={{m: 1, width: '50ch'}}
                       type="email"
                       variant="standard"
                       inputRef={mailAddrRef}
                       value={mailAddr}
                       error={mailError}
                       helperText={mailError && mailAddrRef.current && mailAddrRef.current.validationMessage}
                       inputProps={{required: true}}
                       onChange={(e) => setMailAddr(e.target.value)}
                       required/>
          </FormGroup>
        </DialogContent>
        <DialogContent>
          <DialogContentText sx={{...dialogClass, color: 'success.dark'}}>
            Total Amount: ${calcTotalPrices(totalPrices,checked)}
          </DialogContentText>
          <DialogContentText sx={{marginTop: "1.5rem", textAlign: "center"}}>
            Would you like to buy?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button onClick={handleOk} >OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
