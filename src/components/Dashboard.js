import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';

import PageNotFound from './PageNotFound';

import Card from './Card';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';


export default function Dashboard() {

    let loggedin = useSelector(state => state.auth.isAuthenticated);
    let token = useSelector(state => state.auth.token);
    let [loans, setLoans] = useState([]);

    useEffect(() => {

        async function getData() {
            let loansData = await axios.get(baseUrl+'loans/all', { headers: { Authorization: `Bearer ${token}` } });
             //console.log(loansData.data.loans);
            loansData = loansData.data.loans;
            loansData.map((x, i) => {
                x.id = i+1;
                x.fixed = (x.fixed ==='fixed') ? 'Fixed' : 'Floating';
                x.issuedOn = new Date(x.issuedOn).toUTCString();
                x.strt = new Date(x.strt).toUTCString();
                x.exp = new Date(x.exp).toUTCString();
                return x;
            });
            setLoans(loansData);

        }
        getData();
    }, [token]);
    if (!loggedin) {
        return (
            <PageNotFound />
        );
    } else {
        const columns = [
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'amount', headerName: 'Amount', width: 150 },
            { field: 'strt', headerName: 'Starting Date', width: 250 },
            { field: 'exp', headerName: 'Expiry Date', width: 250 },
            {
                field: 'emi',
                headerName: 'EMI',
                type: 'number',
                width: 200
            },
            {
                field: 'fixed',
                headerName: 'Fixed/Floating',
                sortable: false,
                width: 150
            },
            {
                field: 'issuedOn',
                headerName: 'Issued On',
                type: 'date',
                width: 300
            },
        ];

        return (
            <div className="col dashboard" >
                <div className="row" style={{ justifyContent: 'flex-start', margin: '1em' }}>
                    <Card value={loans.length} description="Total Loans" />
                    <Card value={loans.filter((x) => x.fixed === 'Fixed').length} description="Fixed Loans" />
                    <Card value={loans.filter((x) => x.fixed === 'Floating').length} description="Floating Loans" />
                </div>

                <div style={{ height: window.innerHeight / 2, width: '90%', margin: '1em', border: '2px solid #3F51B5', }}>
                    <DataGrid columns={columns} rows={loans}

                        // sortModel={[
                        //     {
                        //         field: 'issuedOn',
                        //         sort: 'desc',
                        //     },
                        // ]}
                    />
                </div>

            </div>
        )
    }
}
