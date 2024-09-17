import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    MONGO_URL: string;
    JWT_SECRET: string;
    OPENAI_API_KEY: string;
    OPENAI_PROJECT_ID: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    MONGO_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    OPENAI_API_KEY: joi.string().required(),
    OPENAI_PROJECT_ID: joi.string().required()
})
.unknown(true)

const { error, value } = envsSchema.validate( process.env )

if(error){
    throw new Error(`Error: ${ error }`)
}

const envVars : EnvVars = value;

export const envs = {
    port: envVars.PORT,
    mongoUrl: envVars.MONGO_URL,
    jwtSecret: envVars.JWT_SECRET,
    openai_api_key: envVars.OPENAI_API_KEY,
    openai_project_id: envVars.OPENAI_PROJECT_ID
}