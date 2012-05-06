CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    online_id INTEGER DEFAULT 0,
    name TEXT,
    list_id TEXT,
    note TEXT DEFAULT '',
    date INTEGER DEFAULT 0,
    done_date INTEGER DEFAULT 0,
    done INTEGER DEFAULT 0,
    position INTEGER DEFAULT 0,
    important INTEGER DEFAULT 0,
    version INTEGER DEFAULT 0,
    deleted INTEGER DEFAULT 0
);

CREATE TABLE lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    online_id INTEGER DEFAULT 0,
    name TEXT,
    position INTEGER DEFAULT 0,
    version INTEGER DEFAULT 0,
    deleted INTEGER DEFAULT 0,
    inbox INTEGER DEFAULT 0,
    shared INTEGER DEFAULT 0
);
