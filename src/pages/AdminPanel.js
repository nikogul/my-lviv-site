// src/pages/AdminPanel.js

import React from 'react';
import '../assets/css/AdminPanel.css';

function AdminPanel() {
  return (
    <div className="admin-panel">
      <h1>Адмін-панель</h1>
      <p>Тут ви можете керувати сайтом, опрацьовувати заявки на публікацію тощо.</p>
      <div className="requests-list">
        <h2>Заявки на публікацію</h2>
        {/* Тут будуть відображатися заявки на публікацію */}
      </div>
    </div>
  );
}

export default AdminPanel;
