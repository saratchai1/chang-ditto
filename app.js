const STORAGE_KEY = "chang-ditto-mvp-v1";

const projects = [
  { id: "p1", name: "อาคารสำนักงานใหญ่", code: "HQ-01", location: "กรุงเทพมหานคร" },
  { id: "p2", name: "ศูนย์กระจายสินค้าบางนา", code: "DC-BN", location: "สมุทรปราการ" },
  { id: "p3", name: "โรงพยาบาลศรีนครินทร์", code: "HSP-SK", location: "นนทบุรี" },
];

const technicians = [
  { id: "t1", name: "สมชาย พรหมมา", shortName: "สมชาย", initials: "สช", role: "ช่างระบบอาคาร" },
  { id: "t2", name: "ณัฐพงษ์ วัฒนะ", shortName: "ณัฐพงษ์", initials: "ณพ", role: "ช่างไฟฟ้า" },
  { id: "t3", name: "กิตติพงษ์ แสงดี", shortName: "กิตติพงษ์", initials: "กต", role: "ช่างเครื่องกล" },
  { id: "t4", name: "วรัญญา จิตมั่น", shortName: "วรัญญา", initials: "วญ", role: "หัวหน้าช่าง" },
];

const statusMap = {
  open: { label: "รอรับงาน", className: "status-open" },
  checked_in: { label: "ถึงหน้างาน", className: "status-checked_in" },
  in_progress: { label: "กำลังดำเนินการ", className: "status-in_progress" },
  waiting: { label: "รอดำเนินการ", className: "status-waiting" },
  completed: { label: "ปิดงานแล้ว", className: "status-completed" },
};

const priorityMap = {
  high: { label: "เร่งด่วน", className: "priority-high" },
  medium: { label: "ปานกลาง", className: "priority-medium" },
  normal: { label: "ปกติ", className: "priority-normal" },
};

const navItems = [
  { id: "dashboard", label: "ภาพรวม", icon: "dashboard" },
  { id: "tickets", label: "รายการงาน", icon: "clipboard" },
  { id: "projects", label: "โครงการ", icon: "folder" },
  { id: "helpdesk", label: "Helpdesk", icon: "headset" },
  { id: "technicians", label: "ทีมช่าง", icon: "users" },
];

const ui = {
  activeNav: "dashboard",
  statusFilter: "all",
  projectFilter: "all",
  technicianFilter: "all",
  search: "",
  selectedTicketId: null,
  locationError: false,
};

function icon(name, className = "") {
  const paths = {
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 8.4 7.2 6.1 4.9a4 4 0 0 0 5 5L5 16l3 3 6.1-6.1a4 4 0 0 0 5-5l-2.3 2.3-3.6-3.6 1.5-1.3Z"/><path d="m5 16-2 2 3 3 2-2"/>',
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    clipboard: '<path d="M9 5h6"/><path d="M9 3h6a2 2 0 0 1 2 2v1H7V5a2 2 0 0 1 2-2Z"/><rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 11h6M9 15h6"/>',
    folder: '<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z"/>',
    headset: '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><path d="M4 13h3v7H6a2 2 0 0 1-2-2v-5ZM20 13h-3v7h1a2 2 0 0 0 2-2v-5Z"/><path d="M17 20c0 1-1 2-3 2h-2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    refresh: '<path d="M20 11a8 8 0 1 0 1 5"/><path d="M20 4v7h-7"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    map: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    camera: '<path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3h5Z"/><circle cx="12" cy="13" r="4"/>',
    file: '<path d="M6 2h8l4 4v16H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v5h5M8 13h8M8 17h6"/>',
    pen: '<path d="m4 16-1 5 5-1L19 9l-4-4L4 16Z"/><path d="m13 7 4 4"/>',
    star: '<path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.4l6.2-.9L12 2.8Z"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/>',
    navigation: '<path d="m3 11 18-8-8 18-2-8-8-2Z"/>',
    play: '<path d="m8 5 11 7-11 7V5Z"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    send: '<path d="m3 3 18 9-18 9 4-9-4-9Z"/><path d="M7 12h14"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6M12 2v3"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-5-5L5 20"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/>',
    building: '<rect x="4" y="3" width="12" height="18" rx="1"/><path d="M8 7h4M8 11h4M8 15h4M16 9h4v12h-4M8 21v-3h4v3"/>',
  };
  const content = paths[name] || paths.alert;
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`;
}

function placeholderImage(label, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560"><rect width="900" height="560" fill="${color}"/><path d="M0 430 230 260l140 105 110-84 420 279H0Z" fill="rgba(255,255,255,.22)"/><circle cx="700" cy="130" r="70" fill="rgba(255,255,255,.25)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="46" font-weight="700">${label}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createSeedState() {
  return {
    tickets: [
      {
        id: "TK-260826-014",
        projectId: "p1",
        title: "เครื่องปรับอากาศชั้น 7 ไม่ทำความเย็น",
        client: "บริษัท อัลฟ่า พร็อพเพอร์ตี้ จำกัด",
        location: "อาคาร A ชั้น 7 ห้องประชุมใหญ่",
        technicianId: "t1",
        priority: "high",
        status: "open",
        category: "ระบบปรับอากาศ",
        description: "อุณหภูมิห้องสูงกว่า 28°C และมีเสียงผิดปกติจาก FCU",
        createdAt: "2026-08-26T08:35:00+07:00",
        dueAt: "2026-08-26T13:00:00+07:00",
        checkIn: null,
        startedAt: null,
        completedAt: null,
        closedAt: null,
        waitingReason: "",
        repairDetail: "",
        beforePhoto: null,
        afterPhoto: null,
        workOrder: null,
        customerName: "",
        signature: null,
        rating: 0,
        ratingComment: "",
        sentToHelpdesk: false,
        logs: [{ title: "Helpdesk มอบหมายงานให้สมชาย", at: "2026-08-26T08:35:00+07:00" }],
      },
      {
        id: "TK-260826-011",
        projectId: "p2",
        title: "ตู้ควบคุมไฟฟ้าโซนคลังสินค้าแจ้งเตือน",
        client: "บริษัท โลจิสติกส์ เอเชีย จำกัด",
        location: "คลัง 2 โซนโหลดสินค้า",
        technicianId: "t2",
        priority: "high",
        status: "in_progress",
        category: "ระบบไฟฟ้า",
        description: "ตู้ MDB มีสัญญาณเตือน Over Temperature เป็นระยะ",
        createdAt: "2026-08-26T07:50:00+07:00",
        dueAt: "2026-08-26T12:00:00+07:00",
        checkIn: { lat: 13.632114, lng: 100.706511, accuracy: 8, at: "2026-08-26T09:04:00+07:00" },
        startedAt: "2026-08-26T09:12:00+07:00",
        completedAt: null,
        closedAt: null,
        waitingReason: "",
        repairDetail: "ตรวจพบพัดลมระบายอากาศภายในตู้หมุนช้ากว่าปกติ กำลังตรวจแรงดันและกระแส",
        beforePhoto: { name: "mdb-before.jpg", type: "image/jpeg", data: placeholderImage("ภาพก่อนทำ", "#5f7289") },
        afterPhoto: null,
        workOrder: { name: "work-order-011.jpg", type: "image/jpeg", data: placeholderImage("ใบงาน", "#6b7c9b") },
        customerName: "",
        signature: null,
        rating: 0,
        ratingComment: "",
        sentToHelpdesk: false,
        logs: [
          { title: "เริ่มดำเนินการแก้ไข", at: "2026-08-26T09:12:00+07:00" },
          { title: "Check-in ที่หน้างาน", at: "2026-08-26T09:04:00+07:00" },
          { title: "Helpdesk มอบหมายงานให้ณัฐพงษ์", at: "2026-08-26T07:50:00+07:00" },
        ],
      },
      {
        id: "TK-260825-032",
        projectId: "p3",
        title: "ปั๊มน้ำระบบประปามีแรงดันตก",
        client: "โรงพยาบาลศรีนครินทร์",
        location: "อาคารบริการ ห้องปั๊ม B1",
        technicianId: "t3",
        priority: "medium",
        status: "waiting",
        category: "ระบบสุขาภิบาล",
        description: "แรงดันปลายท่อลดลงในช่วงการใช้น้ำสูง",
        createdAt: "2026-08-25T14:20:00+07:00",
        dueAt: "2026-08-26T15:30:00+07:00",
        checkIn: { lat: 13.862933, lng: 100.513742, accuracy: 12, at: "2026-08-26T08:21:00+07:00" },
        startedAt: "2026-08-26T08:29:00+07:00",
        completedAt: null,
        closedAt: null,
        waitingReason: "รอซีลปั๊มรุ่น P-140 จากคลังอะไหล่",
        repairDetail: "ตรวจพบ Mechanical Seal เริ่มรั่วและทำให้แรงดันระบบไม่นิ่ง",
        beforePhoto: { name: "pump-before.jpg", type: "image/jpeg", data: placeholderImage("ภาพปั๊มน้ำ", "#466e81") },
        afterPhoto: null,
        workOrder: null,
        customerName: "",
        signature: null,
        rating: 0,
        ratingComment: "",
        sentToHelpdesk: false,
        logs: [
          { title: "พักงาน: รอซีลปั๊มรุ่น P-140", at: "2026-08-26T10:15:00+07:00" },
          { title: "เริ่มดำเนินการแก้ไข", at: "2026-08-26T08:29:00+07:00" },
          { title: "Check-in ที่หน้างาน", at: "2026-08-26T08:21:00+07:00" },
        ],
      },
      {
        id: "TK-260825-027",
        projectId: "p1",
        title: "ประตู Access Control ไม่ตอบสนอง",
        client: "บริษัท อัลฟ่า พร็อพเพอร์ตี้ จำกัด",
        location: "อาคาร B ชั้น 3 ทางเข้า Server Room",
        technicianId: "t2",
        priority: "normal",
        status: "completed",
        category: "ระบบรักษาความปลอดภัย",
        description: "เครื่องอ่านบัตรไม่ตอบสนองและไฟสถานะดับ",
        createdAt: "2026-08-25T10:40:00+07:00",
        dueAt: "2026-08-25T16:00:00+07:00",
        checkIn: { lat: 13.779812, lng: 100.572184, accuracy: 9, at: "2026-08-25T13:05:00+07:00" },
        startedAt: "2026-08-25T13:12:00+07:00",
        completedAt: "2026-08-25T14:08:00+07:00",
        closedAt: "2026-08-25T14:12:00+07:00",
        waitingReason: "",
        repairDetail: "เปลี่ยน Power Supply 12V และเข้าหัวสายใหม่ ทดสอบอ่านบัตร 10 ครั้งผ่านทั้งหมด",
        beforePhoto: { name: "access-before.jpg", type: "image/jpeg", data: placeholderImage("ก่อนแก้ไข", "#6c7486") },
        afterPhoto: { name: "access-after.jpg", type: "image/jpeg", data: placeholderImage("หลังแก้ไข", "#23866a") },
        workOrder: { name: "work-order-027.jpg", type: "image/jpeg", data: placeholderImage("ใบงานปิดงาน", "#3f6ca5") },
        customerName: "ธนภัทร วงศ์ดี",
        signature: placeholderImage("ลายเซ็นลูกค้า", "#ffffff"),
        rating: 5,
        ratingComment: "แก้ไขรวดเร็วและอธิบายสาเหตุชัดเจน",
        sentToHelpdesk: true,
        logs: [
          { title: "ปิดงานและส่งกลับ Helpdesk", at: "2026-08-25T14:12:00+07:00" },
          { title: "แก้ไขเสร็จและทดสอบระบบ", at: "2026-08-25T14:08:00+07:00" },
          { title: "เริ่มดำเนินการแก้ไข", at: "2026-08-25T13:12:00+07:00" },
          { title: "Check-in ที่หน้างาน", at: "2026-08-25T13:05:00+07:00" },
        ],
      },
      {
        id: "TK-260826-018",
        projectId: "p2",
        title: "ไฟส่องสว่างทางหนีไฟชำรุด 3 จุด",
        client: "บริษัท โลจิสติกส์ เอเชีย จำกัด",
        location: "คลัง 1 ทางหนีไฟฝั่งตะวันออก",
        technicianId: "t4",
        priority: "medium",
        status: "open",
        category: "ระบบไฟฟ้า",
        description: "ไฟฉุกเฉินไม่สว่างเมื่อทดสอบตัดไฟหลัก",
        createdAt: "2026-08-26T10:10:00+07:00",
        dueAt: "2026-08-26T16:30:00+07:00",
        checkIn: null,
        startedAt: null,
        completedAt: null,
        closedAt: null,
        waitingReason: "",
        repairDetail: "",
        beforePhoto: null,
        afterPhoto: null,
        workOrder: null,
        customerName: "",
        signature: null,
        rating: 0,
        ratingComment: "",
        sentToHelpdesk: false,
        logs: [{ title: "Helpdesk มอบหมายงานให้วรัญญา", at: "2026-08-26T10:10:00+07:00" }],
      },
      {
        id: "TK-260824-019",
        projectId: "p3",
        title: "พัดลมระบายอากาศห้องยาเสียงดัง",
        client: "โรงพยาบาลศรีนครินทร์",
        location: "อาคารผู้ป่วย ชั้น 4 ห้องเก็บยา",
        technicianId: "t1",
        priority: "normal",
        status: "completed",
        category: "ระบบระบายอากาศ",
        description: "ลูกปืนพัดลมมีเสียงดังต่อเนื่อง",
        createdAt: "2026-08-24T09:25:00+07:00",
        dueAt: "2026-08-24T15:00:00+07:00",
        checkIn: { lat: 13.862711, lng: 100.513466, accuracy: 6, at: "2026-08-24T11:10:00+07:00" },
        startedAt: "2026-08-24T11:18:00+07:00",
        completedAt: "2026-08-24T12:05:00+07:00",
        closedAt: "2026-08-24T12:10:00+07:00",
        waitingReason: "",
        repairDetail: "เปลี่ยน Bearing และตั้งแนวเพลาใหม่ วัดระดับเสียงลดจาก 74 dB เหลือ 49 dB",
        beforePhoto: { name: "fan-before.jpg", type: "image/jpeg", data: placeholderImage("ก่อนแก้ไข", "#6f747c") },
        afterPhoto: { name: "fan-after.jpg", type: "image/jpeg", data: placeholderImage("หลังแก้ไข", "#2b8b6f") },
        workOrder: { name: "work-order-019.jpg", type: "image/jpeg", data: placeholderImage("ใบงาน", "#476a9c") },
        customerName: "ปิยวรรณ เกษมสุข",
        signature: placeholderImage("ลายเซ็นลูกค้า", "#ffffff"),
        rating: 4,
        ratingComment: "งานเรียบร้อย",
        sentToHelpdesk: true,
        logs: [
          { title: "ปิดงานและส่งกลับ Helpdesk", at: "2026-08-24T12:10:00+07:00" },
          { title: "แก้ไขเสร็จและทดสอบระบบ", at: "2026-08-24T12:05:00+07:00" },
          { title: "เริ่มดำเนินการแก้ไข", at: "2026-08-24T11:18:00+07:00" },
        ],
      },
    ],
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.warn("Unable to load local state", error);
  }
  return createSeedState();
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error("Unable to save local state", error);
    showToast("พื้นที่จัดเก็บไม่เพียงพอ", "ลองลบรูปขนาดใหญ่หรือรีเซ็ตข้อมูลเดโม", "error");
    return false;
  }
}

function resetState() {
  const ok = window.confirm("รีเซ็ตข้อมูลเดโมทั้งหมดกลับเป็นค่าเริ่มต้นหรือไม่?");
  if (!ok) return;
  state = createSeedState();
  localStorage.removeItem(STORAGE_KEY);
  ui.selectedTicketId = null;
  ui.statusFilter = "all";
  ui.search = "";
  renderApp();
  showToast("รีเซ็ตข้อมูลแล้ว", "ข้อมูลตัวอย่างกลับเป็นค่าเริ่มต้น", "success");
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDateTime(value, options = {}) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: options.hideYear ? undefined : "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  }).format(date);
}

function formatToday() {
  return new Intl.DateTimeFormat("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function nowIso() {
  return new Date().toISOString();
}

function getProject(id) {
  return projects.find((item) => item.id === id) || projects[0];
}

function getTechnician(id) {
  return technicians.find((item) => item.id === id) || technicians[0];
}

function getSelectedTicket() {
  return state.tickets.find((item) => item.id === ui.selectedTicketId) || null;
}

function updateTicket(ticketId, patch, logTitle = "") {
  state.tickets = state.tickets.map((ticket) => {
    if (ticket.id !== ticketId) return ticket;
    const logs = logTitle ? [{ title: logTitle, at: nowIso() }, ...(ticket.logs || [])] : ticket.logs;
    return { ...ticket, ...patch, logs };
  });
  saveState();
}

function getFilteredTickets() {
  const query = ui.search.trim().toLocaleLowerCase("th");
  return state.tickets
    .filter((ticket) => ui.projectFilter === "all" || ticket.projectId === ui.projectFilter)
    .filter((ticket) => ui.technicianFilter === "all" || ticket.technicianId === ui.technicianFilter)
    .filter((ticket) => {
      if (ui.statusFilter === "all") return true;
      if (ui.statusFilter === "open") return ["open", "checked_in"].includes(ticket.status);
      return ticket.status === ui.statusFilter;
    })
    .filter((ticket) => {
      if (!query) return true;
      const haystack = [
        ticket.id,
        ticket.title,
        ticket.client,
        ticket.location,
        getProject(ticket.projectId).name,
        getTechnician(ticket.technicianId).name,
      ]
        .join(" ")
        .toLocaleLowerCase("th");
      return haystack.includes(query);
    })
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, normal: 2 };
      const statusOrder = { open: 0, checked_in: 1, in_progress: 2, waiting: 3, completed: 4 };
      return statusOrder[a.status] - statusOrder[b.status] || priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}

function currentScopeTickets() {
  return state.tickets
    .filter((ticket) => ui.projectFilter === "all" || ticket.projectId === ui.projectFilter)
    .filter((ticket) => ui.technicianFilter === "all" || ticket.technicianId === ui.technicianFilter);
}

function getCounts() {
  const tickets = currentScopeTickets();
  return {
    total: tickets.length,
    open: tickets.filter((item) => ["open", "checked_in"].includes(item.status)).length,
    progress: tickets.filter((item) => item.status === "in_progress").length,
    waiting: tickets.filter((item) => item.status === "waiting").length,
    completed: tickets.filter((item) => item.status === "completed").length,
  };
}

function statusBadge(ticket) {
  const status = statusMap[ticket.status];
  return `<span class="status-badge ${status.className}">${status.label}</span>`;
}

function priorityBadge(ticket) {
  const priority = priorityMap[ticket.priority];
  return `<span class="priority-badge ${priority.className}">${priority.label}</span>`;
}

function renderSidebar() {
  const profile = ui.technicianFilter === "all" ? technicians[0] : getTechnician(ui.technicianFilter);
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">${icon("wrench")}</div>
        <div>
          <p class="brand-title">Chang Ditto</p>
          <p class="brand-subtitle">Field Service</p>
        </div>
      </div>
      <p class="nav-label">เมนูหลัก</p>
      <nav class="nav-list" aria-label="เมนูหลัก">
        ${navItems
          .map(
            (item) => `
              <button class="nav-button ${ui.activeNav === item.id ? "active" : ""}" data-nav="${item.id}">
                ${icon(item.icon)}<span>${item.label}</span>
              </button>`,
          )
          .join("")}
      </nav>
      <div class="sidebar-footer">
        <div class="technician-card">
          <div class="technician-row">
            <div class="avatar">${profile.initials}</div>
            <div>
              <p class="technician-name">${escapeHtml(profile.name)}</p>
              <p class="technician-role">${escapeHtml(profile.role)}</p>
            </div>
          </div>
          <button class="demo-reset" id="reset-demo">รีเซ็ตข้อมูลเดโม</button>
        </div>
      </div>
    </aside>`;
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="mobile-brand">
        <div class="brand-mark">${icon("wrench")}</div>
        <span>Chang Ditto</span>
      </div>
      <div class="topbar-filters">
        <label class="select-control" aria-label="เลือกโครงการ">
          ${icon("building")}
          <select id="project-filter">
            <option value="all">ทุกโครงการ</option>
            ${projects.map((project) => `<option value="${project.id}" ${ui.projectFilter === project.id ? "selected" : ""}>${escapeHtml(project.name)}</option>`).join("")}
          </select>
        </label>
        <label class="select-control" aria-label="เลือกช่าง">
          ${icon("users")}
          <select id="technician-filter">
            <option value="all">ช่างทุกคน</option>
            ${technicians.map((tech) => `<option value="${tech.id}" ${ui.technicianFilter === tech.id ? "selected" : ""}>${escapeHtml(tech.shortName)}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="topbar-date">${icon("calendar")}<span>${formatToday()}</span></div>
    </header>`;
}

function renderStats() {
  const counts = getCounts();
  const cards = [
    { key: "open", label: "งานรอรับ / เข้าหน้างาน", value: counts.open, icon: "clipboard", className: "open" },
    { key: "in_progress", label: "กำลังดำเนินการ", value: counts.progress, icon: "timer", className: "progress" },
    { key: "waiting", label: "รอดำเนินการ", value: counts.waiting, icon: "pause", className: "waiting" },
    { key: "completed", label: "ปิดงานแล้ว", value: counts.completed, icon: "checkCircle", className: "completed" },
  ];
  return `<section class="stat-grid" aria-label="สรุปสถานะงาน">
    ${cards
      .map(
        (card) => `
          <article class="stat-card ${card.className}">
            <div class="stat-top">
              <div class="stat-icon">${icon(card.icon)}</div>
              <span class="stat-change">${counts.total ? Math.round((card.value / counts.total) * 100) : 0}%</span>
            </div>
            <p class="stat-count">${card.value}</p>
            <p class="stat-label">${card.label}</p>
          </article>`,
      )
      .join("")}
  </section>`;
}

function ticketRows(tickets) {
  return tickets
    .map((ticket) => {
      const technician = getTechnician(ticket.technicianId);
      return `
        <tr class="ticket-row" tabindex="0" data-ticket-id="${ticket.id}">
          <td>
            <div class="ticket-id">${ticket.id}</div>
            <div class="ticket-title">${escapeHtml(ticket.title)}</div>
          </td>
          <td>
            <div class="ticket-client">${escapeHtml(ticket.client)}</div>
            <div class="ticket-meta">${escapeHtml(getProject(ticket.projectId).name)}</div>
          </td>
          <td><div class="ticket-location">${icon("map")}${escapeHtml(ticket.location)}</div></td>
          <td><div class="ticket-client">${escapeHtml(technician.shortName)}</div><div class="ticket-meta">${formatDateTime(ticket.dueAt, { hideYear: true })}</div></td>
          <td>${priorityBadge(ticket)}</td>
          <td>${statusBadge(ticket)}</td>
          <td>${icon("chevron")}</td>
        </tr>`;
    })
    .join("");
}

function ticketCards(tickets) {
  return tickets
    .map(
      (ticket) => `
        <article class="ticket-card" tabindex="0" data-ticket-id="${ticket.id}">
          <div class="ticket-card-head"><span class="ticket-id">${ticket.id}</span>${priorityBadge(ticket)}</div>
          <h3>${escapeHtml(ticket.title)}</h3>
          <p>${escapeHtml(ticket.location)}</p>
          <div class="ticket-card-foot"><span class="ticket-meta">${escapeHtml(getTechnician(ticket.technicianId).shortName)}</span>${statusBadge(ticket)}</div>
        </article>`,
    )
    .join("");
}

function renderTicketPanel({ title = "รายการงานล่าสุด", subtitle = "กดที่งานเพื่อเปิดรายละเอียด", limit = null } = {}) {
  let tickets = getFilteredTickets();
  if (limit) tickets = tickets.slice(0, limit);
  const statusTabs = [
    { id: "all", label: "ทั้งหมด" },
    { id: "open", label: "รอรับงาน" },
    { id: "in_progress", label: "กำลังทำ" },
    { id: "waiting", label: "รอดำเนินการ" },
    { id: "completed", label: "ปิดแล้ว" },
  ];

  return `
    <section class="panel ticket-panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${title}</h2>
          <p class="panel-subtitle">${subtitle}</p>
        </div>
        <label class="search-control" aria-label="ค้นหางาน">
          ${icon("search")}
          <input id="ticket-search" type="search" value="${escapeHtml(ui.search)}" placeholder="ค้นหาเลขที่งาน ลูกค้า หรือสถานที่" />
        </label>
      </div>
      <div class="tabs" role="tablist">
        ${statusTabs.map((tab) => `<button class="tab-button ${ui.statusFilter === tab.id ? "active" : ""}" data-status-filter="${tab.id}">${tab.label}</button>`).join("")}
      </div>
      ${
        tickets.length
          ? `<div class="table-wrap">
              <table class="ticket-table">
                <thead><tr><th>งาน</th><th>ลูกค้า / โครงการ</th><th>สถานที่</th><th>ช่าง / กำหนด</th><th>ความสำคัญ</th><th>สถานะ</th><th></th></tr></thead>
                <tbody>${ticketRows(tickets)}</tbody>
              </table>
            </div>
            <div class="mobile-ticket-list">${ticketCards(tickets)}</div>`
          : `<div class="empty-state"><div><div class="empty-icon">${icon("search")}</div><h3>ไม่พบงานตามเงื่อนไข</h3><p>ลองเปลี่ยนตัวกรองหรือคำค้นหา</p></div></div>`
      }
    </section>`;
}

function renderWorkload() {
  const activeTickets = currentScopeTickets().filter((ticket) => ticket.status !== "completed");
  const rows = technicians.map((tech) => ({
    ...tech,
    count: activeTickets.filter((ticket) => ticket.technicianId === tech.id).length,
  }));
  const max = Math.max(...rows.map((row) => row.count), 1);
  const closedToday = currentScopeTickets().filter((ticket) => ticket.status === "completed").length;
  return `
    <aside class="panel side-panel">
      <div class="panel-header"><div><h2 class="panel-title">ภาระงานทีมช่าง</h2><p class="panel-subtitle">งานที่ยังไม่ปิด แยกตามผู้รับผิดชอบ</p></div></div>
      <div class="workload-list">
        ${rows
          .map(
            (row) => `
            <div class="workload-item">
              <div class="workload-head"><span class="workload-name">${escapeHtml(row.shortName)}</span><span class="workload-count">${row.count} งาน</span></div>
              <div class="progress-track"><div class="progress-fill" style="width:${(row.count / max) * 100}%"></div></div>
            </div>`,
          )
          .join("")}
      </div>
      <div class="quick-summary">
        <p class="quick-summary-label">ส่งกลับ Helpdesk แล้ว</p>
        <strong>${closedToday}</strong>
        <p>งานในขอบเขตที่เลือกมีหลักฐานครบและปิดงานเรียบร้อย</p>
      </div>
    </aside>`;
}

function renderDashboardPage() {
  return `
    <main class="page">
      <div class="page-heading">
        <div><p class="eyebrow">Operations overview</p><h1 class="page-title">แดชบอร์ดงานช่าง</h1><p class="page-description">ติดตามงานค้าง งานระหว่างดำเนินการ และงานที่ส่งกลับ Helpdesk</p></div>
        <button class="secondary-button" id="refresh-page">${icon("refresh")}<span>รีเฟรชข้อมูล</span></button>
      </div>
      ${renderStats()}
      <div class="dashboard-layout">${renderTicketPanel({ limit: 7 })}${renderWorkload()}</div>
    </main>`;
}

function renderTicketsPage() {
  return `
    <main class="page">
      <div class="page-heading"><div><p class="eyebrow">Work orders</p><h1 class="page-title">รายการงานทั้งหมด</h1><p class="page-description">ค้นหา เปิด Ticket และดำเนินงานตามขั้นตอนหน้างาน</p></div></div>
      ${renderStats()}
      ${renderTicketPanel({ title: "Ticket ทั้งหมด", subtitle: `${getFilteredTickets().length} รายการตามตัวกรองปัจจุบัน` })}
    </main>`;
}

function renderProjectsPage() {
  const cards = projects.map((project) => {
    const tickets = state.tickets.filter((ticket) => ticket.projectId === project.id);
    const active = tickets.filter((ticket) => ticket.status !== "completed").length;
    const completed = tickets.filter((ticket) => ticket.status === "completed").length;
    const percent = tickets.length ? Math.round((completed / tickets.length) * 100) : 0;
    return `
      <article class="panel detail-card">
        <div class="detail-card-head"><div><h2 class="detail-card-title">${icon("building")}${escapeHtml(project.name)}</h2><p class="detail-card-note">${project.code} · ${escapeHtml(project.location)}</p></div><span class="status-badge status-in_progress">${active} งานค้าง</span></div>
        <div class="meta-grid"><dl class="meta-item"><dt>งานทั้งหมด</dt><dd>${tickets.length} รายการ</dd></dl><dl class="meta-item"><dt>ปิดงานแล้ว</dt><dd>${completed} รายการ</dd></dl></div>
        <div class="workload-item" style="margin-top:16px"><div class="workload-head"><span class="workload-name">อัตราปิดงาน</span><span class="workload-count">${percent}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div></div>
        <div class="action-row"><button class="secondary-button" data-project-open="${project.id}">${icon("clipboard")}ดูงานโครงการ</button></div>
      </article>`;
  });
  return `
    <main class="page">
      <div class="page-heading"><div><p class="eyebrow">Projects</p><h1 class="page-title">โครงการที่ดูแล</h1><p class="page-description">เลือกโครงการเพื่อดูภาระงานและสถานะการให้บริการ</p></div></div>
      <section class="dashboard-layout" style="grid-template-columns:repeat(auto-fit,minmax(290px,1fr))">${cards.join("")}</section>
    </main>`;
}

function renderTechniciansPage() {
  const cards = technicians.map((tech) => {
    const tickets = state.tickets.filter((ticket) => ticket.technicianId === tech.id);
    const active = tickets.filter((ticket) => ticket.status !== "completed").length;
    const completed = tickets.filter((ticket) => ticket.status === "completed").length;
    return `
      <article class="panel detail-card">
        <div class="technician-row"><div class="avatar">${tech.initials}</div><div><h2 class="panel-title">${escapeHtml(tech.name)}</h2><p class="panel-subtitle">${escapeHtml(tech.role)}</p></div></div>
        <div class="meta-grid" style="margin-top:18px"><dl class="meta-item"><dt>งานค้าง</dt><dd>${active} รายการ</dd></dl><dl class="meta-item"><dt>ปิดงานแล้ว</dt><dd>${completed} รายการ</dd></dl></div>
        <div class="action-row"><button class="secondary-button" data-technician-open="${tech.id}">${icon("clipboard")}ดูงานของช่าง</button></div>
      </article>`;
  });
  return `
    <main class="page">
      <div class="page-heading"><div><p class="eyebrow">Technicians</p><h1 class="page-title">ทีมช่างบริการ</h1><p class="page-description">ดูงานค้างและผลงานของช่างแต่ละคน</p></div></div>
      <section class="dashboard-layout" style="grid-template-columns:repeat(auto-fit,minmax(270px,1fr))">${cards.join("")}</section>
    </main>`;
}

function renderHelpdeskPage() {
  const completed = state.tickets.filter((ticket) => ticket.status === "completed");
  const sent = completed.filter((ticket) => ticket.sentToHelpdesk).length;
  const ratings = completed.filter((ticket) => ticket.rating > 0).map((ticket) => ticket.rating);
  const average = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : "—";
  const previousStatus = ui.statusFilter;
  ui.statusFilter = "completed";
  const panel = renderTicketPanel({ title: "งานที่ส่งกลับศูนย์", subtitle: "รายการปิดงานพร้อมหลักฐานและลายเซ็นลูกค้า" });
  ui.statusFilter = previousStatus;
  return `
    <main class="page">
      <div class="page-heading"><div><p class="eyebrow">Central service desk</p><h1 class="page-title">Helpdesk Center</h1><p class="page-description">ตรวจสอบงานที่ช่างปิดและส่งกลับเข้าส่วนกลาง</p></div></div>
      <section class="stat-grid">
        <article class="stat-card completed"><div class="stat-top"><div class="stat-icon">${icon("send")}</div></div><p class="stat-count">${sent}</p><p class="stat-label">ส่งเข้าส่วนกลางแล้ว</p></article>
        <article class="stat-card progress"><div class="stat-top"><div class="stat-icon">${icon("star")}</div></div><p class="stat-count">${average}</p><p class="stat-label">คะแนนเฉลี่ยจากลูกค้า</p></article>
        <article class="stat-card open"><div class="stat-top"><div class="stat-icon">${icon("clipboard")}</div></div><p class="stat-count">${state.tickets.filter((ticket) => ticket.status !== "completed").length}</p><p class="stat-label">งานที่ยังเปิดอยู่</p></article>
        <article class="stat-card waiting"><div class="stat-top"><div class="stat-icon">${icon("alert")}</div></div><p class="stat-count">0</p><p class="stat-label">รายการส่งไม่สำเร็จ</p></article>
      </section>
      ${panel}
    </main>`;
}

function renderMainPage() {
  if (ui.activeNav === "tickets") return renderTicketsPage();
  if (ui.activeNav === "projects") return renderProjectsPage();
  if (ui.activeNav === "technicians") return renderTechniciansPage();
  if (ui.activeNav === "helpdesk") return renderHelpdeskPage();
  return renderDashboardPage();
}

function renderMobileNav() {
  return `<nav class="mobile-nav" aria-label="เมนูมือถือ">
    ${navItems
      .slice(0, 4)
      .map((item) => `<button class="${ui.activeNav === item.id ? "active" : ""}" data-nav="${item.id}">${icon(item.icon)}<span>${item.label}</span></button>`)
      .join("")}
  </nav>`;
}

function workflowIndex(ticket) {
  if (ticket.status === "completed") return 3;
  if (["in_progress", "waiting"].includes(ticket.status)) return 2;
  if (ticket.status === "checked_in") return 1;
  return 0;
}

function renderWorkflow(ticket) {
  const current = workflowIndex(ticket);
  const steps = [
    { label: "รับ Ticket", icon: "clipboard" },
    { label: "Check-in", icon: "map" },
    { label: "แก้ไขงาน", icon: "wrench" },
    { label: "ปิดงาน", icon: "check" },
  ];
  return `<div class="workflow">${steps
    .map((step, index) => `<div class="workflow-step ${index < current ? "done" : index === current ? "current" : ""}"><div class="workflow-dot">${icon(index < current ? "check" : step.icon)}</div><span>${step.label}</span></div>`)
    .join("")}</div>`;
}

function attachmentPreview(ticket, field, label, accept) {
  const attachment = ticket[field];
  if (attachment) {
    const isImage = attachment.type?.startsWith("image/") || attachment.data?.startsWith("data:image");
    return `
      <div class="upload-box">
        <div class="upload-preview">
          ${isImage ? `<img src="${attachment.data}" alt="${escapeHtml(label)}" />` : `<div class="upload-label">${icon("file")}<div><strong>${escapeHtml(attachment.name)}</strong><span>ไฟล์เอกสารแนบ</span></div></div>`}
          <div class="upload-preview-meta"><span>${escapeHtml(attachment.name)}</span>${ticket.status !== "completed" ? `<button class="upload-remove" data-remove-upload="${field}" aria-label="ลบไฟล์">${icon("x")}</button>` : ""}</div>
        </div>
      </div>`;
  }
  return `
    <div class="upload-box">
      <input id="upload-${field}" type="file" data-upload="${field}" accept="${accept}" ${ticket.status === "completed" ? "disabled" : ""} />
      <label class="upload-label" for="upload-${field}">${icon(field === "workOrder" ? "file" : "camera")}<div><strong>${label}</strong><span>${field === "workOrder" ? "ภาพหรือ PDF สูงสุด 5 MB" : "ถ่ายภาพหรือเลือกจากเครื่อง"}</span></div></label>
    </div>`;
}

function completionRequirements(ticket) {
  return [
    { label: "Check-in พร้อมพิกัด", ok: Boolean(ticket.checkIn) },
    { label: "บันทึกเวลาเริ่มงาน", ok: Boolean(ticket.startedAt) },
    { label: "รายละเอียดการแก้ไข", ok: Boolean(ticket.repairDetail?.trim().length >= 5) },
    { label: "รูปก่อนทำ", ok: Boolean(ticket.beforePhoto) },
    { label: "รูปหลังทำ", ok: Boolean(ticket.afterPhoto) },
    { label: "ชื่อและลายเซ็นลูกค้า", ok: Boolean(ticket.customerName?.trim() && ticket.signature) },
    { label: "คะแนนความพึงพอใจ", ok: Number(ticket.rating) > 0 },
  ];
}

function renderChecklist(ticket) {
  return `<div class="completion-checklist">${completionRequirements(ticket)
    .map((item) => `<div class="check-item ${item.ok ? "ok" : ""}">${icon(item.ok ? "checkCircle" : "alert")}<span>${item.label}</span></div>`)
    .join("")}</div>`;
}

function renderTicketDrawer(ticket) {
  const project = getProject(ticket.projectId);
  const technician = getTechnician(ticket.technicianId);
  const completed = ticket.status === "completed";
  const canStart = Boolean(ticket.checkIn && !ticket.startedAt && !completed);
  const requirements = completionRequirements(ticket);
  const completeCount = requirements.filter((item) => item.ok).length;
  const canComplete = completeCount === requirements.length && !completed;
  return `
    <div class="overlay" id="ticket-overlay">
      <aside class="ticket-drawer" role="dialog" aria-modal="true" aria-labelledby="ticket-title">
        <div class="drawer-header">
          <div class="drawer-title-wrap"><p class="drawer-id">${ticket.id}</p><h2 class="drawer-title" id="ticket-title">${escapeHtml(ticket.title)}</h2><div class="action-row" style="margin-top:9px">${priorityBadge(ticket)}${statusBadge(ticket)}</div></div>
          <button class="close-button" id="close-drawer" aria-label="ปิดรายละเอียด">${icon("x")}</button>
        </div>
        <div class="drawer-content">
          <section class="detail-card">
            <div class="detail-card-head"><div><h3 class="detail-card-title">${icon("briefcase")}รายละเอียด Ticket</h3><p class="detail-card-note">ข้อมูลที่ส่งมาจาก Helpdesk Center</p></div></div>
            <div class="meta-grid">
              <dl class="meta-item"><dt>โครงการ</dt><dd>${escapeHtml(project.name)}</dd></dl>
              <dl class="meta-item"><dt>ช่างผู้รับผิดชอบ</dt><dd>${escapeHtml(technician.name)}</dd></dl>
              <dl class="meta-item"><dt>ลูกค้า</dt><dd>${escapeHtml(ticket.client)}</dd></dl>
              <dl class="meta-item"><dt>หมวดงาน</dt><dd>${escapeHtml(ticket.category)}</dd></dl>
              <dl class="meta-item"><dt>สถานที่</dt><dd>${escapeHtml(ticket.location)}</dd></dl>
              <dl class="meta-item"><dt>กำหนดดำเนินการ</dt><dd>${formatDateTime(ticket.dueAt)}</dd></dl>
              <dl class="meta-item" style="grid-column:1/-1"><dt>อาการที่แจ้ง</dt><dd>${escapeHtml(ticket.description)}</dd></dl>
            </div>
          </section>

          <section class="detail-card">
            <div class="detail-card-head"><div><h3 class="detail-card-title">${icon("timer")}ความคืบหน้า</h3><p class="detail-card-note">สถานะงานจากรับ Ticket ถึงส่งกลับส่วนกลาง</p></div></div>
            ${renderWorkflow(ticket)}
          </section>

          <section class="detail-card">
            <div class="detail-card-head"><div><h3 class="detail-card-title">${icon("map")}Check-in หน้างาน</h3><p class="detail-card-note">บันทึกเวลา ตำแหน่ง และความแม่นยำของ GPS</p></div></div>
            ${
              ticket.checkIn
                ? `<div class="success-box">${icon("checkCircle")}<div><strong>บันทึก Check-in แล้ว</strong><br />พิกัดถูกเก็บพร้อมเวลาเข้าหน้างาน</div></div>
                   <div class="checkin-result"><div class="result-tile"><span class="result-label">เวลา Check-in</span><span class="result-value">${formatDateTime(ticket.checkIn.at)}</span></div><div class="result-tile"><span class="result-label">พิกัด</span><span class="result-value">${Number(ticket.checkIn.lat).toFixed(6)}, ${Number(ticket.checkIn.lng).toFixed(6)}</span></div></div>
                   <div class="action-row"><button class="secondary-button" data-open-map="${ticket.checkIn.lat},${ticket.checkIn.lng}">${icon("navigation")}เปิดแผนที่</button></div>`
                : `<div class="info-box">${icon("navigation")}<div>กด Check-in เมื่อถึงหน้างาน ระบบจะขอสิทธิ์ตำแหน่งจากอุปกรณ์</div></div>
                   <div class="action-row"><button class="primary-button" id="check-in-button">${icon("map")}Check-in ด้วย GPS</button></div>
                   ${
                     ui.locationError
                       ? `<div class="manual-location"><div class="form-field"><label for="manual-lat">Latitude</label><input id="manual-lat" inputmode="decimal" placeholder="13.7563" /></div><div class="form-field"><label for="manual-lng">Longitude</label><input id="manual-lng" inputmode="decimal" placeholder="100.5018" /></div><div class="action-row"><button class="secondary-button" id="manual-check-in">บันทึกพิกัดเอง</button></div></div>`
                       : ""
                   }`
            }
          </section>

          <section class="detail-card">
            <div class="detail-card-head"><div><h3 class="detail-card-title">${icon("wrench")}การดำเนินงาน</h3><p class="detail-card-note">บันทึกเวลาเริ่มงาน สถานะ และรายละเอียดการแก้ไข</p></div></div>
            <div class="form-grid">
              <div class="form-field"><label>เวลาเริ่มงาน</label><input readonly value="${ticket.startedAt ? formatDateTime(ticket.startedAt) : "ยังไม่เริ่มงาน"}" /></div>
              <div class="form-field"><label>เวลาเสร็จงาน</label><input readonly value="${ticket.completedAt ? formatDateTime(ticket.completedAt) : "ยังไม่เสร็จงาน"}" /></div>
              <div class="form-field full"><label for="repair-detail">รายละเอียดการตรวจสอบและแก้ไข</label><textarea id="repair-detail" data-ticket-field="repairDetail" ${completed ? "readonly" : ""} placeholder="ระบุสาเหตุ วิธีแก้ไข อะไหล่ที่เปลี่ยน และผลการทดสอบ">${escapeHtml(ticket.repairDetail)}</textarea></div>
              ${ticket.status === "waiting" ? `<div class="form-field full"><label>เหตุผลที่รอดำเนินการ</label><input readonly value="${escapeHtml(ticket.waitingReason || "รอข้อมูลเพิ่มเติม")}" /></div>` : ""}
            </div>
            <div class="action-row">
              ${canStart ? `<button class="primary-button" id="start-work">${icon("play")}เริ่มแก้ไขงาน</button>` : ""}
              ${ticket.startedAt && !completed && ticket.status !== "waiting" ? `<button class="secondary-button" id="mark-waiting">${icon("pause")}พักงาน / รออะไหล่</button>` : ""}
              ${ticket.status === "waiting" && !completed ? `<button class="primary-button" id="resume-work">${icon("play")}ดำเนินงานต่อ</button>` : ""}
            </div>
          </section>

          <section class="detail-card">
            <div class="detail-card-head"><div><h3 class="detail-card-title">${icon("camera")}หลักฐานและใบงาน</h3><p class="detail-card-note">รูปจะถูกย่อขนาดก่อนเก็บในข้อมูลเดโม</p></div></div>
            <div class="upload-grid">
              ${attachmentPreview(ticket, "beforePhoto", "รูปก่อนทำ", "image/*")}
              ${attachmentPreview(ticket, "afterPhoto", "รูปหลังทำ", "image/*")}
              ${attachmentPreview(ticket, "workOrder", "ใบงาน / เอกสาร", "image/*,.pdf,application/pdf")}
            </div>
          </section>

          <section class="detail-card">
            <div class="detail-card-head"><div><h3 class="detail-card-title">${icon("pen")}ลูกค้าเซ็นรับงาน</h3><p class="detail-card-note">ระบุชื่อผู้รับรองและลงลายเซ็นบนหน้าจอ</p></div></div>
            <div class="form-field" style="margin-bottom:12px"><label for="customer-name">ชื่อผู้รับรองงาน</label><input id="customer-name" data-ticket-field="customerName" value="${escapeHtml(ticket.customerName)}" ${completed ? "readonly" : ""} placeholder="ชื่อ-นามสกุล ลูกค้า" /></div>
            <div class="signature-wrap">
              <canvas class="signature-canvas" id="signature-canvas" aria-label="พื้นที่ลงลายเซ็น"></canvas>
              <div class="signature-footer"><span>${ticket.signature ? "มีลายเซ็นบันทึกแล้ว" : "ใช้นิ้ว เมาส์ หรือปากกาวาดลายเซ็น"}</span>${!completed ? `<button class="ghost-button" id="clear-signature" type="button">ล้างลายเซ็น</button>` : ""}</div>
            </div>
          </section>

          <section class="detail-card">
            <div class="detail-card-head"><div><h3 class="detail-card-title">${icon("star")}ความพึงพอใจ</h3><p class="detail-card-note">ให้ลูกค้าประเมินบริการหลังดำเนินการเสร็จ</p></div></div>
            <div class="star-rating" aria-label="คะแนนความพึงพอใจ">
              ${[1, 2, 3, 4, 5].map((score) => `<button class="star-button ${ticket.rating >= score ? "active" : ""}" data-rating="${score}" ${completed ? "disabled" : ""} aria-label="${score} ดาว">${icon("star")}</button>`).join("")}
              <span class="rating-label">${ticket.rating ? `${ticket.rating}/5 ดาว` : "ยังไม่ได้ประเมิน"}</span>
            </div>
            <div class="form-field" style="margin-top:12px"><label for="rating-comment">ความคิดเห็นเพิ่มเติม</label><textarea id="rating-comment" data-ticket-field="ratingComment" ${completed ? "readonly" : ""} placeholder="ความคิดเห็นของลูกค้า (ไม่บังคับ)">${escapeHtml(ticket.ratingComment)}</textarea></div>
          </section>

          <section class="detail-card">
            <div class="detail-card-head"><div><h3 class="detail-card-title">${icon("checkCircle")}ความพร้อมก่อนปิดงาน</h3><p class="detail-card-note">ต้องครบทุกหัวข้อจึงส่งกลับ Helpdesk ได้</p></div><span class="status-badge ${canComplete || completed ? "status-completed" : "status-waiting"}">${completeCount}/${requirements.length}</span></div>
            ${renderChecklist(ticket)}
            ${completed ? `<div class="success-box" style="margin-top:13px">${icon("send")}<div><strong>ส่งกลับ Helpdesk แล้ว</strong><br />${formatDateTime(ticket.closedAt)}</div></div>` : ""}
          </section>

          <section class="detail-card">
            <div class="detail-card-head"><div><h3 class="detail-card-title">${icon("clock")}ประวัติการดำเนินงาน</h3></div></div>
            <ol class="audit-list">${(ticket.logs || []).map((log) => `<li class="audit-item"><span class="audit-dot"></span><div><p class="audit-title">${escapeHtml(log.title)}</p><p class="audit-time">${formatDateTime(log.at)}</p></div></li>`).join("")}</ol>
          </section>
        </div>
        <footer class="drawer-footer">
          <div class="footer-status"><strong>${completed ? "งานนี้ปิดแล้ว" : `พร้อมปิดงาน ${completeCount}/${requirements.length}`}</strong><span>${completed ? "ข้อมูลถูกส่งกลับ Helpdesk Center" : canComplete ? "ข้อมูลครบ สามารถปิดงานได้" : "กรอกข้อมูลและแนบหลักฐานให้ครบ"}</span></div>
          <div class="footer-actions">
            <button class="secondary-button" id="close-drawer-footer">ปิดหน้าต่าง</button>
            ${!completed ? `<button class="primary-button" id="complete-ticket" ${canComplete ? "" : "disabled"}>${icon("send")}ปิดงานและส่ง Helpdesk</button>` : `<button class="primary-button" id="download-report">${icon("download")}ดาวน์โหลดข้อมูล</button>`}
          </div>
        </footer>
      </aside>
    </div>`;
}

function renderApp() {
  const app = document.querySelector("#app");
  const ticket = getSelectedTicket();
  app.innerHTML = `
    <div class="app-shell">
      ${renderSidebar()}
      <div class="main-shell">${renderTopbar()}${renderMainPage()}</div>
      ${renderMobileNav()}
      ${ticket ? renderTicketDrawer(ticket) : ""}
    </div>`;
  bindEvents();
  if (ticket) initSignatureCanvas(ticket);
}

function closeDrawer() {
  ui.selectedTicketId = null;
  ui.locationError = false;
  renderApp();
}

function showToast(title, message, type = "") {
  const region = document.querySelector("#toast-region");
  if (!region) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icon(type === "error" ? "alert" : type === "success" ? "checkCircle" : "clipboard")}<div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span></div>`;
  region.appendChild(toast);
  window.setTimeout(() => toast.remove(), 4200);
}

function bindEvents() {
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.activeNav = button.dataset.nav;
      ui.statusFilter = "all";
      ui.search = "";
      renderApp();
    });
  });

  document.querySelector("#project-filter")?.addEventListener("change", (event) => {
    ui.projectFilter = event.target.value;
    renderApp();
  });

  document.querySelector("#technician-filter")?.addEventListener("change", (event) => {
    ui.technicianFilter = event.target.value;
    renderApp();
  });

  document.querySelector("#ticket-search")?.addEventListener("input", (event) => {
    ui.search = event.target.value;
    const cursor = event.target.selectionStart;
    renderApp();
    const input = document.querySelector("#ticket-search");
    if (input) {
      input.focus();
      input.setSelectionRange(cursor, cursor);
    }
  });

  document.querySelectorAll("[data-status-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.statusFilter = button.dataset.statusFilter;
      renderApp();
    });
  });

  document.querySelectorAll("[data-ticket-id]").forEach((row) => {
    const open = () => {
      ui.selectedTicketId = row.dataset.ticketId;
      ui.locationError = false;
      renderApp();
    };
    row.addEventListener("click", open);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });

  document.querySelectorAll("[data-project-open]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.projectFilter = button.dataset.projectOpen;
      ui.activeNav = "tickets";
      renderApp();
    });
  });

  document.querySelectorAll("[data-technician-open]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.technicianFilter = button.dataset.technicianOpen;
      ui.activeNav = "tickets";
      renderApp();
    });
  });

  document.querySelector("#refresh-page")?.addEventListener("click", () => {
    renderApp();
    showToast("อัปเดตข้อมูลแล้ว", "แสดงข้อมูลล่าสุดจากอุปกรณ์นี้", "success");
  });

  document.querySelector("#reset-demo")?.addEventListener("click", resetState);
  document.querySelector("#close-drawer")?.addEventListener("click", closeDrawer);
  document.querySelector("#close-drawer-footer")?.addEventListener("click", closeDrawer);
  document.querySelector("#ticket-overlay")?.addEventListener("click", (event) => {
    if (event.target.id === "ticket-overlay") closeDrawer();
  });

  document.querySelectorAll("[data-ticket-field]").forEach((field) => {
    field.addEventListener("input", () => {
      const ticket = getSelectedTicket();
      if (!ticket) return;
      updateTicket(ticket.id, { [field.dataset.ticketField]: field.value });
    });
  });

  document.querySelector("#check-in-button")?.addEventListener("click", checkInWithGps);
  document.querySelector("#manual-check-in")?.addEventListener("click", manualCheckIn);
  document.querySelector("#start-work")?.addEventListener("click", startWork);
  document.querySelector("#mark-waiting")?.addEventListener("click", markWaiting);
  document.querySelector("#resume-work")?.addEventListener("click", resumeWork);
  document.querySelector("#complete-ticket")?.addEventListener("click", completeTicket);
  document.querySelector("#clear-signature")?.addEventListener("click", clearSignature);
  document.querySelector("#download-report")?.addEventListener("click", downloadTicketReport);

  document.querySelectorAll("[data-open-map]").forEach((button) => {
    button.addEventListener("click", () => window.open(`https://www.google.com/maps?q=${button.dataset.openMap}`, "_blank", "noopener,noreferrer"));
  });

  document.querySelectorAll("[data-rating]").forEach((button) => {
    button.addEventListener("click", () => {
      const ticket = getSelectedTicket();
      if (!ticket || ticket.status === "completed") return;
      updateTicket(ticket.id, { rating: Number(button.dataset.rating) });
      renderApp();
    });
  });

  document.querySelectorAll("[data-upload]").forEach((input) => {
    input.addEventListener("change", () => handleUpload(input));
  });

  document.querySelectorAll("[data-remove-upload]").forEach((button) => {
    button.addEventListener("click", () => {
      const ticket = getSelectedTicket();
      if (!ticket) return;
      updateTicket(ticket.id, { [button.dataset.removeUpload]: null });
      renderApp();
      showToast("ลบไฟล์แล้ว", "ไฟล์ถูกนำออกจาก Ticket", "success");
    });
  });
}

function checkInWithGps() {
  const ticket = getSelectedTicket();
  if (!ticket) return;
  if (!navigator.geolocation) {
    ui.locationError = true;
    renderApp();
    showToast("อุปกรณ์ไม่รองรับ GPS", "กรอกพิกัดด้วยตนเองได้", "error");
    return;
  }
  showToast("กำลังอ่านตำแหน่ง", "อนุญาตการเข้าถึงตำแหน่งเมื่อ browser ถาม");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const checkIn = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: Math.round(position.coords.accuracy || 0),
        at: nowIso(),
      };
      updateTicket(ticket.id, { checkIn, status: "checked_in" }, "Check-in ที่หน้างานด้วย GPS");
      ui.locationError = false;
      renderApp();
      showToast("Check-in สำเร็จ", `ความแม่นยำประมาณ ${checkIn.accuracy} เมตร`, "success");
    },
    (error) => {
      console.warn("Geolocation error", error);
      ui.locationError = true;
      renderApp();
      showToast("อ่านตำแหน่งไม่สำเร็จ", "ตรวจสิทธิ์ตำแหน่ง หรือกรอกพิกัดด้วยตนเอง", "error");
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
  );
}

function manualCheckIn() {
  const ticket = getSelectedTicket();
  const lat = Number(document.querySelector("#manual-lat")?.value);
  const lng = Number(document.querySelector("#manual-lng")?.value);
  if (!ticket || !Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    showToast("พิกัดไม่ถูกต้อง", "Latitude ต้องอยู่ระหว่าง -90 ถึง 90 และ Longitude ระหว่าง -180 ถึง 180", "error");
    return;
  }
  updateTicket(ticket.id, { checkIn: { lat, lng, accuracy: null, at: nowIso(), manual: true }, status: "checked_in" }, "Check-in ที่หน้างานด้วยพิกัดที่ระบุ");
  ui.locationError = false;
  renderApp();
  showToast("บันทึก Check-in แล้ว", "ระบบเก็บเวลาและพิกัดเรียบร้อย", "success");
}

function startWork() {
  const ticket = getSelectedTicket();
  if (!ticket || !ticket.checkIn) return;
  updateTicket(ticket.id, { startedAt: nowIso(), status: "in_progress" }, "เริ่มดำเนินการแก้ไข");
  renderApp();
  showToast("เริ่มจับเวลางาน", "บันทึกเวลาเริ่มแก้ไขแล้ว", "success");
}

function markWaiting() {
  const ticket = getSelectedTicket();
  if (!ticket) return;
  const reason = window.prompt("ระบุเหตุผลที่ต้องพักงานหรือรอดำเนินการ", ticket.waitingReason || "รออะไหล่");
  if (reason === null) return;
  const cleanReason = reason.trim() || "รอดำเนินการเพิ่มเติม";
  updateTicket(ticket.id, { status: "waiting", waitingReason: cleanReason }, `พักงาน: ${cleanReason}`);
  renderApp();
  showToast("เปลี่ยนสถานะแล้ว", "Ticket อยู่ในกลุ่มรอดำเนินการ", "success");
}

function resumeWork() {
  const ticket = getSelectedTicket();
  if (!ticket) return;
  updateTicket(ticket.id, { status: "in_progress", waitingReason: "" }, "กลับมาดำเนินการแก้ไขต่อ");
  renderApp();
  showToast("ดำเนินงานต่อ", "Ticket กลับสู่สถานะกำลังดำเนินการ", "success");
}

function completeTicket() {
  const ticket = getSelectedTicket();
  if (!ticket) return;
  const missing = completionRequirements(ticket).filter((item) => !item.ok);
  if (missing.length) {
    showToast("ยังปิดงานไม่ได้", `ข้อมูลที่ขาด: ${missing.map((item) => item.label).join(", ")}`, "error");
    return;
  }
  const finishedAt = nowIso();
  updateTicket(
    ticket.id,
    { status: "completed", completedAt: ticket.completedAt || finishedAt, closedAt: finishedAt, sentToHelpdesk: true },
    "ปิดงานและส่งกลับ Helpdesk",
  );
  renderApp();
  showToast("ปิดงานสำเร็จ", "ข้อมูล หลักฐาน ลายเซ็น และคะแนนถูกส่งกลับ Helpdesk แล้ว", "success");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function compressImage(file) {
  const raw = await readFileAsDataUrl(file);
  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = raw;
  });
  const maxDimension = 1280;
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.78);
}

async function handleUpload(input) {
  const ticket = getSelectedTicket();
  const file = input.files?.[0];
  const field = input.dataset.upload;
  if (!ticket || !file || !field) return;
  if (file.size > 5 * 1024 * 1024) {
    showToast("ไฟล์มีขนาดใหญ่เกินไป", "เลือกไฟล์ขนาดไม่เกิน 5 MB", "error");
    input.value = "";
    return;
  }
  try {
    const isImage = file.type.startsWith("image/");
    if (["beforePhoto", "afterPhoto"].includes(field) && !isImage) {
      showToast("ชนิดไฟล์ไม่ถูกต้อง", "รูปก่อนทำและหลังทำต้องเป็นไฟล์ภาพ", "error");
      return;
    }
    const data = isImage ? await compressImage(file) : await readFileAsDataUrl(file);
    updateTicket(ticket.id, { [field]: { name: file.name, type: file.type, data } }, `แนบ${field === "beforePhoto" ? "รูปก่อนทำ" : field === "afterPhoto" ? "รูปหลังทำ" : "ใบงาน"}`);
    renderApp();
    showToast("แนบไฟล์แล้ว", file.name, "success");
  } catch (error) {
    console.error(error);
    showToast("อ่านไฟล์ไม่สำเร็จ", "ลองเลือกไฟล์ใหม่อีกครั้ง", "error");
  }
}

function initSignatureCanvas(ticket) {
  const canvas = document.querySelector("#signature-canvas");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#10233f";

  if (ticket.signature) {
    const saved = new Image();
    saved.onload = () => ctx.drawImage(saved, 0, 0, rect.width, rect.height);
    saved.src = ticket.signature;
  }

  if (ticket.status === "completed") return;

  let drawing = false;
  let changed = false;

  const point = (event) => {
    const bounds = canvas.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  canvas.addEventListener("pointerdown", (event) => {
    drawing = true;
    changed = true;
    canvas.setPointerCapture(event.pointerId);
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    window.addEventListener("pointerup", finish, { once: true });
    window.addEventListener("pointercancel", finish, { once: true });
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!drawing) return;
    const p = point(event);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });

  const finish = (event) => {
    if (!drawing) return;
    drawing = false;
    try {
      if (event?.pointerId !== undefined && canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    } catch (error) {
      console.debug("Pointer capture release skipped", error);
    }
    if (changed) {
      updateTicket(ticket.id, { signature: canvas.toDataURL("image/png") }, "ลูกค้าลงลายเซ็นรับงาน");
      changed = false;
      window.setTimeout(renderApp, 0);
    }
  };

  canvas.addEventListener("pointerup", finish);
  canvas.addEventListener("pointercancel", finish);
  canvas.addEventListener("pointerleave", (event) => {
    if (drawing && event.buttons === 0) finish(event);
  });
}

function clearSignature() {
  const ticket = getSelectedTicket();
  if (!ticket) return;
  updateTicket(ticket.id, { signature: null });
  renderApp();
  showToast("ล้างลายเซ็นแล้ว", "ลูกค้าสามารถลงลายเซ็นใหม่ได้");
}

function downloadTicketReport() {
  const ticket = getSelectedTicket();
  if (!ticket) return;
  const project = getProject(ticket.projectId);
  const technician = getTechnician(ticket.technicianId);
  const report = {
    ticketId: ticket.id,
    status: ticket.status,
    project: project.name,
    technician: technician.name,
    client: ticket.client,
    location: ticket.location,
    checkIn: ticket.checkIn,
    startedAt: ticket.startedAt,
    completedAt: ticket.completedAt,
    closedAt: ticket.closedAt,
    repairDetail: ticket.repairDetail,
    attachments: {
      beforePhoto: ticket.beforePhoto?.name || null,
      afterPhoto: ticket.afterPhoto?.name || null,
      workOrder: ticket.workOrder?.name || null,
    },
    customer: {
      name: ticket.customerName,
      signed: Boolean(ticket.signature),
      rating: ticket.rating,
      comment: ticket.ratingComment,
    },
    sentToHelpdesk: ticket.sentToHelpdesk,
    auditLog: ticket.logs,
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${ticket.id}-service-report.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast("ดาวน์โหลดรายงานแล้ว", `${ticket.id}-service-report.json`, "success");
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && ui.selectedTicketId) closeDrawer();
});

renderApp();
