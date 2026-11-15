const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const rows = JSON.parse(fs.readFileSync('temp/roster.json', 'utf8').replace(/^\uFEFF/, ''));
const file = '_teams/2026-2027.md';
const existing = matter(fs.readFileSync(file, 'utf8')).data.members;
const aliases = { Mithun: 'Mithun Velladurai', Tom: 'Tom Lam', 'Nabeel Mahoomd': 'Nabeel Mahmood', 'Jiangyu(Jerry) Lu': 'Jiangyu (Jerry) Lu' };
const groups = { 'Braking System': 'apc', 'Mechanical Design': 'apc', Powertrain: 'apc', 'Electrical Systems': 'apc', Perception: 'perception', 'Planning and Control': 'planning_and_control', SLAM: 'slam', 'Systems Integration': 'systems_integration', 'Static Events': 'static_events', 'Web Dev': 'web_dev' };
const members = [];
for (const row of rows) {
  const rawName = row['Full Name'].trim();
  const name = aliases[rawName] || rawName;
  const previous = existing.find(m => m.name === name);
  const teams = row['Team(s)'].split(',').map(s => s.trim()).filter(Boolean);
  let subteams = [...new Set(teams.map(t => groups[t]).filter(Boolean))];
  if (teams.includes('APC') && !subteams.includes('apc')) subteams.unshift('apc');
  if (!subteams.length) subteams = [previous?.sub_team || (teams.includes('DDT') ? 'ddt' : 'static_events')];
  if (name === 'Edward Boileau' || name === 'Yasser Nibouche') subteams = ['committee'];
  let image = previous?.image;
  if (row.Photo) {
    const filename = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') + path.extname(row.Photo).toLowerCase();
    const destination = path.join('public/teams/2026-2027', filename);
    fs.renameSync(path.join('temp', row.Photo), destination);
    image = '/teams/2026-2027/' + filename;
  }
  for (const sub_team of subteams) {
    let role = row.Role.trim();
    const specialty = teams.find(t => groups[t] === sub_team);
    if (role === 'NEW' || !role) role = specialty ? `${specialty} Member` : `${sub_team === 'apc' ? 'APC' : 'DDT'} Member`;
    if (role === 'Team Lead') role = `${specialty || 'Team'} Team Lead`;
    if (name === 'Will Barry') role = 'Statics Team Lead';
    if (name === 'Tom Lam') role = sub_team === 'web_dev' ? 'Web Dev Lead' : 'DDT Member';
    if (name === 'Nikita Nosevych') role = 'Systems Integration Team Lead & Treasurer';
    if (name === 'Isaac Lee') role = 'Perception Member & Social Secretary';
    if (name === 'Shalev Lau') role = 'Business & Sponsorship Lead';
    if (role === 'Planning and Control Team Lead') role = 'Planning & Control Team Lead';
    const member = { name, sub_team, role, email: row.Email.trim() || previous?.email || '' };
    if (image) member.image = image;
    if (previous?.links) member.links = previous.links;
    if (name === 'Tom Lam') member.links = { ...member.links, website: 'https://tomlam.dev' };
    members.push(member);
  }
}
const order = ['committee', 'apc', 'ddt', 'perception', 'planning_and_control', 'slam', 'static_events', 'systems_integration', 'web_dev'];
members.sort((a,b) => order.indexOf(a.sub_team) - order.indexOf(b.sub_team));
let output = '---\nstart_year: 2026\nend_year: 2027\nmembers:\n';
let group;
for (const m of members) {
  if (m.sub_team !== group) { group = m.sub_team; output += `\n  # ${group.replace(/_/g, ' ')}\n`; }
  for (const [key, value] of Object.entries(m)) {
    if (key === 'links') {
      output += '    links:\n';
      for (const [label, url] of Object.entries(value)) output += `      ${label}: ${JSON.stringify(url)}\n`;
    } else output += `${key === 'name' ? '  - ' : '    '}${key}: ${JSON.stringify(value)}\n`;
  }
  output += '\n';
}
output += '---\n\n# Team Overview\n\nThe 2026/2027 team works across the DDT and APC projects, supported by shared subteams.\n';
fs.writeFileSync(file, output);
console.log(`${rows.length} people imported into ${members.length} team memberships.`);
