import * as SQLite from 'expo-sqlite';

// Fonction principale pour initialiser la base de données
const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('monopoly.db');
  // Ouvrir la base de données de manière asynchrone
  // Activer les clés étrangères en utilisant une transaction
  await db.execAsync('PRAGMA foreign_keys = ON;');
  console.log('Foreign keys turned on');
  alert('Foreign keys turned on');

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
        Janvier INTEGER,
        Fevrier INTEGER,
        Mars INTEGER,
        Avril INTEGER,
        Mai INTEGER,
        Juin INTEGER,
        Juillet INTEGER,
        Aout INTEGER,
        Sepetembre INTEGER,
        Octobre INTERGER,
        Novembre INTEGER,
        Descembre INTEGER,
        MpamokatraId INTEGER,
        FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
      );
      CREATE TABLE IF NOT EXISTS FeuilleImporter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        NomFeuille TEXT NOT NULL,
        MpamokatraId INTEGER,
        FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
      );
    `);
    console.log('Tables créées avec succès');
    alert('Tables créées avec succès');
  };

  // Appeler la fonction pour créer les tables
  await createTables();
};

// Appeler la fonction principale d'initialisation de la base de données
initDatabase().catch(error => {
  console.error('Erreur lors de l\'initialisation de la base de données:', error);
  alert('Erreur lors de l\'initialisation de la base de données: ' + error.message);
});

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
    alert(`Données enregistrées avec succès dans la table ${tableName}`);
    return result;
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement des données dans la table ${tableName}:`, error);
    alert(`Erreur lors de l'enregistrement des données dans la table ${tableName}: ` + error.message);
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
    alert(`Données enregistrées avec succès dans la table ${tableName}`);
    return result;
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement des données dans la table ${tableName}:`, error);
    alert(`Erreur lors de l'enregistrement des données dans la table ${tableName}: ` + error.message);
  }
};


// Fonction pour ajouter une colonne à une table
const addColumn = async (tableName, columnName, columnType) => {
  const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType};`;

  try {
    await db.runAsync(sql);
    console.log(`Nouvelle colonne '${columnName}' ajoutée à la table '${tableName}' avec succès.`);
    alert(`Nouvelle colonne '${columnName}' ajoutée à la table '${tableName}' avec succès.`);
  } catch (error) {
    console.error(`Erreur lors de l'ajout de la nouvelle colonne '${columnName}' à la table '${tableName}':`, error);
    alert(`Erreur lors de l'ajout de la nouvelle colonne '${columnName}' à la table '${tableName}': ` + error.message);
  }
};

// Fonction pour ajouter une clé étrangère à une table
const addForeignKey = async (tableName, columnName, referencedTableName, referencedColumnName) => {
  const sql = `ALTER TABLE ${tableName} ADD CONSTRAINT fk_${columnName} FOREIGN KEY (${columnName}) REFERENCES ${referencedTableName}(${referencedColumnName});`;

  try {
    await db.runAsync(sql);
    console.log(`Clé étrangère '${columnName}' ajoutée à la table '${tableName}' avec succès.`);
    alert(`Clé étrangère '${columnName}' ajoutée à la table '${tableName}' avec succès.`);
  } catch (error) {
    console.error(`Erreur lors de l'ajout de la clé étrangère '${columnName}' à la table '${tableName}':`, error);
    alert(`Erreur lors de l'ajout de la clé étrangère '${columnName}' à la table '${tableName}': ` + error.message);
  }
};
const insertDonneexel = async (data) => {
  const db = await SQLite.openDatabaseAsync('monopoly.db'); // Ouvrir la base de données
  const sql = `INSERT INTO FilanaIsambolana (Karazany, Janvier, Fevrier, Mars, Avril, Mai, Juin, Juillet, Aout, Sepetembre, Octobre, Novembre, DeScembre)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    // Parcourir les données à partir de la 4ème ligne et ignorer la dernière ligne
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
   
      const params = [
        row[0],  // Karazany
        row[1],  // Janvier
        row[2],  // Fevrier
        row[3],  // Mars
        row[4],  // Avril
        row[5],  // Mai
        row[6],  // Juin
        row[7],  // Juillet
        row[8],  // Aout
        row[9],  // Septembre
        row[10], // Octobre
        row[11], // Novembre
        row[12]  // Decembre (la dernière colonne n'est pas incluse)
      ];

      // Exécuter l'instruction SQL pour chaque ligne
      await db.runAsync(sql, params);
    }

    console.log(`Les données ont été insérées avec succès.`);
    alert(`Les données ont été insérées avec succès.`);
  } catch (error) {
    console.error(`Erreur lors de l'insertion des données:`, error);
    alert(`Erreur lors de l'insertion des données: ` + error.message);
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
    alert(`Erreur lors de la récupération du dernier ID de la table ${tableName}: ` + error.message);
    return null;
  }
};

// Exporter les fonctions pour être utilisées dans d'autres parties de l'application
export { saveDataToTable, addColumn, addForeignKey, getLastId, saveDataKey ,insertDonneexel};
