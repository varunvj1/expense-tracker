import React, { useState, useContext } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ExpenseTrackerContext } from "../../../context/context"
import { incomeCategories, expenseCategories } from "../../../constants/categories"
import formatDate from '../../../utils/formatDate'
import { v4 as uuidv4 } from "uuid"

import useStyles from "./styles"

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date())
}

const Form = () => {
    //For styling
    const classes = useStyles()

    //Store data in a state
    const [formData, setFormData] = useState(initialState)

    //Use context to store data in the GLOBAL state (add functionality)
    const { addTransaction } = useContext(ExpenseTrackerContext)
    const createTransaction = () => {
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }

        //Call the addTransaction method of the context
        addTransaction(transaction)

        //Reset the form data to INITIALSTATE after clicking CREATE
        setFormData(initialState);
    }

    //Change category for different type (whether Income or Expense)
    const selectedCategory = formData.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    ...
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategory.map((category) => (
                            <MenuItem key={category.type} value={category.type}> {category.type} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Amount" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form
