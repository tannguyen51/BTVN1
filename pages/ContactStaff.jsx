import React, { useState } from 'react';

function ContactStaff() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thông tin của bạn đã được gửi tới staff!');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: '40px auto',
        padding: 32,
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <h2 style={{ color: '#1976d2', marginBottom: 24, textAlign: 'center' }}>Liên hệ với Staff</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#333' }}>Họ và tên</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #bdbdbd',
              borderRadius: 6,
              fontSize: 16,
              outline: 'none',
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#333' }}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #bdbdbd',
              borderRadius: 6,
              fontSize: 16,
              outline: 'none',
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#333' }}>Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #bdbdbd',
              borderRadius: 6,
              fontSize: 16,
              outline: 'none',
            }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#333' }}>Tin nhắn</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #bdbdbd',
              borderRadius: 6,
              fontSize: 16,
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px 0',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Gửi liên hệ
        </button>
      </form>
    </div>
  );
}

export default ContactStaff;