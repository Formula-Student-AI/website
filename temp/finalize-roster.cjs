const fs = require('fs');
let s = fs.readFileSync('_teams/2026-2027.md', 'utf8');
s = s.replace(/  # ddt\n[\s\S]*?(?=  - name: "Shalev Lau")/, '  # Members awaiting subteam assignment\n');
s = s.replace(/sub_team: "ddt"/g, 'sub_team: ""');
s = s.replace(/\n\n\n/g, '\n\n');
fs.writeFileSync('_teams/2026-2027.md', s);
