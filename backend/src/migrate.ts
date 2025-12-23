import pool from './config/database';

const migrate = async () => {
  try {
    console.log('Running migration...');
    await pool.query('ALTER TABLE complaints ADD COLUMN resolution_notes TEXT DEFAULT NULL;');
    console.log('Migration successful: Added resolution_notes column.');
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

migrate();
