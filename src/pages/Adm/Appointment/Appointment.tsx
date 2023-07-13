import React, { useEffect } from 'react';
import s from './Home.module.scss';
import useService from './service';
import { google } from 'googleapis';
import { gapi } from 'gapi-script';

// const client = ZoomMtgEmbedded.createClient();

export default function Appointment() {
  const { dataService } = useService();

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Cuộc họp</h2>
      <iframe src="https://example.com/meetingsdk" allow="camera; microphone"></iframe>
    </div>
  );
}
