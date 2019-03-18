import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function CustomButton(props) {
  const { classes } = props;
  const { variant, color, text , disabled = false , fullWidth=false} = props;
  return (
    <div>
      <Button
        onClick={props.onClick}
        disabled={disabled}
        variant={variant}
        color={color}
        fullWidth={fullWidth}
        className={classes.button}>
        {text}
      </Button>
    </div>
  );
}



export default withStyles(styles)(CustomButton);