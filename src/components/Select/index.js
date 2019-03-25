import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class CustomSelect extends Component {
  render(){
    const {
      classes,
      noneLabel,
      valuesForSelect,
      selectedValue='',
      handleChange,
      selectName,
      labelForSelect,
    } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <FormHelperText>{labelForSelect}</FormHelperText>
          <Select
            value={selectedValue}
            onChange={handleChange}
            input={<Input />}
            displayEmpty={!!noneLabel}
            name={selectName}
            className={classes.selectEmpty}
          >
            {noneLabel && (
              <MenuItem value="">
              <em>{noneLabel}</em>
              </MenuItem>
            )}
            {
              valuesForSelect && valuesForSelect.map(({key, label, value}) => (
                <MenuItem key={key} value={value}>{label}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
    )
  }
}

export default withStyles(styles)(CustomSelect);
