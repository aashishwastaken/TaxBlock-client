import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { FormLabel, FormControlLabel, Radio, RadioGroup, Card, CardContent, Typography, Button } from '@material-ui/core';
import LoanCalc from './LoanCalc';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import baseUrl from '../utils/baseUrl';

const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            margin: '1em',
        },
    },
    card: {
        width: '90vw',
        margin: '1em',
        border: '2px solid #3F51B5'
    }
}));

export default function LoanForm({ token }) {

    const classes = useStyles();

    let history = useHistory();
    let [amount, setAmount] = useState('');
    let [strt, setStrt] = useState(new Date());
    let [exp, setExp] = useState(new Date().setFullYear(new Date().getFullYear() + 1));
    let [emi, setEmi] = useState(null);
    let [fixed, setFixed] = useState('');
    let [rate] = useState(5);
    let [errors, setErrors] = useState(null);


    const handleChange = (event) => {
        setFixed(event.target.value);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        let userInput = { amount, strt: new Date(strt), exp: new Date(exp), emi, fixed };
        try {
            let { data: res } = await axios.post(baseUrl+"loans/new", userInput, { headers: { Authorization: `Bearer ${token}` } });
            // console.log(res);
            if (res.success) {
                setAmount('');
                setTimeout(()=>{
                    alert('New Loan Added Successfully!!');
                    history.push('/dashboard');
                },500);
                
            }
            else {
                setErrors(res.message);
            }
        } catch (err) {
            setErrors(err.response.data.msg);
        }
    }

    return (
        <div className="row" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2" style={{ borderBottom: '1px solid #3F51B5', margin: '1em' }}>
                        New Loan (Our Rate: {rate} %)
                     </Typography>

                    <form onSubmit={(e) => handleSubmit(e)} className={classes.root} noValidate autoComplete="off">
                        <p className="danger" >{errors && `Error: ${errors}`}</p>
                        <TextField
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            label="Amount"
                            color="primary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <TextField

                            type="date"
                            defaultValue={new Date().getFullYear() + '-01-01'}
                            id="strt date"
                            label="Starting Date"
                            onChange={(e) => setStrt(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            type="date"
                            defaultValue={(new Date().getFullYear() + 1) + '-01-01'}
                            id="exp date"
                            label="Expiry Date"
                            onChange={(e) => setExp(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />


                        <FormLabel component="legend">Loan Type</FormLabel>
                        <RadioGroup row aria-label="Fixed/Float" name="fixed" value={fixed} onChange={handleChange}>
                            <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
                            <FormControlLabel value="float" control={<Radio />} label="Float" />

                        </RadioGroup>
                        <Button
                            variant="contained"
                            size="medium"
                            color='primary'
                            onClick={handleSubmit}
                            startIcon={<Add />}
                            style={{float:'right', margin:'1em'}}
                        >
                            Add Loan
            </Button>
                    </form>
                </CardContent>
            </Card>
            <LoanCalc amount={amount} strt={strt} exp={exp} setEmi={setEmi} rate={rate} />
        </div>
    )
}
