const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const contentDir = path.join(__dirname, 'content');
const outputFile = path.join(contentDir, 'compiled_content.js');

// Supported languages: 'id' is the source of truth, 'en' is optional overlay
const LANGUAGES = ['id', 'en'];
const BASE_LANG = 'id';

/**
 * Parse YAML frontmatter from a markdown file.
 * Returns { meta: {}, body: "" }
 */
function parseFrontmatter(content) {
    const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = content.match(fmRegex);
    
    if (match) {
        try {
            const meta = yaml.load(match[1]) || {};
            const body = match[2].trim();
            return { meta, body };
        } catch (e) {
            console.warn('  Warning: Failed to parse YAML frontmatter:', e.message);
            return { meta: {}, body: content.trim() };
        }
    }
    
    // No frontmatter found — treat entire content as body
    return { meta: {}, body: content.trim() };
}

/**
 * Read all .md files in a subdirectory for a given language.
 * Returns an object keyed by filename (without .md extension).
 */
function readMdFiles(lang, subDir) {
    const dirPath = path.join(contentDir, lang, subDir);
    const filesData = {};
    
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md')).sort();
        files.forEach(file => {
            const key = path.basename(file, '.md');
            const filePath = path.join(dirPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const { meta, body } = parseFrontmatter(content);
            
            filesData[key] = {
                ...meta,
                body: body
            };
        });
    }
    return filesData;
}

/**
 * Read a single .md file for a given language (e.g. about.md).
 * Returns the parsed object or null.
 */
function readSingleMd(lang, fileName) {
    const filePath = path.join(contentDir, lang, fileName);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const { meta, body } = parseFrontmatter(content);
        return { ...meta, body };
    }
    return null;
}

/**
 * Build language data with graceful fallback.
 * For non-base languages (e.g. 'en'), if a file doesn't exist,
 * the base language (ID) content is used with _fallback: true flag.
 */
function buildLangData(lang, baseData) {
    const subDirs = ['concepts', 'dialogue', 'studies', 'library'];
    const langData = {};
    
    let translated = 0;
    let fallback = 0;
    
    subDirs.forEach(subDir => {
        const langFiles = readMdFiles(lang, subDir);
        const baseFiles = baseData[subDir] || {};
        const merged = {};
        
        // Start from base keys (ID is source of truth for what exists)
        Object.keys(baseFiles).forEach(key => {
            if (langFiles[key]) {
                // EN file exists — use it directly
                merged[key] = langFiles[key];
                translated++;
                console.log(`    ✓ ${lang.toUpperCase()} found: ${subDir}/${key}.md`);
            } else {
                // EN file missing — fallback to base (ID) with flag
                merged[key] = { ...baseFiles[key], _fallback: true };
                fallback++;
                console.log(`    ⚠ ${lang.toUpperCase()} fallback → ${BASE_LANG.toUpperCase()}: ${subDir}/${key}.md`);
            }
        });
        
        langData[subDir] = merged;
    });
    
    // Handle about.md
    const langAbout = readSingleMd(lang, 'about.md');
    if (langAbout) {
        langData.about = langAbout;
        translated++;
        console.log(`    ✓ ${lang.toUpperCase()} found: about.md`);
    } else if (baseData.about) {
        langData.about = { ...baseData.about, _fallback: true };
        fallback++;
        console.log(`    ⚠ ${lang.toUpperCase()} fallback → ${BASE_LANG.toUpperCase()}: about.md`);
    }
    
    console.log(`    ── ${lang.toUpperCase()} Summary: ${translated} translated, ${fallback} fallback\n`);
    
    return langData;
}

console.log('=== Ho Zon Content Compiler (Bilingual) ===');
console.log('Compiling markdown files with YAML frontmatter...\n');

// ── Step 1: Read base language (ID) as source of truth ──
console.log(`  [${BASE_LANG.toUpperCase()}] Reading base language files...`);
const baseData = {
    concepts: readMdFiles(BASE_LANG, 'concepts'),
    dialogue: readMdFiles(BASE_LANG, 'dialogue'),
    studies: readMdFiles(BASE_LANG, 'studies'),
    library: readMdFiles(BASE_LANG, 'library'),
    about: readSingleMd(BASE_LANG, 'about.md')
};

console.log(`    Concepts: ${Object.keys(baseData.concepts).length} files`);
Object.keys(baseData.concepts).forEach(k => console.log(`      - ${k}: "${baseData.concepts[k].title || '(no title)'}"`));
console.log(`    Dialogue: ${Object.keys(baseData.dialogue).length} files`);
Object.keys(baseData.dialogue).forEach(k => console.log(`      - ${k}: "${baseData.dialogue[k].title || '(no title)'}"`));
console.log(`    Studies:  ${Object.keys(baseData.studies).length} files`);
Object.keys(baseData.studies).forEach(k => console.log(`      - ${k}: "${baseData.studies[k].title || '(no title)'}"`));
console.log(`    Library:  ${Object.keys(baseData.library).length} files`);
Object.keys(baseData.library).forEach(k => console.log(`      - ${k}: "${baseData.library[k].title || '(no title)'}"`));
console.log(`    About:    ${baseData.about ? 'found' : 'NOT FOUND'}`);
console.log();

// ── Step 2: Build all language datasets ──
const allLangData = {};

// Base language (ID) — no fallback needed, use directly
allLangData[BASE_LANG] = baseData;

// Other languages — with graceful fallback
LANGUAGES.filter(l => l !== BASE_LANG).forEach(lang => {
    console.log(`  [${lang.toUpperCase()}] Building with graceful fallback...`);
    allLangData[lang] = buildLangData(lang, baseData);
});

// ── Step 3: Write compiled output ──
const outputContent = `// ============================================================
// Ho Zon — Compiled Content (Auto-Generated, Bilingual)
// ============================================================
// Generated by compile.js on ${new Date().toISOString()}
// DO NOT EDIT THIS FILE DIRECTLY.
// Edit the respective .md files in content/id/ or content/en/
// directories, then run: node compile.js (or compile.bat)
// ============================================================
// Structure: SITE_DATA.id.concepts, SITE_DATA.en.concepts, etc.
// Fallback: entries with _fallback:true use base language (ID)
// ============================================================

const SITE_DATA = ${JSON.stringify(allLangData, null, 2)};
`;

fs.writeFileSync(outputFile, outputContent, 'utf8');
console.log(`Successfully compiled to: content/compiled_content.js`);
console.log('Done!');
