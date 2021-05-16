import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth:200,
    margin:'1em',
    border:'2px solid #3F51B5'
  },
 
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard({value, description}) {
  const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        
        <Typography variant="h5" component="h2" style={{borderBottom:'1px solid #3F51B5'}}>
          {value}
        </Typography>
     
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         {description}
        </Typography>
      </CardContent>
     
    </Card>
  );
}
