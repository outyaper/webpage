// =========================================
// NAVER MAIN CLONE - INTERACTIVE JAVASCRIPT
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Search Box & Autocomplete Dropdown Interaction
  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');
  const closeDropdown = document.getElementById('closeDropdown');
  const clearKeywords = document.getElementById('clearKeywords');
  const recentSearchList = document.getElementById('recentSearchList');
  const tabRecent = document.getElementById('tabRecent');
  const tabTrending = document.getElementById('tabTrending');
  const searchBoxWrapper = document.getElementById('searchBoxWrapper');

  const trendingKeywords = [
    '1. 2026 프로야구 순위',
    '2. 올가을 단풍 시기',
    '3. AI 스마트폰 신기능',
    '4. 환율 달러 엔화',
    '5. 주말 날씨 예보',
    '6. 청약 홈 분양 일정',
    '7. 세이브더칠드런 캠페인',
    '8. 네이버 플러스 멤버십',
    '9. 넷플릭스 신작 추천',
    '10. 손흥민 경기 일정'
  ];

  const defaultRecentKeywords = [
    '오늘 날씨',
    '네이버 쇼핑 페스타',
    '실시간 프로야구 중계',
    '환율 조회'
  ];

  // Open dropdown on focus or click
  searchInput.addEventListener('focus', () => {
    searchDropdown.classList.add('open');
  });

  // Close dropdown
  closeDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    searchDropdown.classList.remove('open');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchBoxWrapper.contains(e.target)) {
      searchDropdown.classList.remove('open');
    }
  });

  // Switch between Recent / Trending tabs
  tabRecent.addEventListener('click', () => {
    tabRecent.classList.add('active');
    tabTrending.classList.remove('active');
    renderRecentList();
  });

  tabTrending.addEventListener('click', () => {
    tabTrending.classList.add('active');
    tabRecent.classList.remove('active');
    renderTrendingList();
  });

  function renderRecentList() {
    if (defaultRecentKeywords.length === 0) {
      recentSearchList.innerHTML = '<div style="text-align:center; padding: 20px; color:#888; font-size:13px;">최근 검색어 내역이 없습니다.</div>';
      return;
    }
    recentSearchList.innerHTML = defaultRecentKeywords.map((kw, idx) => `
      <div class="search-item" data-keyword="${kw}">
        <span class="keyword">${kw}</span>
        <button type="button" class="delete-keyword" data-index="${idx}">×</button>
      </div>
    `).join('');
    attachKeywordEvents();
  }

  function renderTrendingList() {
    recentSearchList.innerHTML = trendingKeywords.map(kw => `
      <div class="search-item" data-keyword="${kw.split('. ')[1] || kw}">
        <span class="keyword">${kw}</span>
      </div>
    `).join('');
    attachKeywordEvents();
  }

  function attachKeywordEvents() {
    // Click keyword to search
    const items = recentSearchList.querySelectorAll('.search-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete-keyword')) {
          const kw = item.getAttribute('data-keyword');
          searchInput.value = kw;
          searchDropdown.classList.remove('open');
          document.getElementById('searchForm').submit();
        }
      });
    });

    // Delete single keyword
    const deleteBtns = recentSearchList.querySelectorAll('.delete-keyword');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute('data-index'), 10);
        defaultRecentKeywords.splice(index, 1);
        renderRecentList();
      });
    });
  }

  // Clear all recent keywords
  clearKeywords.addEventListener('click', () => {
    defaultRecentKeywords.length = 0;
    renderRecentList();
  });

  // 2. Main Content Tabs Interaction
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      // Update active nav button
      document.querySelectorAll('.nav-tab-item').forEach(item => item.classList.remove('active'));
      btn.closest('.nav-tab-item').classList.add('active');

      // Show targeted tab panel
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `tab-${tabId}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  // 3. Login Modal Interaction
  const openLoginModalBtn = document.getElementById('openLoginModalBtn');
  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const modalLoginForm = document.getElementById('modalLoginForm');
  const loginCard = document.getElementById('loginCard');

  if (openLoginModalBtn && loginModal) {
    openLoginModalBtn.addEventListener('click', () => {
      loginModal.classList.add('open');
      document.getElementById('loginId').focus();
    });

    closeLoginModal.addEventListener('click', () => {
      loginModal.classList.remove('open');
    });

    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('open');
      }
    });

    // Handle Login submission
    modalLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('loginId').value.trim();
      if (!id) return;

      loginModal.classList.remove('open');

      // Update right login card to logged-in profile state
      loginCard.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; text-align:left; margin-bottom:12px;">
          <div style="width:44px; height:44px; border-radius:50%; background:#03C75A; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:18px;">
            ${id.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style="font-weight:700; font-size:14px; color:#111;">${id} 님</div>
            <div style="font-size:12px; color:#03C75A; font-weight:600;">네이버플러스 멤버십 이용중</div>
          </div>
        </div>
        <div style="display:flex; justify-content:space-around; background:#f8f9fa; border:1px solid #eef0f2; border-radius:6px; padding:10px 0; font-size:12px; margin-bottom:12px;">
          <a href="https://mail.naver.com" target="_blank" style="color:#444;">메일 <strong style="color:#03C75A;">3</strong></a>
          <span style="color:#ddd;">|</span>
          <a href="https://pay.naver.com" target="_blank" style="color:#444;">페이포인트 <strong style="color:#03C75A;">12,500원</strong></a>
        </div>
        <button type="button" id="logoutBtn" style="width:100%; height:36px; background:#fafbfc; border:1px solid #dadada; border-radius:6px; font-size:12.5px; font-weight:600; color:#555;">로그아웃</button>
      `;

      // Logout handler
      document.getElementById('logoutBtn').addEventListener('click', () => {
        window.location.reload();
      });
    });
  }

  // 4. AI Search & Virtual Keyboard buttons
  const aiSearchBtn = document.getElementById('aiSearchBtn');
  if (aiSearchBtn) {
    aiSearchBtn.addEventListener('click', () => {
      searchInput.value = '네이버 AI 검색 큐(Cue:) 서비스란?';
      searchInput.focus();
    });
  }

  const keyboardBtn = document.getElementById('keyboardBtn');
  if (keyboardBtn) {
    keyboardBtn.addEventListener('click', () => {
      alert('가상 키보드가 활성화되었습니다.');
    });
  }

  // 5. Product Click Event
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.product-title')?.textContent || '';
      window.open(`https://search.shopping.naver.com/search/all?query=${encodeURIComponent(title)}`, '_blank');
    });
  });

  // Initial render
  renderRecentList();
});
