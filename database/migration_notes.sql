/* Migration to add resolution_notes */
ALTER TABLE complaints ADD COLUMN resolution_notes TEXT DEFAULT NULL;
