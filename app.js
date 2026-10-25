const log = document.getElementById('chat-log');
const options = document.getElementById('chat-options');
document.getElementById('year').textContent = new Date().getFullYear();
const guides = {
  self: { title: 'Я знову в центрі свого життя', url: 'guides/01-ya-v-tsentri.pdf', step: 'Запиши одну власну потребу, яку ти відкладала цього тижня. Вибери 10 хвилин сьогодні, щоб відповісти на неї.' },
  energy: { title: 'Від виснаження до ресурсу', url: 'guides/02-vid-vysnazhennia-do-resursu.pdf', step: 'Назви одну справу, яку сьогодні можна спростити або відкласти. Звільнений час віддай відпочинку без нових завдань.' },
  action: { title: 'Бажання, яке стає дією', url: 'guides/03-bazhannia-u-diiu.pdf', step: 'Сформулюй бажання через те, що залежить від тебе, і запиши найменший крок на найближчі 24 години.' },
  independent: { title: 'Чек-ап готовності перукаря до самостійної практики', url: 'guides/11-chekap-samostiinosti-perukaria.pdf', step: 'Оціни чотири опори: клієнти, фінанси, сервіс і видимість. Обери одну, яку підсилиш цього тижня.' },
  price: { title: 'Коли перукарю підвищувати ціну', url: 'guides/12-koly-pidvyshchuvaty-tsinu.pdf', step: 'Перевір завантаження, повторні записи, витрати й дохід за годину. Зафіксуй одну цифру, якої тобі зараз бракує для рішення.' },
  values: { title: 'Цінності майстра як стандарт сервісу', url: 'guides/13-tsinnosti-maistra.pdf', step: 'Обери три професійні цінності й для кожної назви одну дію, яку клієнтка може побачити або відчути.' }
};
function bubble(message, user = false, link = null) {
  const el = document.createElement('div'); el.className = 'bubble' + (user ? ' user' : '');
  el.textContent = message;
  if (link) { const a = document.createElement('a'); a.href = link.url; a.textContent = ' Відкрити гайд «' + link.title + '» ↗'; a.setAttribute('download', ''); el.append(document.createElement('br'), a); }
  log.append(el); log.scrollTop = log.scrollHeight;
}
function choices(items) {
  options.replaceChildren();
  items.forEach(({label, action}) => {
    const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.addEventListener('click', () => { bubble(label, true); action(); }); options.append(b);
  });
}
function start() {
  log.replaceChildren();
  bubble('Який маршрут тобі зараз ближчий?');
  choices([
    {label: 'Я хочу змін у житті', action: personal},
    {label: 'Я перукар і хочу професійного зростання', action: professional}
  ]);
}
function personal() {
  bubble('Що зараз найбільше хочеться змінити?');
  choices([
    {label: 'Мене не залишається для себе', action: () => result('self')},
    {label: 'Відчуваю виснаження', action: () => result('energy')},
    {label: 'Маю бажання, але відкладаю', action: () => result('action')},
    {label: 'Повернутися до вибору маршруту', action: start}
  ]);
}
function professional() {
  bubble('Який професійний крок зараз найактуальніший?');
  choices([
    {label: 'Хочу працювати на себе', action: () => result('independent')},
    {label: 'Хочу підвищити ціну', action: () => result('price')},
    {label: 'Хочу сильніший сервіс і бренд', action: () => result('values')},
    {label: 'Повернутися до вибору маршруту', action: start}
  ]);
}
function result(key) {
  const g = guides[key]; bubble('Спробуй один крок: ' + g.step, false, g);
  const invitation = document.createElement('div');
  invitation.className = 'bubble';
  invitation.textContent = 'Продовжуй свій шлях разом із Людмилою — долучайся до Telegram-каналу.';
  const telegramLink = document.createElement('a');
  telegramLink.href = 'https://t.me/+J_Yv-BDIC-k0OTIy';
  telegramLink.target = '_blank';
  telegramLink.rel = 'noopener noreferrer';
  telegramLink.textContent = 'Долучитися до Telegram-каналу ↗';
  invitation.append(document.createElement('br'), telegramLink);
  log.append(invitation);
  log.scrollTop = log.scrollHeight;
  choices([{label: 'Обрати інший запит', action: start}, {label: 'Завершити', action: () => { options.replaceChildren(); bubble('Ти можеш повернутися до гайда в будь-який момент.'); }}]);
}
document.getElementById('reset').addEventListener('click', start);
start();
