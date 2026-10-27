import {cp,mkdir,copyFile,access,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const output=path.resolve(root,'gallery-dist'),build=path.resolve(root,'dist');
if(path.dirname(output)!==path.resolve(root)||path.basename(output)!=='gallery-dist')throw Error('Unexpected gallery output directory.');
// Only replace this known generated directory; never remove source/private data.
await rm(output,{recursive:true,force:true});await mkdir(output);
await copyFile(path.join(build,'gallery.html'),path.join(output,'index.html'));
await copyFile(path.join(build,'gallery.html'),path.join(output,'gallery.html'));
await (await import('node:fs/promises')).writeFile(path.join(output,'.nojekyll'),'');
await cp(path.join(build,'assets'),path.join(output,'assets'),{recursive:true});
await cp(path.join(build,'samples'),path.join(output,'samples'),{recursive:true});
await copyFile(path.join(build,'favicon.svg'),path.join(output,'favicon.svg'));
try{await access(path.join(build,'gallery-tour.webm'));await copyFile(path.join(build,'gallery-tour.webm'),path.join(output,'gallery-tour.webm'));}catch{}
console.log('Static sample gallery packaged in gallery-dist. This does not publish a live generation service.');
