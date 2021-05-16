import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chart from "react-google-charts";
const useStyles = makeStyles({
    root: {
        width: '90vw',
        margin: '1em',
        border: '2px solid #3F51B5',
        overflowX: 'scroll'
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function LoanCalc({ amount, strt, exp, setEmi, rate }) {
    const classes = useStyles();
    
    useEffect(() => {
        setEmi(emi);
    });

    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    let emi = 0, time = 0, interest = 0, total = 0;
    amount = Number(amount);
    
    if (amount > 0) {
        time = monthDiff(new Date(strt), new Date(exp));
        rate = Number(rate) / 1200;
        let a = (Math.pow((1 + rate), time) - 1);
        let b = (rate * Math.pow((1 + rate), time));
        emi = amount * (b / a);


        interest = emi * time - amount;
        total = amount + interest;
        // console.log({ time, rate, emi, interest, strt, exp, a, b });
    }


    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>

                <Typography variant="h5" component="h2" style={{ borderBottom: '1px solid #3F51B5' }}>
                    EMI: {Math.round(emi * 100) / 100} Every Month
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Interest: {Math.round(interest * 100) / 100}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total amount to be paid: {Math.round(total * 100) / 100}
                </Typography>

                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart...</div>}
                    data={[
                        ['Fund Type', 'Amount'],
                        ['Amount', (amount / total) * 100],
                        ['Interest', (interest / total) * 100],

                    ]}
                    options={{
                        title: 'Loan Breakup',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </CardContent>

        </Card>
    );
}
