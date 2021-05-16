Tax Block Loan Web App
-----------------------

The backend is hosted on Heroku at https://taxblock-server.herokuapp.com/.
The frontend is hosted on AWS Amplify at  https://main.d2rgv2fbcl733s.amplifyapp.com/.

GitHub Links:
Frontend: https://github.com/aashishwastaken/TaxBlock-client
Backend:  https://github.com/aashishwastaken/TaxBloack-server


The main tools for frontend used are:
	-React.js
	-axios
	-@reduxjs/toolkit
	-react-router-dom
	-react-google-charts for visualization
	-Material UI for components
	-react-testing-library
	
The main tools for backend used are:
	-Node.js
	-express
	-mongoose for MongoDB
	-jsonwebtoken for generating tokens
	-bcryptjs to hash passwords
	



==========================================================================
BASIC AMORTIZED LOAN ALGORITHM USED FOR EMI CALCULATION AT RATE:5%

		time = monthDiff(new Date(strt_date), new Date(exp_date));
        rate = Number(rate) / 1200;
        let a = (Math.pow((1 + rate), time) - 1);
        let b = (rate * Math.pow((1 + rate), time));
        emi = amount * (b / a);

        interest = emi * time - amount;
        total = amount + interest;
		
==========================================================================




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
