import fs from "node:fs";
import path from "node:path";

const root=path.resolve(process.argv[2]||"public");
const files=[];
function walk(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const full=path.join(directory,entry.name);if(entry.name===".git")continue;if(entry.isDirectory())walk(full);else files.push(full)}}
walk(root);
const html=files.filter(file=>file.endsWith(".html"));
const missing=[];
for(const file of html){
  const source=fs.readFileSync(file,"utf8");
  for(const match of source.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)){
    const value=match[1];
    if(/^(?:[a-z]+:|#|\/\/)/i.test(value))continue;
    const clean=value.split(/[?#]/,1)[0];
    if(!clean)continue;
    let target=clean.startsWith("/")?path.join(root,clean):path.resolve(path.dirname(file),clean);
    if(target.endsWith(path.sep))target=path.join(target,"index.html");
    if(!fs.existsSync(target))missing.push(`${path.relative(root,file)} -> ${value}`);
  }
}
if(missing.length)throw new Error(`missing local links:\n${missing.join("\n")}`);
const siteCSS=fs.readFileSync(path.join(root,"assets/css/style.css"),"utf8");
const siteJS=fs.readFileSync(path.join(root,"assets/js/script.js"),"utf8");
for(const [source,needle,label] of [
  [siteCSS,"background:transparent;pointer-events:none", "visible docs-toggle host"],
  [siteCSS,"body.docs-open .docs-layout>aside{overflow-y:auto", "full-screen mobile docs drawer"],
  [siteCSS,".docs-nav{display:none!important", "closed mobile docs navigation"],
  [siteJS,'classList.toggle("docs-open",open)',"mobile docs state"],
])if(!source.includes(needle))throw new Error(`missing ${label}`);
console.log(`checked ${html.length} HTML pages and ${files.length} files`);
