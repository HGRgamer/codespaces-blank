const apiSecretKeyHash = '$2b$10$YA9KoYO/QSGEbwICJHcY5OeOyTJbepvyvh/IPxFL1q4SN0NLMIRq.';

const valid_info_keys = [
    "skin",
    "playtime",
    "first_login",
    "last_login",
    "rankId",
];

const valid_stats_standing = [
    "kills",
    "deaths",
    "wins",
    "losses",
    "max_kill_streak",
    "max_win_streak",
];

const valid_stats_int = [
    "kills",
    "deaths",
    "wins",
    "losses",
    "max_kill_streak",
    "max_win_streak",
];

const valid_settings_bools = [
    "scoreboard", 
    "cps_counter", 
    "combo_counter", 
    "reach_counter", 
    "hide_non_opps", 
    "see_death_messages", 
    "auto_rekit", 
    "auto_respawn", 
    "lightning_kill", 
    "blood_kill",
    "device_queue",
    "ping_queue",
    "auto_sprint",
    "hit_particles"
];

//lang need to be added here only
const valid_lang = ["eng", "vnm"];

const valid_duels_games = [
    "Archer",
    "BattleRush",
    "BedFight",
    "Boxing",
    "BuildUHC",
    "Combo",
    "Fist",
    "Gapple",
    "Knight",
    "MidFight",
    "NoDebuff",
    "Soup",
    "Spleef",
    "Sumo",
    "TheBridge",
];


const valid_games = valid_duels_games.concat([
    "Build",
    "CustomNoDebuff",
    "OITC",
    "Resistance",
    "SurvivalGame",
]);

//keep it above ApiKeyGenValidationRules as when the file is called merged_permissions is executed which needs permission
const permissions = { 
    'All': ['allPerms'],
    'Stats': ['player.stats.get', 'player.stats.update', 'player.stats.getAll'], 
    'PlayerSettings': ['player.settings.update', 'player.settings.get'],
    'PlayerKits': ['player.kit.update', 'player.kit.get'] ,
    'Server': ['server.player.get', 'server.player.update', 'server.player.update.bulk']
};

module.exports = {permissions, valid_info_keys, valid_stats_int, valid_duels_games, valid_games, valid_lang, valid_settings_bools, apiSecretKeyHash, valid_stats_standing};