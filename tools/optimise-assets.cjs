// Format conversion and delivery-size optimisation only; no retouching or content generation.
const fs=require('fs'),path=require('path');
const sharp=require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async()=>{const map=JSON.parse(fs.readFileSync('assets/asset-map.json'));const log=[];for(const [key,file] of Object.entries(map)){if(!file.endsWith('.png'))continue;const out=file.replace('.png','.webp');await sharp(file).webp({quality:85}).toFile(out);map[key]=out;log.push({original:file,delivery:out,bytesBefore:fs.statSync(file).size,bytesAfter:fs.statSync(out).size});}fs.writeFileSync('assets/asset-map.json',JSON.stringify(map,null,2));fs.writeFileSync('docs/image-optimisation.json',JSON.stringify(log,null,2));console.log(log)})();
