import { useState } from 'react';
import './App.css';

const initialLogs = [
  { status: 's Jwl', totalSuccess: 10, curSuccess: 3, curAnswerTels: 5, curTotalSended: 7, curTotalTels: 45, strCurSendingNo: '0912...', priority: 3, telFileName: 'calls.txt', projectsId: 1631, endSendTime: '8:07:14 AM', endSendDate: '1404/04/10', startSendTime: '8:05:41 AM', startSendDate: '1404/04/10', prjName: 'P_454_test' },
  { status: 's Jlwl', totalSuccess: 8, curSuccess: 2, curAnswerTels: 4, curTotalSended: 6, curTotalTels: 40, strCurSendingNo: '0912...', priority: 2, telFileName: 'calls.txt', projectsId: 1630, endSendTime: '6:23:10 PM', endSendDate: '1404/03/21', startSendTime: '12:21:12 PM', startSendDate: '1404/03/21', prjName: 'P_539_bedehi01' },
  { status: 'sJyl', totalSuccess: 12, curSuccess: 5, curAnswerTels: 7, curTotalSended: 9, curTotalTels: 50, strCurSendingNo: '0912...', priority: 3, telFileName: 'calls.txt', projectsId: 1626, endSendTime: '6:20:42 PM', endSendDate: '1404/03/20', startSendTime: '9:06:42 AM', startSendDate: '1404/03/20', prjName: 'P_378_ivr bedehkar' },
];

export default function App() {
  const [logs, setLogs] = useState(initialLogs);
  const [telFileName, setTelFileName] = useState('calls.txt');
  const [projectId, setProjectId] = useState('');
  const [priority, setPriority] = useState(3);

  const openTelFileDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) setTelFileName(file.name);
    };
    input.click();
  };

  const addLog = () => {
    setLogs(prev => [
      {
        status: 'Running', totalSuccess: prev.length * 3, curSuccess: 0, curAnswerTels: 0,
        curTotalSended: 0, curTotalTels: 100, strCurSendingNo: '---', priority,
        telFileName, projectsId: projectId || Date.now(), endSendTime: '--:--:--',
        endSendDate: '----/--/--', startSendTime: new Date().toLocaleTimeString('en-US'),
        startSendDate: new Date().toLocaleDateString('fa-IR'), prjName: `P_${projectId || 'auto'}_${Date.now()}`
      }, ...prev
    ]);
  };

  return (
    <div className="app" dir="rtl">
      <section className="toolbar">
        <label>
          فایل تلفن:
          <button type="button" className="browseBtn" onClick={openTelFileDialog}>
            انتخاب...
          </button>
          <span className="fileName">{telFileName}</span>
        </label>

        <label>زنگ (ثانیه) <input type="number" defaultValue={13} /></label>
        <label>ساعت شروع <input type="number" defaultValue={8} /></label>
        <label>شناسه تماس‌گیرنده <input type="number" defaultValue={5000} /></label>
        <label>موج داخلی <input type="checkbox" defaultChecked /></label>
        <label>دقیقه شروع <input type="number" defaultValue={0} /></label>
        <label>شماره ارسال <input type="number" defaultValue={1} /></label>
        <label>تست۱ <input type="number" defaultValue={11} /></label>
        <label>تست۲ <input type="number" defaultValue={12} /></label>
        <label>زنگ اصلی <input type="number" defaultValue={45} /></label>
        <label>شماره موج <input type="number" defaultValue={700} /></label>
        <label>ساعت پایان <input type="number" defaultValue={21} /></label>
        <label>آستانه <input type="number" defaultValue={10000} /></label>
        <label>تست۳ <input type="number" defaultValue={13} /></label>
        <label>اولویت <input type="number" value={priority} onChange={e => setPriority(+e.target.value)} /></label>
        <label>فایل WAV <input type="text" defaultValue="Browse Wave File" /></label>
        <label>دقیقه پایان <input type="number" defaultValue={0} /></label>
      </section>

      <section className="buttons">
        <button className="send"    onClick={addLog}>ارسال</button>
        <button className="pause">مکث</button>
        <button className="resume">ادامه</button>
        <button className="break">توقف</button>
        <button onClick={() => window.location.reload()}>بازنشانی صفحه</button>
        <button onClick={() => setLogs([])}>پاک‌کردن لاگ</button>
        <button>نمایش همه پیام‌ها</button>
      </section>

      <section className="logs">
        <table>
          <thead>
            <tr>
              <th>وضعیت</th><th>موفق کل</th><th>موفق فعلی</th>
              <th>پاسخ‌دهنده‌ها</th><th>ارسال‌شده</th><th>کل تماس‌ها</th>
              <th>در حال ارسال</th><th>اولویت</th><th>فایل</th>
              <th>شناسه پروژه</th><th>پایان زمان</th><th>پایان تاریخ</th>
              <th>شروع زمان</th><th>شروع تاریخ</th><th>نام پروژه</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l, i) => (
              <tr key={i}>
                <td>{l.status}</td><td>{l.totalSuccess}</td><td>{l.curSuccess}</td>
                <td>{l.curAnswerTels}</td><td>{l.curTotalSended}</td><td>{l.curTotalTels}</td>
                <td>{l.strCurSendingNo}</td><td>{l.priority}</td><td>{l.telFileName}</td>
                <td>{l.projectsId}</td><td>{l.endSendTime}</td><td>{l.endSendDate}</td>
                <td>{l.startSendTime}</td><td>{l.startSendDate}</td><td>{l.prjName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="footer">
        <label>
          شناسه پروژه:
          <input value={projectId} onChange={e => setProjectId(e.target.value)} />
        </label>
        <label>
          اولویت:
          <input type="number" value={priority} onChange={e => setPriority(+e.target.value)} />
        </label>
      </section>
    </div>
  );
}