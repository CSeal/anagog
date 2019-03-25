import authApi from '../services/api/authApi'
import * as ROUTES from '../navigations/routeMap';

export default function({activeUser, routing}) {
  return {
      fields: [
      {
        name: 'userName',
        label: 'User name',
        placeholder: 'John Smith',
        rules: 'required|string|between:5,25',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Insert Password',
        rules: 'required|string|between:8,16',
      }
    ],
    hooks: {
      async onSuccess(form){
        const allValues = form.values();
        const response = await authApi.getLogin(allValues);
        if(response.status){
          activeUser.initActiveUser(response.data.user);
          routing.push(ROUTES.root);
        }
      },
      onError(form){
        console.log('All form errors', form.errors());
      }
    }
  }
}