import { observable, action, computed } from 'mobx';
import applicationApi from '../services/api/applicationsApi'
import moment from 'moment';

class ApplicationsStore {
  @observable applications;
  @observable loaded;
  @observable selectedApplication;
  @observable selectedVersion;
  @observable selectedBuild;
  @observable buildComment;
  constructor(){
    this.applications = null;
    this.loaded = false;
    this.selectedApplication = '';
    this.selectedVersion = '';
    this.selectedBuild = '';
    this.buildComment = ''
  }

  @computed get getSelectedApplication(){
    return this.selectedApplication;
  }

  @computed get getSelectedVersion(){
    return this.selectedVersion;
  }

  @computed get getSelectedBuild(){
    return this.selectedBuild;
  }

  @computed get getBuildComment(){
    return this.buildComment;
  }

  @action('get all aplications')
  async setApplicationsFromServer(){
    if(this.loaded) {
      return;
    }
    const response = await applicationApi.getApplications();
    if (response.status){
      this.applications = response.data;
      this.loaded = true;
    }
  }

  @action('select application')
  selectApplication = ({target}) => {
    this.selectedApplication = target.value;
    if (target.value === '') {
      this.selectedVersion = '';
      this.selectedBuild = '';
      this.buildComment = ''
      return;
    }
    let actualVersion = '';
    let actualVersionDate = '';
    let actualVersionObj = null;
    let actualBuild = '';
    let buildComment = '';
    for (let key in this.applications) {
      if (this.applications[key]._id === target.value) {
        const currenAppVersions = this.applications[key].Versions;
        if (!currenAppVersions) {
          return;
        }
        for (let versionKey in currenAppVersions) {
          const currentVersion = currenAppVersions[versionKey]
          if (actualVersion === '') {
            actualVersion = currentVersion._id;
            actualVersionDate = currentVersion.Version;
            actualVersionObj = currentVersion;
            continue;
          }
          if (moment(actualVersionDate).isBefore(currentVersion.Version)) {
            actualVersion = currentVersion._id;
            actualVersionDate = currentVersion.Version;
            actualVersionObj = currentVersion;
          }
        }
        const builds = actualVersionObj.Builds
        if (!builds || !builds.length) {
          this.selectedVersion = actualVersion;
          this.selectedBuild = '';
          this.buildComment = '';
          return;
        }
        for (let buildKey in builds) {
          const currentBuild = builds[buildKey];
          if (currentBuild.Build === actualVersion.ActiveBuild) {
            actualBuild = currentBuild._id;
            buildComment = currentBuild.Comment;
            break;
          }
          actualBuild = currentBuild._id;
          buildComment = currentBuild.Comment;
        }
        this.selectedVersion = actualVersion;
        this.selectedBuild = actualBuild;
        this.buildComment = buildComment;
        break;
      }
    }
  }

  @action('select version')
  selectVersion = ({target}) => {
    this.selectedVersion = target.value;
    if(target.value === ''){
      this.selectedBuild = '';
      this.buildComment = '';
      return;
    }
    for (let key in this.applications) {
      if (this.applications[key]._id === this.selectedApplication) {
        const currentVersions = this.applications[key].Versions;
        for (let versionKey in currentVersions) {
          if (currentVersions[versionKey]._id === this.selectedVersion) {
            const currentBuilds = currentVersions[versionKey].Builds;
            if (!currentBuilds || !currentBuilds.length){
              this.selectedBuild = '';
              this.buildComment = '';
              return;
            }
            let selectedBuild = '';
            let buildComment = '';
            for (let currentBuildKey in currentBuilds) {
              const currentBuild = currentBuilds[currentBuildKey];
              if (currentVersions[versionKey].ActiveBuild === currentBuild.Build){
                selectedBuild = currentBuild._id;
                buildComment = currentBuild.Comment;
                break;
              }
              selectedBuild = currentBuild._id;
              buildComment = currentBuild.Comment;
            }
            this.selectedBuild = selectedBuild;
            this.buildComment = buildComment;
            break;
          }
        }
        break;
      }
    }
  }

  @action('select build')
  selectBuild = ({target}) => {
    this.selectedBuild = target.value;
    if (target.value === '') {
      this.buildComment = '';
      return;
    }
    for (let key in this.applications) {
      if (this.applications[key]._id === this.selectedApplication) {
        const currentVersions = this.applications[key].Versions;
        for (let currentVersionKey in currentVersions) {
          if (currentVersions[currentVersionKey]._id === this.selectedVersion) {
            const currentVersionBuilds = currentVersions[currentVersionKey].Builds;
            for (let currentBuildKey in currentVersionBuilds) {
              if (currentVersionBuilds[currentBuildKey]._id === this.selectedBuild) {
                this.buildComment = currentVersionBuilds[currentBuildKey].Comment;
                break;
              }
            }
            break;
          }
        }
        break;
      }
    }
  }
}

export default new ApplicationsStore();
