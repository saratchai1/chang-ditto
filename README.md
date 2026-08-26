# Chang Ditto

เว็บแอปต้นแบบสำหรับช่างบริการหน้างานตาม requirement จากบทสนทนาในไฟล์เสียง

## ฟังก์ชันที่มีใน MVP

- Dashboard สรุปงานรอรับ งานกำลังดำเนินการ งานรออะไหล่ และงานปิดแล้ว
- กรองตามโครงการ ช่าง สถานะ และค้นหาจากเลขที่งาน/ลูกค้า/สถานที่
- เปิด Ticket เพื่อบันทึกเวลา Check-in และตำแหน่ง GPS
- บันทึกเวลาเริ่มงาน เวลาเสร็จ และรายละเอียดการแก้ไข
- แนบรูปก่อนทำ รูปหลังทำ และใบงาน
- ลูกค้าเซ็นรับงานบนหน้าจอ
- ลูกค้าให้คะแนนความพึงพอใจ 1–5 ดาว
- ตรวจสอบข้อมูลบังคับก่อนปิดงานและส่งกลับ Helpdesk
- รองรับช่างหลายคนและหลายโครงการ
- เก็บข้อมูลเดโมใน `localStorage` เพื่อให้ทดลอง workflow ได้โดยไม่ต้องมี backend

## การเปิดใช้งาน

เปิด `index.html` ผ่าน static web server เช่น:

```bash
python3 -m http.server 8080
```

แล้วเปิด `http://localhost:8080`

> ควรเปิดผ่าน `localhost` หรือ HTTPS เพื่อใช้ Geolocation

## Deploy

Repository นี้เป็น static site จึง deploy บน Vercel ได้ทันทีโดยไม่ต้องตั้งค่า build command

## ขอบเขตของต้นแบบ

MVP นี้ยังไม่มีระบบ Login, Database กลาง, Object Storage, Notification และการเชื่อม Helpdesk API จริง การกด “ปิดงานและส่ง Helpdesk” จะจำลองการส่งงานและบันทึกสถานะไว้ใน browser

## แนวทางต่อ backend

ข้อมูลหลักที่ควรมี ได้แก่ `projects`, `technicians`, `tickets`, `ticket_events`, `attachments`, `customer_signatures` และ `satisfaction_reviews` โดย endpoint สำคัญคือ:

- `GET /api/tickets`
- `GET /api/tickets/:id`
- `POST /api/tickets/:id/check-in`
- `POST /api/tickets/:id/start`
- `POST /api/tickets/:id/attachments`
- `POST /api/tickets/:id/complete`
- `POST /api/tickets/:id/review`
