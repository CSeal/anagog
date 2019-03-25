module.exports = {
  AnagogDefaultConfig: {
    Metadata: {
      Build: 10,
      Comment: 'Update Urls to stating and change path of schedule and profile',
      Version: '2018-12-18 13:00',
    },
    Operational: {
      ActivityRecognition: {
        Active: true,
        DBSizeLimit: {
          MaxRows: -1,
          MaxTime: -1,
          RowsToDelete: 0,
          TimeToDelete: 0,
        },
        Notify: true,
        Report: {
          Horizontal: {
            Interval: 1440,
            MaxRetryTime: 240,
            Unmetered: 1,
            Url: 'https://url/reports/activities/'
          }
        }
      }
    }
  }
};