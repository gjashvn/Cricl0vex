  const teams = [
    { name: "Chennai Super Kings",       url: "https://www.instagram.com/chennaiipl/",                    badge: "badge-csk",  emoji: "🟡" },
    { name: "Mumbai Indians",            url: "https://www.instagram.com/mumbaiindians/",                 badge: "badge-mi",   emoji: "💙" },
    { name: "Royal Challengers Bengaluru",url: "https://www.instagram.com/royalchallengers.bengaluru/",   badge: "badge-rcb",  emoji: "🔴" },
    { name: "Kolkata Knight Riders",     url: "https://www.instagram.com/kkriders/",                      badge: "badge-kkr",  emoji: "🟣" },
    { name: "Delhi Capitals",            url: "https://www.instagram.com/delhicapitals/",                 badge: "badge-dc",   emoji: "🔵" },
    { name: "Punjab Kings",              url: "https://www.instagram.com/punjabkingsipl/",                badge: "badge-pbks", emoji: "❤️" },
    { name: "Rajasthan Royals",          url: "https://www.instagram.com/rajasthanroyals/",               badge: "badge-rr",   emoji: "💗" },
    { name: "Sunrisers Hyderabad",       url: "https://www.instagram.com/sunrisershyd/",                  badge: "badge-srh",  emoji: "🟠" },
    { name: "Lucknow Super Giants",      url: "https://www.instagram.com/lucknowsupergiants/",            badge: "badge-lsg",  emoji: "🩵" },
    { name: "Gujarat Titans",            url: "https://www.instagram.com/gujarat_titans/",                badge: "badge-gt",   emoji: "🏅" },
  ];

  const players = [
    { name: "Sportskeeda Cricket",   url: "https://www.instagram.com/sportskeedacricket" },
    { name: "Cric Bold",             url: "https://www.instagram.com/cric_bold" },
    { name: "Crick8Zone",            url: "https://www.instagram.com/crick8zone" },
    { name: "The AK Cric",           url: "https://www.instagram.com/theakcric" },
    { name: "Cricketeum",            url: "https://www.instagram.com/cricketeum" },
    { name: "Cricket Gyan Official", url: "https://www.instagram.com/cricketgyanofficial" },
    { name: "Cricxtasy Pod",         url: "https://www.instagram.com/cricxtasypod" },
    { name: "Cricket Cult Official", url: "https://www.instagram.com/cricketcultofficial" },
    { name: "Cricket Chamber",       url: "https://www.instagram.com/crictracker" },
    { name: "Criclovers.in",         url: "https://www.instagram.com/criclovers.in" },
    { name: "Cricketstan1",          url: "https://www.instagram.com/cricketstan1" },
    { name: "Cric666 Official",      url: "https://www.instagram.com/cric666official" },
  ];

  // State
  let activeTeams = [...teams];
  let activePlayers = [...players];

  function render() {
    renderList('teamsList', activeTeams, 'teams');
    renderList('playersList', activePlayers, 'players');
    updateCounts();
  }

  function renderList(containerId, data, type) {
    const container = document.getElementById(containerId);
    const empty = document.getElementById(type === 'teams' ? 'teamsEmpty' : 'playersEmpty');

    if (data.length === 0) {
      container.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    container.innerHTML = data.map((item, i) => {
      const badgeClass = item.badge || '';
      const emoji = item.emoji || '📸';
      return `
        <div class="list-item" id="item-${type}-${i}">
          <div class="item-num">${i + 1}</div>
          <a class="item-link" href="${item.url}" target="_blank" rel="noopener" title="Open ${item.name} on Instagram">
            <div class="ig-icon ${badgeClass}">${item.badge ? emoji : '📷'}</div>
            <span class="item-name">${item.name}</span>
            <span class="item-arrow">↗</span>
          </a>
          <button class="btn-del" onclick="deleteItem('${type}', ${i})" title="Remove from list">×</button>
        </div>
      `;
    }).join('');
  }

  function deleteItem(type, idx) {
    const name = type === 'teams' ? activeTeams[idx].name : activePlayers[idx].name;
    if (type === 'teams') activeTeams.splice(idx, 1);
    else activePlayers.splice(idx, 1);
    render();
    showToast(`🗑️ Removed: ${name}`);
  }

  function openAll(type) {
    const list = type === 'teams' ? activeTeams : activePlayers;
    if (list.length === 0) { showToast('⚠️ No pages left in this section'); return; }
    list.forEach(item => window.open(item.url, '_blank'));
    showToast(`✅ Opened ${list.length} pages`);
  }

  function updateCounts() {
    document.getElementById('teamCount').textContent = activeTeams.length;
    document.getElementById('playerCount').textContent = activePlayers.length;
    document.getElementById('totalCount').textContent = activeTeams.length + activePlayers.length;
    document.getElementById('teamBadge').textContent = activeTeams.length;
    document.getElementById('playerBadge').textContent = activePlayers.length;
  }

  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }

  render();
