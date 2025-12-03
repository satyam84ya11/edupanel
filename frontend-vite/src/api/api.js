import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function login(userid, password) {
  const res = await api.post('/auth/login', { userid, password })
  return res.data
}

export async function getSearch(q) {
  const res = await api.get('/search', { params: { q } })
  return res.data
}

export async function getAlerts() {
  const res = await api.get('/alerts')
  return res.data
}

export async function getStudentReport(studentId) {
  const res = await api.get(`/students/${studentId}/report`, { responseType: 'blob' })
  return res.data
}

export async function exportCsv(path) {
  const res = await api.get(`/export/${path}`, { responseType: 'blob' })
  return res.data
}

// Placeholder CRUD endpoints
export async function fetchStudents() { const res = await api.get('/students'); return res.data }
export async function fetchFaculties() { const res = await api.get('/faculty'); return res.data }
export async function fetchStaff() { const res = await api.get('/staff'); return res.data }

// Students CRUD
export async function getStudent(id){ const res = await api.get(`/students/${id}`); return res.data }
export async function createStudent(payload){ const res = await api.post('/students', payload); return res.data }
export async function updateStudent(id,payload){ const res = await api.put(`/students/${id}`, payload); return res.data }
export async function deleteStudent(id){ const res = await api.delete(`/students/${id}`); return res.data }

// Faculty CRUD
export async function getFaculty(id){ const res = await api.get(`/faculty/${id}`); return res.data }
export async function createFaculty(payload){ const res = await api.post('/faculty', payload); return res.data }
export async function updateFaculty(id,payload){ const res = await api.put(`/faculty/${id}`, payload); return res.data }
export async function deleteFaculty(id){ const res = await api.delete(`/faculty/${id}`); return res.data }

// Staff CRUD
export async function getStaffMember(id){ const res = await api.get(`/staff/${id}`); return res.data }
export async function createStaff(payload){ const res = await api.post('/staff', payload); return res.data }
export async function updateStaff(id,payload){ const res = await api.put(`/staff/${id}`, payload); return res.data }
export async function deleteStaff(id){ const res = await api.delete(`/staff/${id}`); return res.data }

export default api

// Fees
export async function fetchFees(){ const res = await api.get('/fees'); return res.data }
export async function getFee(id){ const res = await api.get(`/fees/${id}`); return res.data }
export async function createFee(payload){ const res = await api.post('/fees', payload); return res.data }
export async function updateFee(id,payload){ const res = await api.put(`/fees/${id}`, payload); return res.data }
export async function deleteFee(id){ const res = await api.delete(`/fees/${id}`); return res.data }

// Salary
export async function fetchSalaries(){ const res = await api.get('/salary'); return res.data }
export async function getSalary(id){ const res = await api.get(`/salary/${id}`); return res.data }
export async function createSalary(payload){ const res = await api.post('/salary', payload); return res.data }
export async function updateSalary(id,payload){ const res = await api.put(`/salary/${id}`, payload); return res.data }
export async function deleteSalary(id){ const res = await api.delete(`/salary/${id}`); return res.data }

// Attendance
export async function fetchAttendance(query){ const res = await api.get('/attendance', { params: query }); return res.data }
export async function createAttendance(payload){ const res = await api.post('/attendance', payload); return res.data }
export async function updateAttendance(id,payload){ const res = await api.put(`/attendance/${id}`, payload); return res.data }
export async function deleteAttendance(id){ const res = await api.delete(`/attendance/${id}`); return res.data }

// Reports & exports
export async function fetchReports(){ const res = await api.get('/reports'); return res.data }
export async function exportReport(path){ const res = await api.get(`/export/${path}`, { responseType: 'blob' }); return res.data }

// Settings
export async function getSettings(){ const res = await api.get('/settings'); return res.data }
export async function updateSettings(payload){ const res = await api.put('/settings', payload); return res.data }
