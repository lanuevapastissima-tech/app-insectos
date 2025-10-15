-- Esquema inicial para la base de datos de la App de Insectos

-- Tabla para perfiles de usuario
-- Se vinculará con la autenticación de Supabase usando el ID de usuario.
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Tabla para los hallazgos o identificaciones de insectos
CREATE TABLE findings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Datos de la identificación
  insect_name TEXT,
  scientific_name TEXT,
  description TEXT,
  risk_level TEXT, -- p.ej: 'Bajo', 'Moderado', 'Alto'
  
  -- Metadatos de la captura
  image_url TEXT, -- URL de la imagen almacenada en Supabase Storage
  latitude REAL,
  longitude REAL,
  captured_at TIMESTAMPTZ DEFAULT now() NOT NULL, -- Fecha de la foto
  
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL -- Fecha de creación del registro
);

-- Habilitar Row Level Security (RLS) para proteger los datos
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE findings ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso para perfiles
-- Los usuarios pueden ver su propio perfil y los de los demás.
CREATE POLICY "Allow all users to read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow user to update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Políticas de acceso para hallazgos
-- Los usuarios solo pueden ver y modificar sus propios hallazgos.
CREATE POLICY "Allow user to read own findings" ON findings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow user to insert own findings" ON findings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow user to update own findings" ON findings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow user to delete own findings" ON findings FOR DELETE USING (auth.uid() = user_id);

