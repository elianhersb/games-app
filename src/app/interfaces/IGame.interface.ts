export interface IGame {
    id?: Number,
    title?: String, 
    thumbnail?: String, 
    status?: String, 
    short_description?: String, 
    description?: String,  
    game_url?: String,  
    genre?: String,  
    platform?: String,  
    publisher?: String,  
    developer?: String,  
    release_date?: String, 
    freetogame_profile_url?: String,  
    minimum_system_requirements?: IRequirements,
    screenshots?: IScreenshots[]
}

interface IRequirements
{
    os?: String, 
    processor?: String,
    memory?: String, 
    graphics?: String, 
    storage?: String,
}

interface IScreenshots {
    id?: Number,
    image?: String
}   