import * as SQLite from 'expo-sqlite';

// Fonction principale pour initialiser la base de données
const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('monopoly.db');
  // Ouvrir la base de données de manière asynchrone
  // Activer les clés étrangères en utilisant une transaction
  await db.execAsync('PRAGMA foreign_keys = ON;');
  console.log('Foreign keys turned on');

  // Fonction pour créer les tables
  const createTables = async () => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Mpamokatra (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Anarana TEXT NOT NULL,
        Manambady TEXT NOT NULL,
        Toerana TEXT NOT NULL,
        Kaominina TEXT NOT NULL,
        Fokotany TEXT NOT NULL,
        ImageBase64 TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Famokarana (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Sehapihariana TEXT NOT NULL,
        VelaranaIsa INTEGER NOT NULL,
        VelaranaAmbolena INTEGER NOT NULL,
        TeknikaAMpiasaina TEXT NOT NULL,
        VokatraKg TEXT NOT NULL,
        VolanaNambolena TEXT NOT NULL,
        VolanaNamokarana TEXT NOT NULL,
        MpamokatraId INTEGER,
        FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
      );
      CREATE TABLE IF NOT EXISTS Fitaovampamokarana (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Fitaovampamokarana TEXT NOT NULL,
        Isa INTEGER NOT NULL,
        MpamokatraId INTEGER,
        FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
      );
      CREATE TABLE IF NOT EXISTS ManodidinaFamokarana (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Mpisehatra TEXT NOT NULL,
        AsaAtao TEXT NOT NULL,
        Adiresy TEXT,
        Tel TEXT,
        Efahiaramiasa TEXT,
        MpamokatraId INTEGER,
        FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
      );
      CREATE TABLE IF NOT EXISTS Fanamarihana (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Fanamarihana TEXT NOT NULL,
        MpamokatraId INTEGER,
        FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
      );
      CREATE TABLE IF NOT EXISTS FilanaIsambolana(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Karazany TEXT NOT NULL,
        Janvier TEXT,
        Fevrier TEXT,
        Mars TEXT,
        Avril TEXT,
        Mai TEXT,
        Juin TEXT,
        Juillet TEXT,
        Aout TEXT,
        Sepetembre TEXT,
        Octobre TEXT,
        Novembre TEXT,
        Descembre TEXT,
        MpamokatraId INTEGER,
        FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
      );
    `);
    console.log('Tables créées avec succès');
  };

  // Appeler la fonction pour créer les tables
  await createTables();
};

// Appeler la fonction principale d'initialisation de la base de données
initDatabase().catch(error => console.error('Erreur lors de l\'initialisation de la base de données:', error));

// Fonction pour enregistrer les données dans une table spécifique
const saveDataToTable = async (tableName, data) => {
  const db = await SQLite.openDatabaseAsync('monopoly.db');
  const keys = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = values.map(() => '?').join(', ');

  const sql = `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders});`;

  try {
    const result = await db.runAsync(sql, ...values);
    console.log(`Données enregistrées avec succès dans la table ${tableName}`);
    return result;
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement des données dans la table ${tableName}:`, error);
  }
};

const saveDataKey = async (tableName, data) => {
  const db = await SQLite.openDatabaseAsync('monopoly.db');

  const keys = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = values.map(() => '?').join(', ');

  const sql = `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders});`;

  try {
    const result = await db.runAsync(sql, ...values);
    console.log(`Données enregistrées avec succès dans la table ${tableName}`);
    return result;
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement des données dans la table ${tableName}:`, error);
  }
};


// Fonction pour ajouter une colonne à une table
const addColumn = async (tableName, columnName, columnType) => {
  const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType};`;

  try {
    await db.runAsync(sql);
    console.log(`Nouvelle colonne '${columnName}' ajoutée à la table '${tableName}' avec succès.`);
  } catch (error) {
    console.error(`Erreur lors de l'ajout de la nouvelle colonne '${columnName}' à la table '${tableName}':`, error);
  }
};

// Fonction pour ajouter une clé étrangère à une table
const addForeignKey = async (tableName, columnName, referencedTableName, referencedColumnName) => {
  const sql = `ALTER TABLE ${tableName} ADD CONSTRAINT fk_${columnName} FOREIGN KEY (${columnName}) REFERENCES ${referencedTableName}(${referencedColumnName});`;

  try {
    await db.runAsync(sql);
    console.log(`Clé étrangère '${columnName}' ajoutée à la table '${tableName}' avec succès.`);
  } catch (error) {
    console.error(`Erreur lors de l'ajout de la clé étrangère '${columnName}' à la table '${tableName}':`, error);
  }
};

// Fonction pour obtenir le dernier ID d'une table
const getLastId = async (tableName) => {
  const db = await SQLite.openDatabaseAsync('monopoly.db');

  try {
    const row = await db.getFirstAsync(`SELECT MAX(id) AS max_id FROM ${tableName}`);
    return row ? row.max_id : null;
  } catch (error) {
    console.error(`Erreur lors de la récupération du dernier ID de la table ${tableName}:`, error);
    return null;
  }
};

// Exporter les fonctions pour être utilisées dans d'autres parties de l'application
export { saveDataToTable, addColumn, addForeignKey, getLastId,saveDataKey };
