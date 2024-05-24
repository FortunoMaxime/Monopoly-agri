import * as SQLite from 'expo-sqlite';

// Ouvrir la base de données de manière synchrone
const db = SQLite.openDatabaseSync('monopoly.db');

// Activer les clés étrangères en utilisant une transaction
db.transaction((tx) => {
  tx.executeSql('PRAGMA foreign_keys = ON;');
}, null, () => console.log('Foreign keys turned on'));


// Fonction pour créer les tables
const createTables = () => {
 db.transaction((tx) => {
    // Création de la table pour le panneau 1
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Mpamokatra (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Anarana TEXT NOT NULL,
            Manambady TEXT NOT NULL,
            Toerana TEXT NOT NULL,
            Kaomimina TEXT NOT NULL,
            Fokotany TEXT NOT NULL
        );`,
      [],
      () => {
        console.log('Table pour le panneau 1 créée avec succès');
      },
      (_, err) => {
        console.log('Erreur lors de la création de la table pour le panneau 1:', err);
      }
    );

    // Création de la table pour le panneau 2
  // Création de la table pour le panneau 2
tx.executeSql(
  `CREATE TABLE IF NOT EXISTS Famokarana (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Sehapihariana TEXT NOT NULL,
      VelaranaIsa INTEGER NOT NULL,
      VelaranaAmbolena INTEGER NOT NULL,
      TeknikaAMpiasaina TEXT NOT NULL,
      VokatraKg TEXT NOT NULL,
      MpamokatraId INTEGER,
      FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
     
  );`,
[],
() => {
  console.log('Table pour le Famokarana créée avec succès');
},
(_, err) => {
  console.log('Erreur lors de la création de la table pour le panneau 2:', err);
}
);

// Création de la table pour le panneau 3
tx.executeSql(
  `CREATE TABLE IF NOT EXISTS Fitaovampamokarana (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Fitaovampamokarana TEXT NOT NULL,
      Isa INTEGER NOT NULL,
      MpamokatraId INTEGER,
      FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
      
      
  );`,
[],
() => {
  console.log('Table pour le panneau 3 créée avec succès');
},
(_, err) => {
  console.log('Erreur lors de la création de la table pour le panneau 3:', err);
}
);

// Création de la table pour le panneau 4
tx.executeSql(
  `CREATE TABLE IF NOT EXISTS ManodidinaFamokarana (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Mpisehatra TEXT NOT NULL,
      AsaAtao TEXT NOT NULL,
      Adiresy TEXT,
      Tel TEXT,
      Efahiaramiasa TEXT,
      MpamokatraId INTEGER,
      FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
     
  );`,
[],
() => {
  console.log('Table pour le panneau 4 créée avec succès');
},
(_, err) => {
  console.log('Erreur lors de la création de la table pour le panneau 4:', err);
}
);

// Création de la table pour le panneau 5
tx.executeSql(
  `CREATE TABLE IF NOT EXISTS Fanamarihana(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Fanamarihana TEXT NOT NULL,
      MpamokatraId INTEGER,
      FOREIGN KEY (MpamokatraId) REFERENCES Mpamokatra(id)
  );`,
[],
() => {
  console.log('Table pour le panneau 5 créée avec succès');
},
(_, err) => {
  console.log('Erreur lors de la création de la table pour le panneau 5:', err);
}
);

 });
};




// Fonction pour enregistrer les données dans une table spécifique
const saveDataToTable = async (tableName, data) => {
  const keys = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = values.map(() => '?').join(', ');

  const sql = `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders});`;
 
  try {
    await db.transaction(tx => {
      tx.executeSql(sql, values, () => {
        console.log(`Données enregistrées avec succès dans la table ${tableName}`);
      }, (_, error) => {
        console.error(`Erreur lors de l'enregistrement des données dans la table ${tableName}:`, error);
      });
    });
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement des données dans la table ${tableName}:`, error);
  }
};


const saveDatakey = async (tableName, data) => {
  const keys = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = values.map(() => '?').join(', ');

  const sql = `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders});`;

  try {
    await db.transaction(tx => {
      tx.executeSql(sql, values, () => {
        console.log(`Données enregistrées avec succès dans la table ${tableName}`);
      }, (_, error) => {
        console.error(`Erreur lors de l'enregistrement des données dans la table ${tableName}:`, error);
      });
    });
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement des données dans la table ${tableName}:`, error);
  }
};


const Addcol = async (tableName, columnName, columnType) => {
  const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType};`;

  try {
    await db.transaction(tx => {
      tx.executeSql(sql);
    });
    console.log(`Nouvelle colonne '${columnName}' ajoutée à la table '${tableName}' avec succès.`);
  } catch (error) {
    console.error(`Erreur lors de l'ajout de la nouvelle colonne '${columnName}' à la table '${tableName}':`, error);
  }
};

const addCleetrange= async (tableName, columnName, referencedTableName, referencedColumnName) => {
  const sql = `ALTER TABLE ${tableName} ADD CONSTRAINT fk_${columnName} FOREIGN KEY (${columnName}) REFERENCES ${referencedTableName}(${referencedColumnName});`;

  try {
    await db.transaction(tx => {
      tx.executeSql(sql);
    });
    console.log(`Clé étrangère '${columnName}' ajoutée à la table '${tableName}' avec succès.`);
  } catch (error) {
    console.error(`Erreur lors de l'ajout de la clé étrangère '${columnName}' à la table '${tableName}':`, error);
  }
};
const getLastId = async (tableName) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT MAX(id) AS max_id FROM ${tableName}`,
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0).max_id);
          } else {
            resolve(null); // Retourner null si aucune ligne n'est trouvée
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


// Exporter les fonctions pour être utilisées dans d'autres parties de l'application
export {  createTables, saveDataToTable ,Addcol,getLastId,saveDatakey};


