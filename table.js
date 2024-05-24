


export const createTables = () => {
    const createMpamokatra = `CREATE TABLE IF NOT EXISTS Mpamokatra (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Anarana TEXT NOT NULL,
        Manambady TEXT NOT NULL,
        Toerana TEXT NOT NULL,
        Kaomimina TEXT NOT NULL,
        Fokotany TEXT NOT NULL,
    );`;
  
    const createFamokarana = `CREATE TABLE IF NOT EXISTS Famokarana (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Sehapihariana TEXT NOT NULL,
        VelaranaIsa INTEGER NOT NULL,
        VelaranaAmbolena INTEGER NOT NULL,
        TeknikaAMpiasaina TEXT NOT NULL,
        VokatraKg TEXT NOT NULL
    );`;
  
    const createFitaovampamokarana = `CREATE TABLE IF NOT EXISTS Fitaovampamokarana (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Fitaovampamokarana TEXT NOT NULL,
      Isa INTEGER NOT NULL
    );`;

    const createManodidinaFamokarana = `CREATE TABLE IF NOT EXISTS ManodidinaFamokarana (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Mpisehatra TEXT NOT NULL,
        AsaAtao TEXT NOT NULL,
        Adiresy TEXT,
        Tel TEXT,
        Efahiara-miasa TEXT
      );`;

    const createFanamarihana = `CREATE TABLE IF NOT EXISTS Fanamarihana(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Mpisehatra TEXT NOT NULL,
      );`;
  
    db.transaction(tx => {
      tx.executeSql(createMpamokatra, [], () => {
        console.log('Table Mpamokatra vita ');
      },
      error => {
        console.log('Erreur Mpamokatra:', error);
      });
  
      tx.executeSql(createFamokarana, [], () => {
        console.log('Table Famokarana vita');
      },
      error => {
        console.log('Erreur Famokarana :', error);
      });
  
      tx.executeSql(createFitaovampamokarana, [], () => {
        console.log('Table Fitaovampamokarana vita');
      },
      error => {
        console.log('Erreur Fitaovampamokarana :', error);
      });

      tx.executeSql(createManodidinaFamokarana, [], () => {
        console.log('Table ManodidinaFamokarana vita');
      },
      error => {
        console.log('Erreur ManodidinaFamokarana :', error);
      });

      tx.executeSql(createFanamarihana, [], () => {
        console.log('Table Fanamarihana vita');
      },
      error => {
        console.log('Erreur Fanamarihana:', error);
      });

    });
  };

