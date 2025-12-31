import pool from './config/database';

const migratePriority = async () => {
  try {
    console.log('Running priority migration...');
    // priority column 
    await pool.query("ALTER TABLE complaints ADD COLUMN priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium';");
    console.log('Migration successful: Added priority column.');
    process.exit(0);
  } catch (error: any) {
    if (error.code === 'ER_DUP_FIELDNAME') {
       console.log('Column already exists.');
    } else {
       console.error('Migration failed:', error);
    }
    process.exit(1);
  }
};

migratePriority();
