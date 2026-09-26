fetch('/admin/api/leads')
  .then(r => {
    if (r.status === 401) {
      window.location.href = '/admin/login'
      throw new Error('unauthorized')
    }
    return r.json()
  })
  .then(leads => {
    const tbody = document.getElementById('tbody')
    const cardsWrap = document.getElementById('cards')
    const table = document.getElementById('table')
    const empty = document.getElementById('empty')
    const count = document.getElementById('count')

    if (!leads.length) {
      empty.textContent = 'Пока нет заявок.'
      return
    }

    count.textContent = `Всего заявок: ${leads.length}`

    leads.forEach(lead => {
      const date = new Date(lead.createdAt).toLocaleString('ru-RU')

      const tr = document.createElement('tr')
      tr.innerHTML = `
        <td class="date">${date}</td>
        <td>${lead.name}</td>
        <td><a href="tel:${lead.phone}">${lead.phone}</a></td>
        <td><a href="mailto:${lead.email}">${lead.email}</a></td>
        <td class="msg">${lead.message}</td>
      `
      tbody.appendChild(tr)

      const card = document.createElement('div')
      card.className = 'card'
      card.innerHTML = `
        <div class="card-name">${lead.name}</div>
        <div class="card-row"><span class="card-label">Дата</span><span class="card-value">${date}</span></div>
        <div class="card-row"><span class="card-label">Телефон</span><span class="card-value"><a href="tel:${lead.phone}">${lead.phone}</a></span></div>
        <div class="card-row"><span class="card-label">Email</span><span class="card-value"><a href="mailto:${lead.email}">${lead.email}</a></span></div>
        <div class="card-row"><span class="card-label">Сообщение</span><span class="card-value">${lead.message}</span></div>
      `
      cardsWrap.appendChild(card)
    })

    table.style.display = 'table'
    empty.style.display = 'none'
  })
  .catch(() => {
    document.getElementById('empty').textContent = 'Ошибка загрузки заявок.'
  })