import React from 'react';
import PageNotFound from './PageNotFound';

import { useSelector } from 'react-redux';

import LoanForm from './LoanForm';


export default function NewLoan() {
    let loggedin = useSelector(state => state.auth.isAuthenticated);
    let token = useSelector(state => state.auth.token);
   

    if (!loggedin) {
        return (
            <PageNotFound />
        );
    }

    return (
      <LoanForm token={token} />
    );
}
