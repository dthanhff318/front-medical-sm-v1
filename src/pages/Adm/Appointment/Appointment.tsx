import React, { useEffect } from 'react';
import s from './Home.module.scss';
import useService from './service';
import { ZoomMtg } from '@zoomus/websdk';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

const client = ZoomMtgEmbedded.createClient();
export default function Appointment() {
  const { dataService } = useService();
  const initZoom = () => {
    let meetingSDKElement = document.getElementById('meetingSDKElement');
    if (meetingSDKElement) client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US' });
  };

  const joinMeet = () => {
    client.join({
      sdkKey: '!212',
      signature: 'Sdsd',
      meetingNumber: '111111',
      password: '123',
      userName: 'dthanh',
    });
  };

  useEffect(() => {
    initZoom();
  }, []);

  let authEndpoint = '';
  let sdkKey = '';
  let meetingNumber = '123456789';
  let passWord = '';
  let role = 0;
  let userName = 'React';
  let userEmail = '';
  let registrantToken = '';
  let zakToken = '';
  let leaveUrl = 'http://localhost:3000';

  return (
    <div>
      <h2>Cuộc họp</h2>
      <div id="meetingSDKElement"></div>
      <button onClick={joinMeet}>Join Meeting</button>
    </div>
  );
}
