import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

const field = [
  {
    name: 'login',
    label: 'User name',
    placeholder: 'John Smith',
    rules: 'required|string|between:8,25',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Insert Password',
    rules: 'required|string|between:8,16',
  }
];

export default function ({fields, hooks}) {
  class MobxForm extends Form {
    plugins() {
      return {
        dvr: dvr(validatorjs),
      };
    }
    setup() {
      return {
        fields,
      }
    }
    hooks(){
      return {
        ...hooks
      }
    }
  };

  return new  MobxForm();
}

