/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import React, { Fragment, useContext } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { ShopContext } from '../store'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingTop: 5,
    paddingBottom: 5,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
  }
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    color: theme.palette.common.white
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export const Order = () => {
  // console.log('render Order')

  const state = useContext(ShopContext).state
  const order = state.order
  const doller = (n) => '$' + n
  const rowspan = (row) => row.detail.length + 1

  return (
    <TableContainer component={Paper}>
      <p className='order_title'>Order History</p>
      <Table stickyHeader sx={{ minWidth: 750, tableLayout: 'fixed' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: 150 }}>Order No.</StyledTableCell>
            <StyledTableCell style={{ width: 140 }}>Order Date Time</StyledTableCell>
            <StyledTableCell style={{ width: 40 }}>Payment</StyledTableCell>
            <StyledTableCell style={{ width: 40 }}>Total</StyledTableCell>
            <StyledTableCell style={{ width: 30 }}>Title</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell style={{ width: 30 }}align="right">Price</StyledTableCell>
            <StyledTableCell style={{ width: 30 }}align="right">Qty</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((row, index) => (
            <Fragment key={index}>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row" rowSpan={rowspan(row)}>
                  {row.orderno}
                </StyledTableCell>
                <StyledTableCell rowSpan={ rowspan(row) }>{row.orderDatetime}</StyledTableCell>
                <StyledTableCell rowSpan={ rowspan(row) } align="right">{doller(row.payment)}</StyledTableCell>
                <StyledTableCell rowSpan={ rowspan(row) } align="right">{doller(row.total)}</StyledTableCell>
              </StyledTableRow>
              {row.detail.map((detail, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell><img src={detail.imageUrl} width='30px' height='30px' /></StyledTableCell>
                  <StyledTableCell>{detail.title}</StyledTableCell>
                  <StyledTableCell align="right">{doller(detail.price)}</StyledTableCell>
                  <StyledTableCell align="right">{detail.qty}</StyledTableCell>
                </StyledTableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}