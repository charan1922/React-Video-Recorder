import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Step1, Step2, Step3 } from '../components'


const tutorialSteps = [
    {
        label: 'SAY : campaign cue1',
    },
    {
        label: 'SAY : campaign cue2',
    },
    {
        label: 'SAY : campaign cue3',
    },

];

const styles = theme => ({
    root: {
        maxWidth: "100%",
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
});

class TextMobileStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };
    renderStep = (activeStep) => {
        switch (activeStep) {
            case 0:
                return (
                    <Step1 />
                );
            case 1:
                return (
                    <Step2 />
                );
            default:
                return (
                    <Step3 />
                )
        }
    }

    render() {
        const { classes, theme } = this.props;
        const { activeStep } = this.state;
        const maxSteps = tutorialSteps.length;

        return (
            <div className={classes.root}>
                <Paper square elevation={0} className={classes.header}>
                    <Typography>{tutorialSteps[activeStep].label}</Typography>
                </Paper>
                {/* <img
          className={classes.img}
          src={tutorialSteps[activeStep].imgPath}
          alt={tutorialSteps[activeStep].label}
        /> */}
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
            </Button>
                    }
                />
                <div style={{ paddingTop: 15 }}>
                    {this.renderStep(activeStep)}
                </div>
            </div>
        );
    }
}

TextMobileStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TextMobileStepper);
