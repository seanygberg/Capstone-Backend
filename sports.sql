-- Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    profile_picture_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams Table
CREATE TABLE Teams (
    team_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    league VARCHAR(255) NOT NULL,
    logo_url TEXT
);

-- Players Table
CREATE TABLE Players (
    player_id SERIAL PRIMARY KEY,
    team_id INT REFERENCES Teams(team_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(100),
    photo_url TEXT
);

-- Games Table
CREATE TABLE Games (
    game_id SERIAL PRIMARY KEY,
    game_date DATE NOT NULL,
    home_team_id INT REFERENCES Teams(team_id) ON DELETE CASCADE,
    away_team_id INT REFERENCES Teams(team_id) ON DELETE CASCADE,
    home_team_score INT DEFAULT 0,
    away_team_score INT DEFAULT 0
);

-- Stats Table
CREATE TABLE Stats (
    stat_id SERIAL PRIMARY KEY,
    player_id INT REFERENCES Players(player_id) ON DELETE CASCADE,
    game_id INT REFERENCES Games(game_id) ON DELETE CASCADE,
    points INT DEFAULT 0,
    assists INT DEFAULT 0,
    rebounds INT DEFAULT 0,
    steals INT DEFAULT 0,
    blocks INT DEFAULT 0
);

-- Team Favorites Table
CREATE TABLE Team_Favorites (
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    team_id INT REFERENCES Teams(team_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, team_id)
);

-- Player Favorites Table
CREATE TABLE Player_Favorites (
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    player_id INT REFERENCES Players(player_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, player_id)
);

-- Comments Table
CREATE TABLE Comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    player_id INT REFERENCES Players(player_id),
    team_id INT REFERENCES Teams(team_id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Top Performances Table
CREATE TABLE Performances (
    performance_id SERIAL PRIMARY KEY,
    player_id INT REFERENCES Players(player_id) ON DELETE CASCADE,
    team_id INT REFERENCES Teams(team_id) ON DELETE CASCADE,
    game_id INT REFERENCES Games(game_id) ON DELETE CASCADE,
    points INT DEFAULT 0,
    assists INT DEFAULT 0,
    rebounds INT DEFAULT 0,
    steals INT DEFAULT 0,
    blocks INT DEFAULT 0,
    team_points INT DEFAULT 0,
    team_rebounds INT DEFAULT 0,
    team_assists INT DEFAULT 0,
    date DATE NOT NULL
);
