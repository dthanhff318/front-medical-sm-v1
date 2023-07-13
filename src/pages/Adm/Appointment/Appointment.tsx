import React, { useEffect } from 'react';
import s from './Home.module.scss';
import useService from './service';

// const client = ZoomMtgEmbedded.createClient();

export default function Appointment() {
  const { dataService } = useService();

  // useEffect(() => {
  //   // Khởi tạo client và cấu hình
  //   const CLIENT_ID = 'YOUR_CLIENT_ID';
  //   const API_KEY = 'YOUR_API_KEY';
  //   const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  //   const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  //   gapi.load('client:auth2', () => {
  //     gapi.client.init({
  //       apiKey: API_KEY,
  //       clientId: CLIENT_ID,
  //       discoveryDocs: DISCOVERY_DOCS,
  //       scope: SCOPES,
  //     });

  //     gapi.client.load('calendar', 'v3', () => {
  //       // API đã sẵn sàng để sử dụng
  //       // Tiếp theo, bạn có thể triển khai các chức năng của bạn ở đây
  //     });
  //   });
  // }, []);

  return (
    <div>
      <h2>Cuộc họp</h2>
      <div id="meetingSDKElement"></div>
      <button onClick={() => {}}>Join Meeting</button>
    </div>
  );
}
