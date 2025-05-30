import axios from 'axios';

export interface Shift {
  id: number;
  name: string;
  description: string;
  start_time: string;
  lunch_time: string | null;
  end_time: string;
}

export async function getNextShift(): Promise<Shift> {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/me/next-shift', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.shift;
}

// Check if assistance has been registered today
export async function checkAttendanceToday(): Promise<boolean> {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/me/attendance/today', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.attended === true;
}
