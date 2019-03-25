import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { action } from 'mobx';

class CustomButton extends Component {
  render(){
    const {
      color='primary',
      type='button',
      action,
      title,
      href=''
    } = this.props;
    return(
      <Button
        variant='contained'
        color={color}
        type={type}
        onClick={action || false}
        href={href}
      >
        {title}
      </Button>
    )
  }
}

export default CustomButton;
