// アイコン生成(外部ライブラリ不要): node make-icons.js
const zlib=require('zlib'),fs=require('fs');
function crc(b){let c,t=[];for(let n=0;n<256;n++){c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}let r=0xffffffff;for(const x of b)r=t[(r^x)&255]^(r>>>8);return(r^0xffffffff)>>>0}
function chunk(t,d){const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(t),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])}
function png(s){const raw=Buffer.alloc((s*4+1)*s);
 for(let y=0;y<s;y++){raw[y*(s*4+1)]=0;for(let x=0;x<s;x++){const o=y*(s*4+1)+1+x*4;
  const dx=x-s/2,dy=y-s/2,r=Math.hypot(dx,dy)/s;
  let R=18,G=21,B=28; // 背景
  if(r<0.36){R=79;G=124;B=255}              // 青い円
  // 白い波形(サイン波)
  const wx=(x/s-0.5)*2; if(Math.abs(wx)<0.6){const wy=Math.sin(wx*Math.PI*2.2)*0.16;if(Math.abs((y/s-0.5)-wy)<0.025){R=G=B=255}}
  raw[o]=R;raw[o+1]=G;raw[o+2]=B;raw[o+3]=255}}
 const ih=Buffer.alloc(13);ih.writeUInt32BE(s,0);ih.writeUInt32BE(s,4);ih[8]=8;ih[9]=6;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ih),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))])}
for(const s of [180,192,512])fs.writeFileSync(`icons/icon-${s}.png`,png(s));
