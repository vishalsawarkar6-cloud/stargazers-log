const list = document.getElementById('repo-list');

fetch('events.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load events.json (${response.status})`);
    }
    return response.json();
  })
  .then((events) => {
    events.forEach((event) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `https://github.com/${encodeURIComponent(event.name).replaceAll('%2F', '/')}`;
      link.textContent = event.name;

      const date = document.createElement('time');
      date.className = 'repo-date';
      date.dateTime = event.starred;
      date.textContent = `starred on ${event.starred}`;

      item.append(link, date);
      list.appendChild(item);
    });
  })
  .catch((error) => {
    const item = document.createElement('li');
    item.textContent = 'Unable to load starred repositories.';
    list.appendChild(item);
    console.error(error);
  });
