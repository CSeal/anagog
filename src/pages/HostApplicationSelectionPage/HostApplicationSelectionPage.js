import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Select from '../../components/Select';
import Button from '../../components/Button';
import * as ROUTES from '../../navigations/routeMap';

@inject('routing')
@inject('activeUser')
@inject('applicationsStore')
@observer
export default class HostApplicationSelectionPage extends Component {
  componentDidMount(){
    const { applicationsStore } = this.props;
    applicationsStore.setApplicationsFromServer();
  }

  render(){
    const { applicationsStore, activeUser } = this.props;
    const applicationsItems = toJS(applicationsStore.applications)
    const currentVersions = [];
    const currentBuilds = [];
    const applications = applicationsItems && applicationsItems.reduce((acc, item) => {
      acc.push({
        label: item.AppName,
        value: item._id,
        key: item._id,
      });
      if (applicationsStore.getSelectedApplication ===  item._id && item.Versions) {
        item.Versions.forEach(versionsItem => {
          currentVersions.push({
            label: versionsItem.Version,
            value: versionsItem._id,
            key: versionsItem._id,
          });
          if (applicationsStore.getSelectedVersion === versionsItem._id && versionsItem.Builds) {
            versionsItem.Builds.forEach(buildsItem => {
              currentBuilds.push({
                label: buildsItem.Build,
                value: buildsItem._id,
                key: buildsItem._id,
              });
            });
          }
        });

      }
      return acc;
    }, []);
    return (
      <>
        <h3>
          { applicationsStore.getSelectedApplication? 'Aplication Selected' : 'Select Application'}
        </h3>
        <Select
          noneLabel='Select Applications'
          valuesForSelect={applications}
          selectedValue={applicationsStore.getSelectedApplication}
          handleChange={applicationsStore.selectApplication}
          selectName='select-app'
          labelForSelect='Application Name'
        />
        { applicationsStore.getSelectedApplication && activeUser.canDelete && (
          <Button
            color='secondary'
            title='Delete Application'
            action={()=>console.log('must be modal for delete')}
          />
        )}
        { !applicationsStore.getSelectedApplication && (
          <Button
            title='Create New'
            action={this.createNewApplications}
          />
        )}
        {
          applicationsStore.getSelectedApplication && (
            <>
              <Select
                noneLabel='None'
                valuesForSelect={currentVersions}
                selectedValue={applicationsStore.getSelectedVersion}
                handleChange={applicationsStore.selectVersion}
                selectName='select-version'
                labelForSelect='Version'
              />
              <Select
                noneLabel='None'
                valuesForSelect={currentBuilds}
                selectedValue={applicationsStore.getSelectedBuild}
                handleChange={applicationsStore.selectBuild}
                selectName='select-build'
                labelForSelect='Build'
              />
              <h4>Comments</h4>
              <p>{applicationsStore.getBuildComment}</p>
              <Button
                title='Upload Configurations'
                action={()=>console.log('Upload Configurations in the fiature')}
              />
              <Button
                title='Download Configurations'
                action={()=>console.log('Download Configurations in the fiature')}
              />
              <Button
                title='Edit Users'
                action={()=>console.log('Edit Users in the fiature')}
              />
            </>
          )
        }
      </>
    )
  }
  createNewApplications = () => {
    const { routing } = this.props;
    routing.push(ROUTES.createApplication);
  }
}
