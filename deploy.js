import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Replace these with your Supabase project URL and anon key
const supabaseUrl = 'https://viforvvsfdbrerpskjeu.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const bucketName = 'static'

if (!supabaseKey) {
  console.error('Please set the SUPABASE_KEY environment variable')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function uploadFile(filePath, relativePath) {
  try {
    const fileContent = readFileSync(filePath)
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(relativePath, fileContent, {
        contentType: getContentType(filePath),
        upsert: true
      })

    if (error) {
      throw error
    }
    console.log(`✅ Uploaded: ${relativePath}`)
  } catch (error) {
    console.error(`❌ Failed to upload ${relativePath}:`, error.message)
  }
}

function getContentType(filePath) {
  const ext = filePath.split('.').pop().toLowerCase()
  const contentTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    ico: 'image/x-icon'
  }
  return contentTypes[ext] || 'application/octet-stream'
}

async function uploadDirectory(dirPath, baseDir = dirPath) {
  const files = readdirSync(dirPath)

  for (const file of files) {
    const fullPath = join(dirPath, file)
    const relativePath = relative(baseDir, fullPath)
    
    if (statSync(fullPath).isDirectory()) {
      await uploadDirectory(fullPath, baseDir)
    } else {
      await uploadFile(fullPath, relativePath)
    }
  }
}

// Start the upload process
console.log('Starting deployment to Supabase Storage...')
uploadDirectory(join(__dirname, 'dist'))
  .then(() => console.log('✨ Deployment complete!'))
  .catch(error => console.error('Deployment failed:', error)) 