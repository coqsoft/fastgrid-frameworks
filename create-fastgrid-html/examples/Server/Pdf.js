const fs = require('node:fs');
const path = require('node:path');
const he = require('he');
const puppeteer = require('puppeteer');
const querystring = require('node:querystring');
let FGridE = null;
async function getpdf(req, res) {
   let page;
   try {
      const raw = await new Promise((resolve, reject) => { let data = ''; req.setEncoding('utf8'); req.on('data', chunk => (data += chunk)); req.on('end', () => resolve(data)); req.on('error', reject); });
      const parsed = querystring.parse(raw);
      let html = parsed.Html;
      const file = String(parsed.File || 'export').replace(/[^\w.-]+/g, '_').replace(/^_+|_+$/g, '');
      if(!html){ res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': '*' }); res.end('Missing input'); return; }
      html = he.decode(String(html).replace(/^\uFEFF/, ''));
      if(!FGridE) FGridE = await fs.promises.readFile(path.join(__dirname, 'FGridE.js'), 'utf8');
      var rg = /<script\b[^>]*\bsrc\s*=\s*(['"])[^'"]*\1[^>]*>\s*<\/script>/i;
      var p = html.search(rg); html = html.replace(rg,""); html = html.slice(0,p)+"<script>"+FGridE+"</script>"+html.slice(p);
      const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox','--disable-gpu','--hide-scrollbars','--mute-audio','--window-size=1024,768','--window-position=-32000,-32000']});
      page = await browser.newPage();
      page.on('console', msg => console.log('[pg console]', msg.type(), msg.text().replace(/\%c|color:[\#\w]+\s?;?|font-size:\w+\s?;?|font-weight:\w+\s?;?/g,"")));
      const serializeError = (err) => {
         if(!err) return null;
         if(typeof err === 'string') return { message: err, stack: null };
         return { name: err?.name || 'Error', message: err?.message || String(err), stack: err?.stack || null };
         };
      const pageErrorPromise = new Promise(resolve => {
         page.once('pageerror', err => resolve({ type: 'pageerror', error: serializeError(err) }));
         page.once('unhandledrejection', err => resolve({ type: 'unhandledrejection', error: serializeError(err) }));
         });
      page.on('pageerror', err => console.log('[pg error]', err?.message || err, "{"+(err?.stack||"")+"}"));
      page.on('requestfailed', r => console.log('[req failed]', r.url(), r.failure()?.errorText));
      await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
      html = html.replace(/<head\b([^>]*)>/i, (m) => `${m}<base href="http://localhost:8000/">`);
      //res.end(html); await browser.close(); return;
      await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
      const readyOrError = await Promise.race([ page.waitForFunction(() => window.FGrid && window.FGrid.PdfReady,{ timeout: 30000 }).then(() => ({ type: 'ready' })), pageErrorPromise ]);
      if(readyOrError?.type !== 'ready'){
         await browser.close();
         res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
         res.end(String(readyOrError?.error?.stack || readyOrError?.error?.message || readyOrError));
         return;
         }
      //await page.waitForFunction(() => window.FGrid && window.FGrid.PdfReady,{ timeout: 30000 });
      await page.evaluate(async () => { if(document.fonts && document.fonts.ready) await document.fonts.ready; });
      let param = { printBackground: true };
      if(parsed.PageSize){
         param.preferCSSPageSize = false;
         param.format = parsed.PageSize;
         param.landscape = parsed.PageLandscape==1 ? true : false;
         let mw = parsed.MarginWidth ? parsed.MarginWidth : 10, mh = parsed.MarginHeight ? parsed.MarginHeight : 10;
         param.margin = { top: mh+'mm', right: mw+'mm', bottom: mh+'mm', left: mw+'mm' };
         }
      else param.preferCSSPageSize = true;
      const pdf = Buffer.from(await page.pdf(param));
      res.writeHead(200, {"Content-Type":"application/pdf","Content-Disposition": "attachment; filename=\""+file+".pdf\"","Access-Control-Allow-Origin":"*", 'Content-Length': pdf.length}); //. Sets response header to UTF8 text and allows requests from other domains / ports
      res.end(pdf);
      await browser.close();
      } 
   catch (err) {
      console.error(err);
      if(!res.headersSent){ res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': '*' }); res.end(String(err?.stack || err)); }
      } 
   finally { if(page) await page.close().catch(() => {}); }
   }
module.exports = { getpdf };
