/* Copy the supplied recordings unchanged and extract a lightweight poster per device. */
const fs=require('fs'),path=require('path'),crypto=require('crypto'),{spawnSync}=require('child_process');
const ffmpeg=process.env.DUNNIO_FFMPEG_PATH||'.local/media-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';
const root=process.env.DUNNIO_STUDIO_VIDEO_SOURCE||'C:/laragon/www/Banner-dunnio/mp4-demo-custom-3d-outfit';
fs.mkdirSync('assets/videos',{recursive:true});
const entries=[['desktop','PC',1600,1000,75.96],['tablet','Tablet',834,1194,74.12],['mobile','Mobile',390,844,62.32]];
const assets=entries.map(([device,suffix,width,height,duration])=>{
 const source=path.join(root,`Dunnio_Custom_Outfit_${suffix}.mp4`),file=`assets/videos/dunnio-custom-outfit-${device}.mp4`,poster=`assets/videos/dunnio-custom-outfit-${device}-poster.webp`;
 const probe=spawnSync(ffmpeg,['-hide_banner','-i',source],{encoding:'utf8'});
 if(!probe.stderr?.includes(`${width}x${height}`)||!probe.stderr.includes('Video: h264')||probe.stderr.includes('Audio:'))throw Error('Unexpected supplied video metadata: '+source);
 fs.copyFileSync(source,file);
 const render=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-ss','1','-i',source,'-frames:v','1','-vf',`scale=${Math.min(960,width)}:-2`,'-quality','78',poster],{encoding:'utf8'});
 if(render.status!==0)throw Error(render.stderr);
 return {device,source,file,poster,width,height,ratio:width/height,durationSeconds:duration,codec:'H.264 High / yuv420p',fps:25,audio:false,bytes:fs.statSync(file).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')};
});
fs.writeFileSync('docs/studio-video-assets.json',JSON.stringify({date:'2026-10-15',sourceRoot:root,reference:'https://www.hockerty.com/en-us/',referencePattern:'Muted inline looping demo in a device frame; only the selected device video is loaded.',assets},null,2)+'\n');
console.log(JSON.stringify(assets.map(({device,width,height,bytes})=>({device,width,height,bytes}))));
