import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function Dashboard() {
  // Form state for new fields
  const [form, setForm] = useState({
    telFileName: '',
    haveInternalWave: true,
    internalWaveNo: 700,
    fullPathWavFileName: '',
    allowableStartHour: 8,
    allowableStartMinute: 0,
    allowableEndHour: 21,
    allowableEndMinute: 0,
    desiredSendNo: 1,
    tersholdNo: 10000,
    testRingtime: 13,
    testNum1: '',
    testNum2: '',
    testNum3: '',
    callerId: 5000,
    mainRingTime: 45,
    priority: 3
  });
  const [telFileContent, setTelFileContent] = useState('');
  const telFileInputRef = useRef(null);
  const waveFileInputRef = useRef(null);
  const [waveFileUrl, setWaveFileUrl] = useState('');

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Only allow digits for testNum1, testNum2, testNum3
    if (['testNum1', 'testNum2', 'testNum3'].includes(name)) {
      // Remove any non-digit characters
      const numericValue = value.replace(/[^0-9]/g, '');
      setForm(f => ({
        ...f,
        [name]: numericValue
      }));
      return;
    }

    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };

  const handleTelFileBrowse = () => {
    if (telFileInputRef.current) {
      telFileInputRef.current.value = '';
      telFileInputRef.current.click();
    }
  };

  const handleTelFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.txt')) {
      setForm(f => ({ ...f, telFileName: file.name }));
      const reader = new FileReader();
      reader.onload = (evt) => {
        setTelFileContent(evt.target.result);
      };
      reader.readAsText(file);
    } else {
      setForm(f => ({ ...f, telFileName: '' }));
      setTelFileContent('');
      alert('Please select a .txt file');
    }
  };

  const handleWaveFileBrowse = () => {
    if (form.haveInternalWave) {
      alert('فایل صوتی داخلی انتخاب شده است');
      return;
    }
    if (waveFileInputRef.current) {
      waveFileInputRef.current.value = '';
      waveFileInputRef.current.click();
    }
  };

  const handleWaveFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.wav')) {
      setForm(f => ({ ...f, fullPathWavFileName: file.name }));
      setWaveFileUrl(URL.createObjectURL(file));
    } else {
      setForm(f => ({ ...f, fullPathWavFileName: '' }));
      setWaveFileUrl('');
      alert('Please select a .wav file');
    }
  };

  useEffect(() => {
    return () => {
      if (waveFileUrl) {
        URL.revokeObjectURL(waveFileUrl);
      }
    };
  }, [waveFileUrl]);

  // Mock project data
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData = [
      {
        end: 'ارسال',
        SendTime: 'AM 8:07:14',
        endSendDate: '1404/04/10',
        startSendTime: 'AM 8:05:41',
        startSendDate: '1404/04/10',
        prjName: 'P__454_test_D_1404_04_10_T_8_05_41_AM_1',
        projectsId: 1631,
        status: 'در حال ارسال',
        totalSuccess: 10,
        curSuccess: 2,
        curAnswerTels: 1,
        curTotalSended: 12,
        curTotalTels: 15,
        strCurSendingNo: '09120000001',
        priority: 3,
        telFileName: 'tel_list_1.txt',
      },
      {
        end: 'ارسال',
        SendTime: 'PM 6:23:10',
        endSendDate: '1404/03/21',
        startSendTime: 'PM 12:21:12',
        startSendDate: '1404/03/21',
        prjName: 'P__539_bedehi01_D_1404_03_21_T_12_21_12_PM_1',
        projectsId: 1630,
        status: 'در حال ارسال',
        totalSuccess: 8,
        curSuccess: 1,
        curAnswerTels: 0,
        curTotalSended: 9,
        curTotalTels: 10,
        strCurSendingNo: '09120000002',
        priority: 2,
        telFileName: 'tel_list_2.txt',
      },
      {
        end: 'ارسال',
        SendTime: 'PM 6:20:42',
        endSendDate: '1404/03/20',
        startSendTime: 'AM 9:06:42',
        startSendDate: '1404/03/20',
        prjName: 'P__378_ivr_bedehkar_vasl_D_1404_03_20_T_9_06_42_AM_1',
        projectsId: 1626,
        status: 'در حال ارسال',
        totalSuccess: 12,
        curSuccess: 3,
        curAnswerTels: 2,
        curTotalSended: 14,
        curTotalTels: 16,
        strCurSendingNo: '09120000003',
        priority: 1,
        telFileName: 'tel_list_3.txt',
      }
    ];
    setTimeout(() => {
      setProjects(mockData);
      setLoading(false);
    }, 500);
  }, []);

  const [callerIds, setCallerIds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/callerids')
      .then(res => res.json())
      .then(data => setCallerIds(data))
      .catch(err => console.error('Failed to fetch caller IDs', err));
  }, []);

  console.log('callerIds:', callerIds);

  const [finishedProjects, setFinishedProjects] = useState([]);
  const [finishedLoading, setFinishedLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/finished-projects')
      .then(res => res.json())
      .then(data => {
        setFinishedProjects(data);
        setFinishedLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch finished projects', err);
        setFinishedLoading(false);
      });
  }, []);

  const [runningProjects, setRunningProjects] = useState([]);
  const [runningLoading, setRunningLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/running-projects')
      .then(res => res.json())
      .then(data => {
        setRunningProjects(data);
        setRunningLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch running projects', err);
        setRunningLoading(false);
      });
  }, []);

  const [messagesArr, setMessagesArr] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/messages')
      .then(res => res.json())
      .then(data => setMessagesArr(data.reverse()))
      .catch(err => {
        console.error('Failed to fetch messages', err);
      });
  }, []);

  return (
    <div className="Dashboard-main-container">
      <div style={{ padding: 24, background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)', minHeight: '100vh' }}>
        <div className="Dashboard-section-title">Project Settings</div>
        <form className="Dashboard-form Dashboard-form-horizontal">
          <div className="Dashboard-form-row">
            <label>1 - telFileName</label>
            <input type="text" name="telFileName" value={form.telFileName} onChange={handleFormChange} style={{ width: 120 }} readOnly />
            <button type="button" onClick={handleTelFileBrowse}>Browse Tel File</button>
            <input
              type="file"
              accept=".txt"
              style={{ display: 'none' }}
              ref={telFileInputRef}
              onChange={handleTelFileChange}
            />
          </div>
          {telFileContent && (
            <>
              <div className="Dashboard-form-row" style={{ width: '100%' }}>
                <label style={{ minWidth: 110 }}>Tel File Content</label>
                <textarea
                  value={telFileContent}
                  readOnly
                  rows={4}
                  style={{ width: 320, resize: 'vertical', background: '#fafdff' }}
                />
              </div>
              <div className="Dashboard-form-row" style={{ width: '100%' }}>
                <span style={{ marginLeft: 8, color: '#1976d2', fontWeight: 600 }}>
                  Number of lines: {telFileContent.split(/\r?\n/).filter(line => line.trim() !== '').length}
                </span>
              </div>
            </>
          )}
          <div className="Dashboard-form-row">
            <label>2 - haveInternalWave</label>
            <input type="checkbox" name="haveInternalWave" checked={form.haveInternalWave} onChange={handleFormChange} />
            <span style={{ fontSize: '0.98rem', color: '#555' }}>{form.haveInternalWave ? 'Yes' : 'No'}</span>
          </div>
          <div className="Dashboard-form-row">
    <label>3 - internalWaveNo</label>
    <select
      name="internalWaveNo"
      value={form.internalWaveNo}
      onChange={handleFormChange}
      style={{ width: 80 }}
    >
      {Array.from({ length: 24 }, (_, i) => 700 + i).map(n => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
  </div>
          <div className="Dashboard-form-row">
            <label>4 - fullPathWavFileName</label>
            <input
              type="text"
              name="fullPathWavFileName"
              value={form.fullPathWavFileName}
              onChange={handleFormChange}
              style={{ width: 120 }}
              disabled={form.haveInternalWave}
            />
            <button
              type="button"
              onClick={handleWaveFileBrowse}
            >
              Browse Wave File
            </button>
            <input
              type="file"
              accept=".wav"
              style={{ display: 'none' }}
              ref={waveFileInputRef}
              onChange={handleWaveFileChange}
            />
          </div>
          {waveFileUrl && !form.haveInternalWave && (
            <div style={{ marginTop: 8, marginBottom: 8 }}>
              <button
                type="button"
                onClick={() => {
                  const audio = document.getElementById('wave-audio');
                  if (audio) audio.play();
                }}
                style={{ marginRight: 8 }}
              >
                Play
              </button>
              <audio id="wave-audio" src={waveFileUrl} controls style={{ verticalAlign: 'middle' }} />
            </div>
          )}
          <div className="Dashboard-form-row">
            <label>5 - allowableStartHour</label>
            <input
              type="number"
              name="allowableStartHour"
              value={form.allowableStartHour}
              onChange={handleFormChange}
              style={{ width: 40 }}
              min={8}
              max={20}
            />
          </div>
          <div className="Dashboard-form-row">
            <label>6 - allowableStartMinute</label>
            <input
              type="number"
              name="allowableStartMinute"
              value={form.allowableStartMinute}
              onChange={handleFormChange}
              style={{ width: 40 }}
              min={0}
              max={59}
            />
          </div>
          <div className="Dashboard-form-row">
            <label>7 - allowableEndHour</label>
            <input
              type="number"
              name="allowableEndHour"
              value={form.allowableEndHour}
              onChange={handleFormChange}
              style={{ width: 40 }}
              min={9}
              max={21}
            />
          </div>
          <div className="Dashboard-form-row">
            <label>8 - allowableEndMinute</label>
            <input
              type="number"
              name="allowableEndMinute"
              value={form.allowableEndMinute}
              onChange={handleFormChange}
              style={{ width: 40 }}
              min={0}
              max={59}
            />
          </div>
          <div className="Dashboard-form-row">
            <label>9 - desiredSendNo</label>
            <input type="number" name="desiredSendNo" value={form.desiredSendNo} onChange={handleFormChange} style={{ width: 40 }} />
          </div>
          <div className="Dashboard-form-row">
            <label>10 - tersholdNo</label>
            <input type="number" name="tersholdNo" value={form.tersholdNo} onChange={handleFormChange} style={{ width: 70 }} />
          </div>
          <div className="Dashboard-form-row">
            <label>11 - testRingtime</label>
            <input type="number" name="testRingtime" value={form.testRingtime} onChange={handleFormChange} style={{ width: 40 }} />
          </div>
          <div className="Dashboard-form-row">
            <label>10 - testNum1</label>
            <input
              type="text"
              name="testNum1"
              value={form.testNum1}
              onChange={handleFormChange}
              style={{ width: 120 }}
              inputMode="numeric"
              maxLength={form.testNum1.startsWith('09') ? 11 : 8}
              placeholder="09xxxxxxxxx or 8 digits"
            />
          </div>
          <div className="Dashboard-form-row">
            <label>11 - testNum2</label>
            <input
              type="text"
              name="testNum2"
              value={form.testNum2}
              onChange={handleFormChange}
              style={{ width: 120 }}
              inputMode="numeric"
              maxLength={form.testNum2.startsWith('09') ? 11 : 8}
              placeholder="09xxxxxxxxx or 8 digits"
            />
          </div>
          <div className="Dashboard-form-row">
            <label>12 - testNum3</label>
            <input
              type="text"
              name="testNum3"
              value={form.testNum3}
              onChange={handleFormChange}
              style={{ width: 120 }}
              inputMode="numeric"
              maxLength={form.testNum3.startsWith('09') ? 11 : 8}
              placeholder="09xxxxxxxxx or 8 digits"
            />
          </div>
          <div className="Dashboard-form-row">
            <label>15 - callerId</label>
            <select
              name="callerId"
              value={form.callerId}
              onChange={handleFormChange}
              style={{ width: 120 }}
            >
              <option value="">Select Caller ID</option>
              {callerIds.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>
          <div className="Dashboard-form-row">
            <label>16 - mainRingTime</label>
            <input type="number" name="mainRingTime" value={form.mainRingTime} onChange={handleFormChange} style={{ width: 50 }} />
          </div>
          <div className="Dashboard-form-row">
            <label>17 - Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleFormChange}
              style={{ width: 100 }}
            >
              <option value={1}>1 - high</option>
              <option value={2}>2 - medium</option>
              <option value={3}>3 - low</option>
            </select>
          </div>
        </form>

        <div className="Dashboard-section-title" style={{margin: '18px 0 8px 0'}}>
          Finished Project Information
        </div>
        {finishedLoading ? (
          <div>Loading...</div>
        ) : (
          <div style={{ maxHeight: 180, overflow: 'auto', width: '100%', direction: 'rtl', marginBottom: 10 }}>
            <table className="Dashboard-table" cellPadding="4" dir="rtl" style={{ fontSize: '0.92rem', lineHeight: 1.2 }}>
              <thead>
                <tr>
                  {finishedProjects[0] && Object.keys(finishedProjects[0]).map((col) => (
                    <th key={col} style={col === 'prjName' ? { minWidth: 180 } : col === 'status' ? { minWidth: 100 } : {}}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {finishedProjects.slice(0, 3).map((row, idx) => (
                  <tr key={idx}>
                    {Object.entries(row).map(([col, val], i) => (
                      <td key={i} style={col === 'prjName' ? { minWidth: 180, whiteSpace: 'nowrap' } : col === 'status' ? { minWidth: 100, whiteSpace: 'nowrap' } : {}}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="Dashboard-section-title" style={{margin: '18px 0 8px 0'}}>
          Running Project Information
        </div>
        {runningLoading ? (
          <div>Loading...</div>
        ) : (
          <div style={{ maxHeight: 180, overflow: 'auto', width: '100%', direction: 'rtl', marginBottom: 10 }}>
            <table className="Dashboard-table" cellPadding="4" dir="rtl" style={{ fontSize: '0.92rem', lineHeight: 1.2 }}>
              <thead>
                <tr>
                  {runningProjects[0] && Object.keys(runningProjects[0]).map((col) => (
                    <th key={col} style={col === 'prjName' ? { minWidth: 180 } : col === 'status' ? { minWidth: 100 } : {}}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {runningProjects.slice(0, 3).map((row, idx) => (
                  <tr key={idx}>
                    {Object.entries(row).map(([col, val], i) => (
                      <td key={i} style={col === 'prjName' ? { minWidth: 180, whiteSpace: 'nowrap' } : col === 'status' ? { minWidth: 100, whiteSpace: 'nowrap' } : {}}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* New section: Project Controls and Messages */}
        <div className="Dashboard-card" style={{ marginTop: 32, maxWidth: 1000, width: '100%' }}>
          <div className="Dashboard-section-title" style={{ margin: '0 0 12px 0' }}>
            کنترل پروژه جاری
          </div>
          <div style={{ marginBottom: 16, color: '#666', fontSize: '0.98rem' }}>
            عملیات مدیریت پروژه جاری را از اینجا انجام دهید.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'nowrap', overflowX: 'auto' }}>
            <label htmlFor="curPrjId" style={{ minWidth: 110 }}>شناسه پروژه:</label>
            <input
              id="curPrjId"
              type="text"
              style={{ width: 100 }}
              placeholder="Project ID"
            />
            <button type="button">درخواست تنظیمات</button>
            <button type="button">Resume</button>
            <button type="button">Pause</button>
            <button type="button">Break</button>
            <button type="button">Reset</button>
          </div>
        </div>
        {/* New tab: ایجاد پروژه */}
        <div className="Dashboard-card" style={{ marginTop: 16, maxWidth: 1000, width: '100%' }}>
          <div className="Dashboard-section-title" style={{ margin: '0 0 12px 0' }}>
            ایجاد پروژه
          </div>
          <div style={{ marginBottom: 16, color: '#666', fontSize: '0.98rem' }}>
            برای ایجاد پروژه جدید اینجا کلیک کنید.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <button type="button">Send=&gt;</button>
          </div>
        </div>
        <div style={{ marginTop: 10, fontWeight: 500 }}>Result</div>
        <div style={{ fontWeight: 500, margin: '32px 0 8px 0', color: '#1976d2', fontSize: '1.1rem' }}>Messages</div>
        <div style={{ width: '100%', maxWidth: 700, maxHeight: 220, overflowY: 'auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 8, marginBottom: 24 }}>
          <table className="Dashboard-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: 80 }}>Number</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messagesArr.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontFamily: 'monospace' }}>{row.number}</td>
                  <td style={{ fontFamily: 'monospace' }}>{row.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 