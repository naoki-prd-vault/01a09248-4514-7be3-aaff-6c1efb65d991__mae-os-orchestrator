
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  initial_prompt TEXT NOT NULL,
  persona_config JSONB,
  status TEXT DEFAULT 'draft',
  api_key TEXT UNIQUE NOT NULL,
  owner_id UUID,
  created_at TIMESTAMPZ DEFAULT now(),
  updated_at TIMESTAMPZ DEFAULT now()
);

CREATE TYPE content_type_enum AS ENUM ('text', 'url', 'document', 'vector_id');
CREATE TABLE knowledge_bases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  content_type content_type_enum,
  content_data TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPZ DEFAULT now(),
  updated_at TIMESTAMPZ DEFAULT now()
);

CREATE TABLE agent_knowledge_bases (
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  knowledge_base_id UUID REFERENCES knowledge_bases(id) ON DELETE CASCADE NOT NULL,
  priority INTEGER DEFAULT 0,
  PRIMARY KEY (agent_id, knowledge_base_id)
);

CREATE TYPE conversation_status_enum AS ENUM ('active', 'ended', 'timeout');
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  client_user_id TEXT,
  status conversation_status_enum DEFAULT 'active',
  context JSONB DEFAULT '{}',
  started_at TIMESTAMPZ DEFAULT now(),
  last_activity_at TIMESTAMPZ DEFAULT now(),
  ended_at TIMESTAMPZ
);

CREATE TYPE sender_enum AS ENUM ('user', 'agent');
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender sender_enum NOT NULL,
  content TEXT NOT NULL,
  audio_url TEXT,
  timestamp TIMESTAMPZ DEFAULT now()
);

CREATE TABLE dynamic_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  detection_rules JSONB,
  profile_specific_prompt_addendum TEXT,
  created_at TIMESTAMPZ DEFAULT now(),
  updated_at TIMESTAMPZ DEFAULT now()
);
